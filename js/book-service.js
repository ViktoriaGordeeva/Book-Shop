'use strict'
const KEY = 'books';
const PAGE_SIZE = 5;
var gBooks;
var gPageIdx = 0;
var gTitles = ['Learning Laravel', 'Beginning with Laravel', 'Java for developers']
var gSortBy = 'title'
var gCurrBookId;

_createBooks();


// LIST 
function getBooksForDisplay() {
    gBooks.sort(function (book1, book2) {
        if (typeof book1[gSortBy] === 'number') {
            return book1[gSortBy] - book2[gSortBy]
        } else {
            if (book1[gSortBy].toLowerCase() > book2[gSortBy].toLowerCase()) return 1
            if (book1[gSortBy].toLowerCase() < book2[gSortBy].toLowerCase()) return -1
            return 0
        }

    })

    var idxStart = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(idxStart, idxStart + PAGE_SIZE);
    return books
}

//DELETE
function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

// CREATE
function addBook(title, price) {
    var book = _createBook(title, price)
    book.imgUrl = 'default.jpg'
    gBooks.unshift(book)
    _saveBooksToStorage();
}

// READ 
function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function getCurrBookId() {
    return gCurrBookId
}

// UPDATE
function updateBook(newPrice) {
    var book = getBookById(gCurrBookId)
    book.price = newPrice;
    _saveBooksToStorage();
}

function _createBook(title, price) {
    return {
        id: makeId(),
        title: title,
        price: price,
        imgUrl: title + '.jpg',
        desc: makeLorem(),
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 10; i++) {
            var title = gTitles[getRandomIntInclusive(0, gTitles.length - 1)]
            books.push(_createBook(title, getRandomIntInclusive(1, 100)))
        }
        gBooks = books;
        _saveBooksToStorage();
    }
    gBooks = books;
}

function setSorting(sortBy) {
    gSortBy = sortBy
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
}

function updRate(bookId, diff) {
    var book = getBookById(bookId)
    if (book.rate === 0 && diff === -1 || book.rate === 10 && diff === 1) return book.rate
    book.rate += diff
    _saveBooksToStorage()
    return book.rate
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function getBookNumber() {
    return gPageIdx * PAGE_SIZE;
}

function saveBookId(bookId) {
    gCurrBookId = bookId
}

function paiging(diff) {
    gPageIdx += diff;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
    if (gPageIdx * PAGE_SIZE < 0) gPageIdx = Math.floor((gBooks.length - 1) / PAGE_SIZE)
}