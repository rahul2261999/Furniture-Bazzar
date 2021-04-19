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

function validation(formData) {
    let isValid = true;

    for (item of formData.entries()) {
        if (item[0] === 'email') {
            const regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/
            const valid = regex.test(item[1])
            formError.email = !valid
            isValid = valid && isValid
        }

        if (item[0] === 'password') {
            const valid = item[1].trim() !== '';
            formError.password = !valid;
            isValid = valid && isValid
        }

        if (item[0] === 'confirmPassword') {
            const valid = item[1].trim() == cpass
            formError = !valid
            isValid = valid && isValid
        }
    }


    return isValid
}

// login function

function Login() {
    const form = document.getElementById('login-form')
    const formData = new FormData(form)
    const validate = validation(formData)

    if (validate) {
        // send data
        alert("form submit")
    } else {
        const target = document.getElementsByClassName('authModal-body')[1];
        const ul = document.createElement('ul');
        ul.style.listStyleType = 'disc';
        for (let item of Object.entries(formError)) {
        	console.log(item)
            if (item[1]) {
                const li = document.createElement('li')
                li.append(`${item[0]} is required`);
                li.style.color = 'red'
                li.style.fontSize = '14px'
                ul.append(li)
            }
            else{
            	ul.append('')
            }
        }
        if (target.firstChild.tagName === 'UL') {
        	console.log('hete')
            target.firstChild.replaceWith(ul)
        } else {
            target.prepend(ul)
        }
    }
}