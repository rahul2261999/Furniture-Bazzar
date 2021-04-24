function addToCart(ref) {
    const prodId = ref.dataset.prodid
    const Cart = JSON.parse(localStorage.getItem('cart')) || [];
    const prodData = JSON.parse(localStorage.getItem('product'))
    const itemExits = Cart.find(item => item.prodId === prodId)
    let newCart = null
    if (!itemExits) {
        const prod = Object.entries(prodData)
            .filter(item => {
                if (item[0] === prodId) {
                    return item[1]
                }
            })
            .reduce((obj, item) => {
                item[1].quantity = 1
                return obj[item[0]] = item[1]
            }, {})
        newCart = [prod, ...Cart]
    } else {
        const index = Cart.indexOf(itemExits)
        itemExits.quantity += 1;
        newCart = [...Cart.slice(0, index - 1), itemExits, ...Cart.slice(index + 1)]
    }
    localStorage.setItem('cart', JSON.stringify(newCart))

    // updating cart items value 
    document.querySelectorAll('#cart .cart-item').forEach(item => {
        item.innerText = newCart.length
    })
    document.querySelectorAll('#cart .cart-price').forEach(item => {
        item.innerText = newCart
            .map(item => +item.price*item.quantity)
            .reduce((sum,item)=>{
            	return item + sum
            },0)
    })

}