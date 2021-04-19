$(document).ready(function() {
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop:true,
        breakpointsBase:'window',
        breakpoints:{
        	580:{
        		slidesPerView:2,
        	},
        	900:{
        		slidesPerView:3,
        	},
        	
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
})