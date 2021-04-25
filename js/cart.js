document.addEventListener('DOMContentLoaded', (event) => {
    createAddedProductCard(JSON.parse(localStorage.getItem('cart')))
});

function addToCart(ref) {
    const prodId = ref.dataset.prodid
    const Cart = JSON.parse(localStorage.getItem('cart')) || [];
    const prodData = JSON.parse(localStorage.getItem('product'))
    const itemExits = Cart.find(item => +item.prodId === +prodId)
    console.log(itemExits, prodId)
    let newCart = null
    if (!itemExits) {
        console.log('newItem')
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
        console.log('olditem')
        const index = Cart.indexOf(itemExits)
        newCart = [...Cart]
        newCart.forEach(item => {
            if (+item.prodId === +prodId) {
                item.quantity += 1
            }
        })
    }
    localStorage.setItem('cart', JSON.stringify(newCart))

    // updating cart items value 
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

    createAddedProductCard(newCart)

}

// remove from cart
function removeItem(ref) {
    const prodId = ref.dataset.prodid
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter(item => {
        return +item.prodId !== +prodId
    })
    console.log(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    ref.parentNode.parentNode.removeChild(ref.parentNode)
}


function createAddedProductCard(prodArray) {
    $('.cart-body').empty()
    prodArray.forEach(item => {
        const prodLayout = `
        <div class="added-prod">
                    <div class="edit-qty">
                        <button class="add"><i class='bx bx-plus' ></i></button>
                        <span>${item.quantity}</span>
                        <button class="sub"><i class='bx bx-minus' ></i></button>
                    </div>
                    <img src="images/coupen/Ash.png" alt="">
                    <div class="prod-detail">
                        <div class="prod-name">${item.product_name}</div>
                        <div class="item-price"><i class="bx bx-rupee"></i>${item.price}</div>
                    </div>
                    <div class="total"><i class="bx bx-rupee"></i><span>${item.price*item.quantity}</span></div>
                    <div class="remove" data-prodid=${item.prodId} onclick="removeItem(this)"><i class='bx bx-trash'></i></div>
                </div>
    `

        $('.cart-body').append(prodLayout)

    })


}