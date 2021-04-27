$(document).ready(function() {
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        breakpointsBase: 'window',
        breakpoints: {
            580: {
                slidesPerView: 2,
            },
            900: {
                slidesPerView: 3,
            },

        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    // checkuser is signed or not
    isSignedIn()
})

window.onload = ()=>{
    fetchData('beds')
}

const formError = {
    email: false,
    password: false,
    confirmPassword: false
}

// form validation

function validation(formData, formError) {
    let isValid = true;

    for (item of formData.entries()) {
        if (item[0] === 'email') {
            const regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/
            const valid = regex.test(item[1])
            formError.email = !valid
            isValid = valid && isValid
        }

        if (item[0] === 'password') {
            const valid = item[1].trim().length > 0 && item[1].trim() !== '';
            formError.password = !valid;
            isValid = valid && isValid
        }

        if (item[0] === 'confirmPassword') {
            const valid = item[1].trim() == formData.get('confirmPassword').trim()
            formError.confirmPassword = !valid
            isValid = valid && isValid
        }
    }


    return isValid
}

// login function

function Login() {
    const form = document.getElementById('login-form')
    const formData = new FormData(form)
    const error = { ...formError }
    const validate = validation(formData, error);
    if (validate) {
        $.ajax({
            method: 'post',
            url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQjXcjx8inkJsZOCe2ukhlraPajgCBObY',
            headers: {
                'Content-type': 'application/json'
            },
            origin: 'cors',
            async: false,
            data: JSON.stringify({
                'email': formData.get('email'),
                'password': formData.get('password'),
                'returnSecureToken': true
            }),
            success: function(res) {
                const { idToken, email, localId, refreshToken, expiresIn } = res
                localStorage.setItem('token', JSON.stringify({ idToken, user: { localId, email, refreshToken, expiresIn } }));
                alertMsg("User Signed In Successfully", "success", true, 'signIn .modal-content')
                setTimeout(function() {
                    window.location.reload()
                }, 2000)


            },
            error: function(err) {
                const msg = err.responseJSON.error.message.replaceAll('_', ' ');
                alertMsg(msg, 'error', true, 'signIn .modal-content')
            }
        })
    } else {
        const target = document.getElementsByclassName('authModal-body')[1];
        const ul = document.createElement('ul');
        ul.style.listStyleType = 'disc';
        for (let item of Object.entries(error)) {
            if (item[1]) {
                const li = document.createElement('li')
                li.append(`${item[0]} is required`);
                li.style.color = 'red'
                li.style.fontSize = '14px'
                ul.append(li)
            } else {
                ul.append('')
            }
        }
        if (target.firstChild.tagName === 'UL') {
            target.firstChild.replaceWith(ul)
        } else {
            target.prepend(ul)
        }
    }
}

// function Signup

function Signup() {
    const form = document.getElementById('signupFrom');
    const SignupFormData = new FormData(form)
    const error = { ...formError }
    const validate = validation(SignupFormData, error);

    if (validate) {

        $.ajax({
            method: 'post',
            url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQjXcjx8inkJsZOCe2ukhlraPajgCBObY',
            headers: {
                'Content-type': 'application/json'
            },
            origin: 'cors',
            async: false,
            data: JSON.stringify({
                'email': SignupFormData.get('email'),
                'password': SignupFormData.get('password'),
                'returnSecureToken': true
            }),
            success: function(res) {
                alertMsg("User Signup Successfully,please SignIn", "success", true, 'signup .modal-content')
                form.reset()
            },
            error: function(err) {
                const msg = err.responseJSON.error.message.replaceAll('_', ' ');
                alertMsg(msg, 'error', true, 'signup .modal-content')
            }
        })

    } else {
        const target = document.getElementsByClassName('authModal-body')[0];
        const ul = document.createElement('ul');
        ul.style.listStyleType = 'disc';
        for (let item of Object.entries(error)) {
            if (item[1]) {
                const li = document.createElement('li')
                li.append(`${item[0]} is required`);
                li.style.color = 'red'
                li.style.fontSize = '14px'
                ul.append(li)
            } else {
                ul.append('')
            }
        }
        if (target.firstChild.tagName === 'UL') {
            target.firstChild.replaceWith(ul)
        } else {
            target.prepend(ul)
        }
    }
}

// signout user
function Signout() {
    localStorage.clear();
    isSignedIn()
    alertMsg('User Signout Successfully', 'success')
    window.location.reload()

}


// fetch data from api
function fetchData(dbref) {
    fetch(`https://practise-a92ff-default-rtdb.firebaseio.com/${dbref}.json`)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('product', JSON.stringify(data))

            createCard(data)
        })
        .catch(err => {
            console.log(err)
        })

}


