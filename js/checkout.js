function checkout() {
    if (isAuthenticated() && isAuthenticated().idToken) {
        return window.location.assign('/project/checkout.html')
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
		<label for=${'address'+randomId} onchange="addActive(this)">
                <input type="radio" id=${'address'+randomId} name="address" value=${formdata.get('address')}>
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
    console.log(typeof formdata.get('number').trim().length )
    if (formdata.get('number').trim().length !== 10) {
        return alertMsg("Number must be of 10 digits", 'error', true, 'addContact .modal-content')
    }

    const randomId = +Math.random() * 10000
    const label = `
		<label for=${'address'+randomId} onchange="addActive(this)">
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