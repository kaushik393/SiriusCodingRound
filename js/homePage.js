$('document').ready(function () {
    autoScroll();
    countDown();
    fetchWeather();
    fetchDestinations();
    formValidation();
})

var validName = false,
    validContact = false,
    validMail = false;

function autoScroll() {
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on("click", scroll);
}

function scroll(event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000, function () {
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    return false;
                } else {
                    $target.attr('tabindex', '-1');
                    $target.focus();
                };
            });
        }
    }
}


function countDown() {

    var note = $('.js-timer'),
        ts = new Date(2021, 07, 8);

    if ((new Date()) > ts) {
        ts = (new Date()).getTime() + 10 * 24 * 60 * 60 * 1000;
        newYear = false;
    }

    $('#countdown').countdown({
        timestamp: ts,
        callback: function (days, hours, minutes, seconds) {

            var message = "";

            message += days + "d" + (days == 1 ? '' : '') + " ";
            message += hours + "h" + (hours == 1 ? '' : '') + " ";
            message += minutes + "m" + (minutes == 1 ? '' : '') + " ";
            message += seconds + "s" + (seconds == 1 ? '' : '') + " <br />";
            note.html(message);
        }
    });

}

function fetchWeather() {

    $.ajax({
        url: "https://run.mocky.io/v3/e3ae9d2e-78f5-403d-b6cd-fa7f8c7e1576", success: function (result) {

            var $ele = '<div class="siriusHome_weatherContainerTitle">THE WEATHER CHANNEL</div><div class="siriusHome_weatherContainerDeck">'

            for (var i = 0; i < result.result.length; i++) {
                $ele += '<div class="siriusHome_weatherContainer siriusHome_weatherContainer' + i + ' " id=' + i + '>' +
                    '<div class="siriusHome_weatherText">' + result.result[i].city + '</div>' +
                    '<span class="siriusHome_weatherIcon"></span>' +
                    '<div class="siriusHome_weatherCelcius">' + result.result[i].temp_Celsius + '&deg;</div></div>'
            }
            $ele += '</div>'
            $(".siriusHome_weather").append($ele)
        }
    });

}

function fetchDestinations() {

    $.ajax({
        url: "https://run.mocky.io/v3/3e6901dd-9a60-4771-a8cb-9c62177a654c",
        success: function (result) {

            var $ele = '<div class="siriusHome_destinationContainerDeck">'

            for (var i = 0; i < result.result.length; i++) {
                $ele += '<div class="siriusHome_destinationImageContainer" id=' + i + '><img class="siriusHome_thumbnailImage" src=' + result.result[i].imageUrl + ' alt="image"/>' +
                    '<div class="siriusHome_destinationCountryName greyColor">' + result.result[i].city + '</div> </div>';


            }
            $ele += '</div';

            $(".siriusHome_destination").append($ele)
        }
    });

}

function formValidation() {
    $('#name').on('change', nameValidate);
    $('#contact').on('change', contactValidate);
    $('#email').on('change', emailValidate);
    $('.js_submitBtn').on('click', validation);
}

function nameValidate(e) {
    var first_name = $('#name').val();

    validName = true;
    $(".error").remove();
    if (first_name.length < 1) {
        validName = false;
        $('#name').after('<span class="error">Name is required</span>');
    }
};

function contactValidate(e) {
    var contact = $('#contact').val();

    validContact = true;
    $(".error").remove();
    if (contact.length != 10) {
        validContact = false;
        $('#contact').after('<span class="error">Invalid Contact No</span>');
    } else if (contact.length < 1) {
        validContact = false;
        $('#contact').after('<span class="error">Contact No is required.</span>');
    }
};

function emailValidate(e) {
    var email = $('#email').val();

    validMail = true;
    $(".error").remove();
    if (email.length < 1) {
        validMail = false;
        $('#email').after('<span class="error">Email is required.</span>');
    } else {
        var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;   
        var validEmail = regEx.test(email);
        if (!validEmail) {
            validMail = false;
            $('#email').after('<span class="error">Invalid email</span>');
        }
    }
};

function validation(e) {
    $(".error").remove();
    if(validName && validContact && validMail ) {
        $('.siriusHome_success').removeClass('hide').addClass('show');
        $('#name').val('');
        $('#contact').val('');
        $('#email').val('');
        validName = false;
        validContact = false;
        validMail = false;
    } else {
        $('#name').after('<span class="error">Name is required</span>');
        $('#contact').after('<span class="error">Contact No is required.</span>');
        $('#email').after('<span class="error">Email is required.</span>');
    }
};