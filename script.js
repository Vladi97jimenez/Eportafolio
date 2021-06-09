$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({
            scrollTop: 0
        });
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Electrónica", "Bases De Datos", "Otro", "Otro", "Otro"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });




    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
});

document.getElementById("Idioma").addEventListener('change', function () {
    window.location = this.value;
}, false);

function viewP(url) {
    Swal.fire({
        imageUrl: url,

        imageAlt: 'image',

    })
}

function sendEmail(e) {
    e.preventDefault();
    const name = document.getElementById('txt-name'),
        email = document.getElementById('txt-email'),
        message = document.getElementById('txt-message'),
        asunto = document.getElementById('txt-subject');

    if (name.value === '' || email.value === '' || message.value === '' || asunto.value === '') {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Llena todos los campos',
            showConfirmButton: false,
            timer: 1500
        })

    } else {


        var send = {
            userSupport: 'Eliezer Jimenez',
            emailSupport: 'jiemenezpinedaeliezer@gmail.com',
            nameContact: name.value,
            lastContact: ' ',
            emailContact: email.value,
            message: message.value,
            phoneContact: ' '
        }
        console.log(send);

        let timerInterval
        Swal.fire({
            title: 'Enviando!',
            html: 'Por favor espera',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                    const content = Swal.getHtmlContainer()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                            b.textContent = Swal.getTimerLeft()
                        }
                    }
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
            }

        })
        fetch('https://backend-hiperefe.herokuapp.com/supportEmail', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(send), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Ups, Try Again Later',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .then(response => {
            name.value = '';
            email.value = '';
            message.value = '';
            asunto.value = '';
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            console.log('Success:', response)
        });
    }
}