$('document').ready(function () {
    countDown();
    fetchWeather();
    fetchDestinations();
    formValidation();
})


function countDown() {

    var note = $('.js-timer'),
        ts = new Date(2021, 07, 10);

    if ((new Date()) > ts) {
        // The new year is here! Count towards something else.
        // Notice the *1000 at the end - time must be in milliseconds
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

            var $ele = '<div class="siriusHome_weatherContainerTitle">The Weather channel</div><div class="siriusHome_weatherContainerDeck">'

            for (var i = 0; i < result.result.length; i++) {
                 $ele += '<div class="siriusHome_weatherContainer siriusHome_weatherContainer'+ i +' " id=' + i + '>' +
                    '<div class="siriusHome_weatherText">' + result.result[i].city + '</div>' +
                    '<span class="siriusHome_weatherIcon"></span>' +
                    '<div class="siriusHome_weatherCelcius">' + result.result[i].temp_Celsius + '</div></div>'
            }
            $ele +='</div>'
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
                $ele += '<div class="siriusHome_destinationImageContainer" id=' + i + '><img class="siriusHome_thumbnailImage" src=' + result.result[i].imageUrl + ' alt="image"/>'+
                            '<div class="siriusHome_destinationCountryName">' + result.result[i].city + '</div> </div>';

                
            }
            $ele +='</div';

            $(".siriusHome_destination").append($ele)
        }
    });

}

function formValidation() {
    $('#first_form').submit(function (e) {
        e.preventDefault();
        var first_name = $('#name').val();
        var contact = $('#contact').val();
        var email = $('#email').val();

        $(".error").remove();

        if (first_name.length < 1) {
            $('#name').after('<span class="error">This field is required</span>');
        }
        if (contact.length != 10) {
            $('#contact').after('<span class="error">This field is required</span>');
        }
        if (email.length < 1) {
            $('#email').after('<span class="error">This field is required</span>');
        } else {
            var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
            var validEmail = regEx.test(email);
            if (!validEmail) {
                $('#email').after('<span class="error">Enter a valid email</span>');
            }
        }
    });
}