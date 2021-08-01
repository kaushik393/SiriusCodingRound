var Sirius = Sirius || {};

Sirius.HomePage = function () {

    var selectors = {
        countdown           : '.js-timer',
        submit              : '.js_submitBtn',
        offerText           : '.siriusHome_offerText2',
        weatherContainer    : '.siriusHome_weather',
        destinationContainer: '.siriusHome_destination',
        successMsg          : '.siriusHome_success',
        error               : '.error',
        name                : '#name',
        contactNo           : '#contact',
        email               : '#email'
    },
        validName       = false,
        validContact    = false,
        validMail       = false;

    /**
     * Calls the initializing functions.
     */
    function init() {
        autoScroll();
        countDown();
        fetchWeather();
        fetchDestinations();
        formValidation();
    }

    /**
     * Initialize autoScroll on click of Nav.
     */
    function autoScroll() {
        $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on("click", scroll);
    }

    /**
    * Scrolls to the clicked nav bar section.
    */
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

    /**
    * Runs countdown for displaying Offer.
    */    
    function countDown() {
        var note = $(selectors.countdown),
            ts = new Date(2021, 07, 08, 18, 00, 00),
            offerEnd = true,
            message;

        if ((new Date()) > ts) {
            ts = (new Date()).getTime(),
                offerEnd = false;
        }
        $(selectors.countdown).countdown({
            timestamp: ts,
            callback: function (days, hours, minutes, seconds) {
                message = "";

                if (offerEnd) {
                    message += days + "d" + (days == 1 ? '' : '') + " ";
                    message += hours + "h" + (hours == 1 ? '' : '') + " ";
                    message += minutes + "m" + (minutes == 1 ? '' : '') + " ";
                    message += seconds + "s" + (seconds == 1 ? '' : '') + " <br />";
                    note.html(message);
                }
                else {
                    message += "You have just missed the above offer!! Please wait for next exciting offer";
                    $(selectors.offerText).html(message)
                }
            }
        });
    }

    /**
    * Fetch and render weather updates.
    */ 
    function fetchWeather() {
        var $ele;

        $.ajax({
            url: "https://run.mocky.io/v3/e3ae9d2e-78f5-403d-b6cd-fa7f8c7e1576",
            success: function (result) {
                $ele = '<div class="siriusHome_weatherContainerTitle">THE WEATHER CHANNEL</div><div class="siriusHome_weatherContainerDeck">'
                for (var i = 0; i < result.result.length; i++) {
                    $ele += '<div class="siriusHome_weatherContainer siriusHome_weatherContainer' + i + ' " id=' + i + '>' +
                        '<div class="siriusHome_weatherText">' + result.result[i].city + '</div>' +
                        '<span class="siriusHome_weatherIcon"></span>' +
                        '<div class="siriusHome_weatherCelcius">' + result.result[i].temp_Celsius + '&deg;</div></div>'
                }
                $ele += '</div>'
                $(selectors.weatherContainer).append($ele)
            }
        });
    }

    /**
    * Fetch and render destination.
    */ 
    function fetchDestinations() {
        var $ele;

        $.ajax({
            url: "https://run.mocky.io/v3/3e6901dd-9a60-4771-a8cb-9c62177a654c",
            success: function (result) {
                $ele = '<div class="siriusHome_destinationContainerDeck">'
                for (var i = 0; i < result.result.length; i++) {
                    $ele += '<div class="siriusHome_destinationImageContainer" id=' + i + '><img class="siriusHome_thumbnailImage" src=' + result.result[i].imageUrl + ' alt="image"/>' +
                        '<div class="siriusHome_destinationCountryName greyColor">' + result.result[i].city + '</div> </div>';
                }
                $ele += '</div';
                $(selectors.destinationContainer).append($ele)
            }
        });
    }

    /**
    * Initialize onChange events for form.
    */ 
    function formValidation() {
        $(selectors.name).on('change', nameValidate);
        $(selectors.contactNo).on('change', contactValidate);
        $(selectors.email).on('change', emailValidate);
        $(selectors.submit).on('click', validation);
    }

    /**
    * Validated Name field.
    */ 
    function nameValidate(e) {
        var first_name = $(selectors.name).val();

        validName = true;
        $(selectors.error).remove();
        if (first_name.length < 1) {
            validName = false;
            $(selectors.name).after('<span class="error">Name is required</span>');
        }
    };

    /**
    * Validated ContactNo field.
    */ 
    function contactValidate(e) {
        var contact = $(selectors.contactNo).val();

        validContact = true;
        $(selectors.error).remove();
        if (contact.length != 10) {
            validContact = false;
            $(selectors.contactNo).after('<span class="error">Invalid Contact No</span>');
        } else if (contact.length < 1) {
            validContact = false;
            $(selectors.contactNo).after('<span class="error">Contact No is required.</span>');
        }
    };

    /**
    * Validated email field.
    */ 
    function emailValidate(e) {
        var email = $(selectors.email).val(),
            regEx,
            validEmail;

        validMail = true;
        $(selectors.error).remove();
        if (email.length < 1) {
            validMail = false;
            $(selectors.email).after('<span class="error">Email is required.</span>');
        } else {
            regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            validEmail = regEx.test(email);
            if (!validEmail) {
                validMail = false;
                $(selectors.email).after('<span class="error">Invalid email</span>');
            }
        }
    };

    /**
    *Final validation of Submit click.
    */ 
    function validation(e) {
        $(selectors.error).remove();
        if (validName && validContact && validMail) {
            $(selectors.successMsg).removeClass('hide').addClass('show');
            $(selectors.name).val('');
            $(selectors.contactNo).val('');
            $(selectors.email).val('');
            validName = false;
            validContact = false;
            validMail = false;
        } else {
            $(selectors.name).after('<span class="error">Name is required</span>');
            $(selectors.contactNo).after('<span class="error">Contact No is required.</span>');
            $(selectors.email).after('<span class="error">Email is required.</span>');
        }
    };

    return {
        selectors: selectors,
        init: init
    };
}();







