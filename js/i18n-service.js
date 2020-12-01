var gTrans = {
    header: {
        en: 'Books',
        es: 'Libros',
        he: 'ספרים'
    },
    'add-header': {
        en: 'Add Book',
        es: 'Agregar libro',
        he: 'הוסף ספר',
    },
    'add-title': {
        en: 'Book Title',
        es: 'Titulo del libro',
        he: 'הככותרת הספרל',
    },
    'add-price': {
        en: 'Book Price',
        es: 'Precio del libro',
        he: 'מחיר ספר'
    },
    'add-save': {
        en: 'Save',
        es: 'Salvar',
        he: 'לַחֲסוֹך',
    },
    'upd-price': {
        en: 'Enter new price',
        es: 'Ingrese nuevo precio',
        he: 'הזן מחיר חדש',
    },
    'tab-header-title': {
        en: 'Title',
        es: 'Título',
        he: 'כותרת',
    },
    'tab-header-price': {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר',
    },
    'tab-header-actions': {
        en: 'Actions',
        es: 'Comportamiento',
        he: 'פעולות'
    },
    'prev-page': {
        en: 'Prev Page',
        es: 'Pagina anterior',
        he: 'עמוד קודם'
    },
    'next-page': {
        en: 'Next Page',
        es: 'Siguiente página',
        he: 'עמוד הבא'
    },
    'modal-close': {
        en: 'Close',
        es: 'Cerrar',
        he: 'סגור'
    },
    'read': {
        en: 'Read',
        es: 'Leer',
        he: 'לקרוא'
    },
    'update': {
        en: 'Update',
        es: 'Actualizar',
        he: 'עדכון',
    },
    'delete': {
        en: 'Delete',
        es: 'Eliminar',
        he: 'לִמְחוֹק'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = txt
        } else {
            el.innerText = txt
        }
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatCurrency(num) {
    if (gCurrLang === 'he') {
        return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: 'ILS' }).format(num * 3.30);
    }
    if (gCurrLang === 'es') {
        return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: 'EUR' }).format(num * 0.83);
    }
    if (gCurrLang === 'en') {
        return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: 'USD' }).format(num);
    }
}

function formatButtons(transKey) {
    var txt = getTrans(transKey)
    return txt
}