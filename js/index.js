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
    console.log(isAuthenticated())
})

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
            console.log(formData.get('confirmPassword').trim())
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
                console.log(res)
                const { idToken, email, localId, refreshToken, expiresIn } = res
                localStorage.setItem('token', JSON.stringify({idToken,user:{localId,email,refreshToken,expiresIn}}));
                window.location.reload()

            },
            error: function(err) {}
        })
    } else {
        const target = document.getElementsByClassName('authModal-body')[1];
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
                alert('user created success')
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
    alert("user logged out")
    localStorage.clear();
    isSignedIn()
}

// reset form data on modal close

document.getElementById('signup').addEventListener('hidden.bs.modal', function() {
    document.getElementById('signupFrom').reset()
    const authclass = document.getElementsByClassName('authModal-body')
    if (authclass[0].firstChild.nodeName.toLowerCase() === 'ul') {
        authclass[0].removeChild(authclass[0].firstChild)
    }
})
document.getElementById('signIn').addEventListener('hidden.bs.modal', function() {
    document.getElementById('login-form').reset()
    const authclass = document.getElementsByClassName('authModal-body')
    if (authclass[1].firstChild.nodeName.toLowerCase() === 'ul') {
        authclass[1].removeChild(authclass[1].firstChild)
    }
})



// helper functions

// close modal

function closeModal(modalref) {
}

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
        console.log('here')
        return true
    } else {
        document.getElementById('profile').style.display = "none";
        document.getElementById('main-auth').style.display = "block";
    }
    return false
}