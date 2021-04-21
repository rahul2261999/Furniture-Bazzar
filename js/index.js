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
    	
        firebase.auth().signInWithEmailAndPassword(formData.get('email'),formData.get('password') )
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
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

        firebase.auth().createUserWithEmailAndPassword(SignupFormData.get('email'), SignupFormData.get('password'))
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });
        alert("User Signup SuccessFully");

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