//Loading image  as JSON object

var titleS, costS, imgS, buttonS;
const products = [{
        name: "Experia Tablet",
        src: "./Images/Experia Tablet - 900x610.png",
        price: "Rs 45000"
    },
    {
        name: "Nikon D3500 Camera",
        src: "./Images/DSLR Camera - 800x800.png",
        price: "Rs 50000"
    },
    {
        name: "Apple iMac",
        src: "./Images/Mac Book - 900x709.png",
        price: "Rs 40000"
    },
    {
        name: "Samsung Refrigerator",
        src: "./Images/Refrigerator - 800x800.png",
        price: "Rs 85000"
    },
    {
        name: "adult Wrist Pulse Oximeter",
        src: "./Images/wpo.jpg",
        price: "Rs 4999"
    },
    {
        name: "Professional Hair Straightener",
        src: "./Images/hairdr.jpg",
        price: "Rs 3999"
    }
];

//var shopItem = document.getElementById('shop-item');
var SectionContainer = document.getElementById("app");
//shopItem.classList.add("shop-item");
SectionContainer.innerHTML = `
${products.map(function (items) {
    return `
<div class="shop-item">
<span class="shop-item-title" id="sit">${items.name}</span>
<img class="shop-item-image" id="sii" src="${items.src}">
<div class="shop-item-details">
    <span class="shop-item-price" id="sip">${items.price}</span>
    <button class="btn btn-primary shop-item-button" id="shb" type="button">ADD TO CART</button>
</div>
</div>
`
}).join('')}`;









/*if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {

} */
ready();

function ready() {
    var removeCart = document.getElementsByClassName('btn-danger');
    console.log(removeCart);
    for (var i = 0; i < removeCart.length; i++) {
        var button = removeCart[i];
        button.addEventListener('click', removeCartItem)
            //  console.log('clicked');


    }
    var quantityInput = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartBt = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartBt.length; i++) {
        var button = addToCartBt[i];
        button.addEventListener('click', addToCartList);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchase);


}

function purchase() {
    alert("Thank you for your purchase");
    var cartItem = document.getElementsByClassName('cart-items')[0];
    while (cartItem.hasChildNodes()) {
        cartItem.removeChild(cartItem.firstChild);
    }
    updateTotal();
}

function addToCartList(e) {
    var button = e.target;
    var Item = button.parentElement.parentElement;
    var title = Item.getElementsByClassName('shop-item-title')[0].innerText;
    var cost = Item.getElementsByClassName('shop-item-price')[0].innerText;
    var img = Item.getElementsByClassName('shop-item-image')[0].src;

    console.log(title, cost, img);
    addItem(title, cost, img);
    updateTotal();
}

function addItem(title, cost, img) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItemsList = document.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemsList.length; i++) {
        if (cartItemsList[i].innerText == title) {
            alert("Item Already Added");
            return;
        }
    }
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartContent = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${img}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${cost}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>`
    cartRow.innerHTML = cartContent;
    cartItems.appendChild(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

}

function removeCartItem(e) {
    var buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotal();

}

function quantityChanged(e) {
    var input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function updateTotal() {
    var cartItem = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItem.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceEl = cartRow.getElementsByClassName('cart-price')[0];
        var quantityEl = cartRow.getElementsByClassName('cart-quantity-input')[0];
        //console.log(quantityEl)
        // console.log(priceEl, quantityEl);
        var price = parseFloat(priceEl.innerText.replace('Rs', ''));
        var quantity = quantityEl.value;
        //console.log();
        console.log(price, quantity);
        total = total + (price * quantity)

    }
    //x total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = "RS. " + total

}