// create product card

function createCard(res) {
    let dataNode = ''
    $('.item-list').hide().empty()

    setTimeout(() => {
        if (res) {
            Object.keys(res).forEach(data => {
                dataNode = `
             <div class="item-card">
                    <div class="main-body">
                        <img src=${res[data].image} alt=${res[data].product_name}>
                        <div class="card-data">
                            <div class="product-name">${res[data].product_name}</div>
                            <div class="product-price"><i class='bx bx-rupee'></i> ${res[data].price}</div>
                            <div class="btn add-cart" data-prodid=${res[data].prodId} onclick="addToCart(this)"><i class="bx bx-shopping-bag"></i> Cart</div>
                        </div>
                    </div>
                </div>
    `

                $('.item-list').append(dataNode)
            })
        }


        $('.item-list').show('normal', 'linear')
    }, 0)


}


// helper functions


// reset form data on modal close

document.getElementById('signup').addEventListener('hidden.bs.modal', function() {
    document.getElementById('signupFrom').reset()
    const authclassName = document.getElementsByClassName('authModal-body')
    if (authclassName[0].firstChild.nodeName.toLowerCase() === 'ul') {
        authclassName[0].removeChild(authclassName[0].firstChild)
    }
})
document.getElementById('signIn').addEventListener('hidden.bs.modal', function() {
    document.getElementById('login-form').reset()
    const authclassName = document.getElementsByClassName('authModal-body')
    if (authclassName[1].firstChild.nodeName.toLowerCase() === 'ul') {
        authclassName[1].removeChild(authclassName[1].firstChild)
    }
})


// check user is logged in or not;

function isAuthenticated() {

    if (typeof window === 'undefiend') {
        return false
    } else {
        return JSON.parse(localStorage.getItem('token'))
    }
    return false

}

// isSignedIn function

function isSignedIn() {
    if (window == 'undefiend') {
        return false;
    }

    if (isAuthenticated()) {
        document.getElementById('profile').style.display = "block";
        document.getElementById('main-auth').style.display = "none";
        return true
    } else {
        document.getElementById('profile').style.display = "none";
        document.getElementById('main-auth').style.display = "block";
    }
    return false
}

// Show Error Alert

function alertMsg(msg, alertType, modal = false, alertMount = null) {
    let className = ''
    let removeAlert = null
    let parent = null


    if (alertType.toUpperCase() === 'SUCCESS') {
        className = 'alert-success'
    }

    if (alertType.toUpperCase() === "ERROR") {
        className = 'alert-error'
    }

    if (alertType.toUpperCase() === "WARNING") {
        className = 'alert-warning'
    }

    const div = document.createElement('div')
    div.setAttribute('class', `alert alertMsg ${className}`)
    div.setAttribute('role', 'alert')
    div.append(msg)

    if (modal) {
        // if modal
        parent = document.querySelector(`#${alertMount}`);
        parent.prepend(div)
        removeAlert = parent.firstChild
    } else {
        parent = document.getElementsByTagName('body')[0]
        parent.insertBefore(div, parent.children[1])
        removeAlert = parent.children[1]
    }

    // remove alert after 2 second
    setTimeout(function() {
        parent.removeChild(removeAlert)
    }, 2000)

}

// toggle cart

function showCart(ref, showData) {
    document.querySelector(ref).classList.toggle('hide')
    document.querySelector(showData).classList.toggle('hide')
}