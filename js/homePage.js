$('document').ready(function(){
    countDown();
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

};