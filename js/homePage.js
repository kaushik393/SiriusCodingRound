$('document').ready(function(){
    countDown();
    fetchWeather();
    fetchDestinations();
}) 


function countDown() {

    var note = $('.js-timer'),
        ts = new Date(2021, 07, 10);    

    if((new Date()) > ts){
        // The new year is here! Count towards something else.
        // Notice the *1000 at the end - time must be in milliseconds
        ts = (new Date()).getTime() + 10*24*60*60*1000;
        newYear = false;
    }

    $('#countdown').countdown({
        timestamp   : ts,
        callback    : function(days, hours, minutes, seconds){

            var message = "";

            message += days + "d" + ( days==1 ? '':'' ) + " ";
            message += hours + "h" + ( hours==1 ? '':'' ) + " ";
            message += minutes + "m" + ( minutes==1 ? '':'' )+ " ";
            message += seconds + "s" + ( seconds==1 ? '':'' ) + " <br />";
            note.html(message);
        }
    });

}

function fetchWeather() {

    $.ajax({url: "https://run.mocky.io/v3/e3ae9d2e-78f5-403d-b6cd-fa7f8c7e1576", success: function(result){
       
    for(var i=0; i<=result.result.length; i++){
        var $ele = '<div id='+i+'><div>"'+result.result[i].city+'"</div><br>'+
                    '<img alt="image"/>'+
                    '<div>"'+result.result[i].temp_Celsius+'"</div></div>'

$(".siriusHome_weather").append($ele)
    }
        console.log(result)
      }});
 
}

function fetchDestinations() {

    $.ajax({url: "https://run.mocky.io/v3/3e6901dd-9a60-4771-a8cb-9c62177a654c", success: function(result){
       
    for(var i=0; i<=result.result.length; i++){
        var $ele = '<div id='+i+'><div>"'+result.result[i].city+'"</div><br>'+
                    '<img src='+result.result[i].imageUrl+' alt="image"/>';

$(".siriusHome_destination").append($ele)
    }
        console.log(result)
      }});
 
}