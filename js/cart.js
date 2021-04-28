document.addEventListener('DOMContentLoaded', (event) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    updateCartvalue(cart)
    createAddedProductCard(cart)
});



function addToCart(ref) {
    const prodId = ref.dataset.prodid
    const Cart = JSON.parse(localStorage.getItem('cart')) || [];
    const prodData = JSON.parse(localStorage.getItem('product'))
    const itemExits = Cart.find(item => +item.prodId === +prodId)
    let newCart = null
    if (!itemExits) {
        const prod = Object.entries(prodData)
            .filter(item => {
                if (+item[0] === +prodId) {
                    return item[1]
                }
            })
            .reduce((obj, item) => {
                item[1].quantity = 1
                return obj[item[0]] = item[1]
            }, {})
        newCart = [prod, ...Cart]
    } else {

        newCart = [...Cart]
        newCart.forEach(item => {
            if (+item.prodId === +prodId) {
                item.quantity += 1
            }
        })
    }
    localStorage.setItem('cart', JSON.stringify(newCart))

    // updating cart items value 
    updateCartvalue(newCart)
    createAddedProductCard(newCart)

}

// remove from cart
function removeItem(ref) {
    const prodId = ref.dataset.prodid
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter(item => {
        return +item.prodId !== +prodId
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
    updateCartvalue(newCart)
    ref.parentNode.parentNode.removeChild(ref.parentNode)
}


function createAddedProductCard(prodArray) {
    $('.cart-body').empty()
    prodArray.forEach(item => {
        const prodLayout = `
        <div class="added-prod">
                    <div class="edit-qty" data-prodid=${item.prodId}>
                        <button class="add"  onclick="itemIncDec(this,'add')"><i class='bx bx-plus' ></i></button>
                        <span>${item.quantity}</span>
                        <button class="sub"onclick="itemIncDec(this,'sub')"><i class='bx bx-minus' ></i></button>
                    </div>
                    <img src=${item.image} alt="${item.product_name}">
                    <div class="prod-detail">
                        <div class="prod-name">${item.product_name}</div>
                        <div class="item-price"><i class="bx bx-rupee"></i>${item.price}</div>
                    </div>
                    <div class="total"><i class="bx bx-rupee"></i><span id="prod-total">${item.price*item.quantity}</span></div>
                    <div class="remove" data-prodid=${item.prodId} onclick="removeItem(this)"><i class='bx bx-trash'></i></div>
                </div>
    `

        $('.cart-body').append(prodLayout)

    })


}


// cart helper function 

function updateCartvalue(newCart) {
    document.querySelectorAll('#cart .cart-item').forEach(item => {
        item.innerText = newCart.length
    })
    document.querySelectorAll('#cart .cart-price').forEach(item => {
        item.innerText = newCart
            .map(item => +item.price * item.quantity)
            .reduce((sum, item) => {
                return item + sum
            }, 0)
    })
}

function itemIncDec(ref, type) {
    const prodid = ref.parentNode.dataset.prodid
    const oldCart = JSON.parse(localStorage.getItem('cart'))
    const Item = oldCart.find(item => {
        return item.prodId === prodid;
    })
    if (type.toUpperCase() === 'ADD') {
        Item.quantity += 1;
    }
    if (type.toUpperCase() === 'SUB') {
        Item.quantity -= 1
    }
    const index = oldCart.indexOf(Item)
    const newCart = Object.assign([],oldCart,{index:Item})
    ref.parentNode.children[1].innerText = Item.quantity
    ref.parentNode.parentNode.children[3].children[1].innerText = Item.quantity*Item.price
    localStorage.setItem('cart',JSON.stringify(newCart))
    updateCartvalue(newCart)
}