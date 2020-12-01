'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooksForDisplay()
    var num = getBookNumber()
    var strHtmls = books.map(function (book, idx) {
        return `
        <tr>
        <th scope="row">${num + idx + 1}</th>
        <td>${book.title}</td>
        <td>${formatCurrency(book.price)}</td>
        <td><button type="button" class="btn btn-primary" onclick="onReadBook('${book.id}')" data-toggle="modal" data-target="#exampleModalLong">${formatButtons('read')}</button></td>
        <td><button type="button" class="btn btn-warning" onclick="onUpdateBook('${book.id}')">${formatButtons('update')}</button></td>
        <td><button type="button" class="btn btn-danger" onclick="onDeleteBook('${book.id}')">${formatButtons('delete')}</button></td>
        </tr>
        `
    })
    document.querySelector('table tbody').innerHTML = strHtmls.join('')
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onAddBook(ev) {
    ev.preventDefault()
    var elTitle = document.querySelector('input[data-trans="add-title"]');
    var elPrice = document.querySelector('input[data-trans="add-price"]');

    var title = elTitle.value;
    var price = +elPrice.value;

    addBook(title, price)
    elTitle.value = '';
    elPrice.value = '';

    renderBooks()
}

function onUpdateBook(bookId) {
    document.querySelector('.update-price').hidden = false
    saveBookId(bookId)
}

function onUpdatePrice(ev) {
    ev.preventDefault()
    var newPrice = document.querySelector('.update-price input').value
    if (newPrice) {
        updateBook(newPrice);
        renderBooks();
    }
    document.querySelector('.update-price input').value = ''
    document.querySelector('.update-price').hidden = true

}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('#exampleModalLongTitle').innerText = book.title
    elModal.querySelector('h3').innerText = `Book Price: ${formatCurrency(book.price)}`
    elModal.querySelector('.image').innerHTML = `<img src="img/${book.imgUrl}"/>`
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('.rate').innerHTML = `
    <button onclick="onRate('${book.id}', -1)">-</button> 
    <input type="number" min="0" max="10" placeholder="${book.rate}"> 
    <button onclick="onRate('${book.id}', 1)">+</button>`
    elModal.hidden = false;
    saveBookId(bookId)
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onSetSorting(sortBy) {
    setSorting(sortBy);
    renderBooks();
}

function stepUp(id) {
    var newRate = updRate(id, '+')
    document.querySelector('.rate input').value = newRate
}
function stepDown(id) {
    var newRate = updRate(id, '-')
    document.querySelector('.rate input').value = newRate
}

function onRate(id, diff) {
    var newRate = updRate(id, diff)
    document.querySelector('.rate input').value = newRate
    renderBooks()
}

function onPaiging(diff) {
    paiging(diff);
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans();
    renderBooks()
}
