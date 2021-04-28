
document.addEventListener('DOMContentLoaded',()=>{
    showOrderDetails()
})

function checkout() {
    if (isAuthenticated() && isAuthenticated().idToken) {
        return window.location.assign(`${window.location.href}checkout.html`)
    }
    alert("Please Sign In first")
}


// open modal
let openModal = null

function OpenAddModal(ref) {
    openModal = new bootstrap.Modal(document.getElementById(ref))
    openModal.show()
}

// function for adding new data on addcard submit

function addDataInAddress(fdata) {
    event.preventDefault()
    const formdata = new FormData(fdata)
    if (!formdata.get('title').trim()) {
        return alertMsg("Title field is Empty", 'error', true, 'addAddress .modal-content')
    }

    if (!formdata.get('address').trim()) {
        return alertMsg("Address field is Empty", 'error', true, 'addAddress .modal-content')

    }


    const randomId = +Math.random() * 10000
    const label = `
		<label for=${'address'+randomId} onchange="addActive(this)" data-bs-toggle="tooltip" data-bs-placement="top" title=${formdata.get('address')}>
                <input type="radio" id=${'address'+randomId} name="address" value=${formdata.get('title') | formdata.get('address')}>
                <span>${formdata.get('title')}</span>
                <span class="text-muted">${formdata.get('address')}</span>
        </label>
	`
    $('#address-details .details-body').append(label)
    fdata.reset()
    closeModal()
}

function addDataInContact(fdata) {
    event.preventDefault()
    const formdata = new FormData(fdata)
    if (formdata.get('number').trim().length !== 10) {
        return alertMsg("Number must be of 10 digits", 'error', true, 'addContact .modal-content')
    }

    const randomId = +Math.random() * 10000
    const label = `
		<label for=${'address'+randomId} onchange="addActive(this)" >
            <input type="radio" id=${'address'+randomId} name="contact" value=${formdata.get('number')}>
            <span>${formdata.get('number')}</span>
        </label>
	`
    $('#contact-details .details-body').append(label)
    fdata.reset()
    closeModal()
}


function closeModal() {
    openModal.hide()
}


// add active class

function addActive(ref) {
    const allChild = ref.parentNode.children
    Object.keys(allChild).forEach(item => {
        allChild[item].classList.remove('active')
    })

    ref.classList.add('active')
}


// show order details

function showOrderDetails() {

    if (isAuthenticated() && JSON.parse(localStorage.getItem('cart'))) {
        const cart = JSON.parse(localStorage.getItem('cart'))
        cart.forEach(item => {
            const details = `
			<div class="order-item">
                <span>
                    <span class="bold">${item.quantity}</span>
                    <span class="text-muted">x ${item.product_name}</span>
                </span>
                <span class="text-muted">${item.quantity * item.price }</span>
            </div>    
		`
            $('.order').append(details)
        })

        const subTotal = `
        	<hr>
            <div class="sub-total text-muted">
                <span>Sub Total</span>
                <span>${cart.map(item => +item.price * item.quantity)
                	.reduce((sum, item) => { return item + sum}, 0)}
                </span>
            </div>

        `
        $('.order').append(subTotal)

        const delivery = `
        	<div class = "delivery Fee text-muted" >
		    	<span>Delivery</span>
		    	<span >0</span> 
		    </div>
        `

        $('.order').append(delivery)

        const discount = `
        	<div class = "discount text-muted">
		        <span>Discount</span> 
		        <span > 0 </span> 
        	</div> 

        `
        $('.order').append(discount)

        const total = `
        	<div class = "bold" >
		        <span>Total</span> 
		        <span>${cart.map(item => +item.price * item.quantity)
                	.reduce((sum, item) => { return item + sum}, 0)}</span> 
       		 </div >

        `
        $('.order').append(total)



    }
}

function confirmOrder(form) {
    event.preventDefault()
    const formdata = new FormData(form)
    alertMsg(`Order Confirmed. Order Id: ${(Math.random()*10000).toFixed()}`, 'success')
    form.reset()

}