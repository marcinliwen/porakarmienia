//const lastTime = document.getElementById('js-last');
const startFeedBtnL = document.getElementById('js-start-l');
const startFeedBtnR = document.getElementById('js-start-r');
const stopFeedBtn = document.getElementById('js-stop');
const setIntervalBtn = document.getElementById('js-set-interval');
const nextTime = document.getElementById('js-next');
const clearLastBtn = document.getElementById('js-clear-last');
const openFeedBtn = document.getElementById('open-feed-board');



var feedSide = "";

let db;


window.onload = function(){
    getCurrentTime();
    //feedBoardHandler();
    console.log('click');
    document.querySelector('#open').onclick = function(){
        console.log('click');
        if(this.classList.contains('active')){
            this.classList.remove('active')
        }else{
            this.classList.add('active');
        }
        document.querySelector('.add-event').classList.remove('open');

        var feedBoard = document.getElementById('feed-board');
            if(feedBoard.classList.contains('-open')){
                feedBoard.classList.remove('-open');    
            }else{
                feedBoard.classList.add('-open');
            }
    };
    
    document.getElementById('add-event').onclick = function(){
        var eventArea = document.querySelector('.add-event');
        if(eventArea.classList.contains('open')){
            eventArea.classList.remove('open');
        }else{
            eventArea.classList.add('open');
        }
        
    }

    document.getElementById('close-feed').onclick = function(){
        document.querySelector('.add-event').classList.remove('open');
        document.getElementById('feed-board').classList.remove('-open');
    }
    var DB_VERSION = 11;
    var BD_NAME = 'karmienie';

    let openRequest = indexedDB.open(BD_NAME,  DB_VERSION );
    
    openRequest.onupgradeneeded = function() {
        db = openRequest.result;
        if (!db.objectStoreNames.contains('data')) { // if there'ss no "data" store
          db.createObjectStore('data', {autoIncrement: true});
            console.log('[iDB - object \'data\' createed');
        }

    };
      
    openRequest.onerror = function() {
    //console.error("Error", openResult.error);
    };
    
    
    openRequest.onsuccess = function() {
        console.log('[iDB - is created]')
        db = openRequest.result;
        // continue to work with database using db object
        setTimeNext();
        
    };
    
    
}


function addToDB(data, side){
    var data = {'data': data, 'strona':side};
    console.log(data);
    
        var karmienieEvent = db.transaction("data", "readwrite").objectStore("data");
        //var request = objectStore.get("last");
        let newData = {
            //id : 'last',
            data: data
        };

        let request = karmienieEvent.add(newData); // (3)

        request.onsuccess = function() { // (4)
        console.log("czas dodany", request.result);
        };

        request.onerror = function() {
        console.log("Error", request.error);
        };
}

function setTimeNext(){
       
        let transaction = db.transaction("data", "readwrite");
        let objectStore = transaction.objectStore("data");
        let request = objectStore.getAll();
        
        request.onerror = function(event) {
        // Handle errors!        
        };
        request.onsuccess = function(event) {    
            // Do something with the request.result!
            console.log(request.result);
            if(request.result != undefined){

                var currentTime = request.result;
                console.log(currentTime);

                currentTime.forEach(function(element){
                    
                    
                    console.log("data:" + element.data.data);
                    console.log("strona:" + element.data.strona);
                    var nextTime = element.data.data;
                    var date = new Date(nextTime);
                    
                    var nextaDate =  convertDateObjectToDate(date);
                    console.log(nextaDate);
                   // document.querySelector('.--next').innerHTML = nextaDate.time;
                    //document.querySelector('.--date').innerHTML = nextaDate.date; 
                    //document.querySelector('.--side').innerHTML = element.data.strona;
                    createTimeElement(nextaDate.time, nextaDate.date , element.data.strona );
                })
              
                    
                
            }
            
        };
       // document.querySelector('#js-next').classList.remove('inactive');
    
    }
        


function getCurrentTime(){
    
    startFeedBtnL.addEventListener('click', function(){
       
        if(startFeedBtnR.classList.contains('inactive')){
            startFeedBtnR.classList.remove('inactive');
        }
        else{
            startFeedBtnR.classList.add('inactive');
        };


        if(this.classList.contains('active')){
            

            this.classList.remove('active');
            this.querySelector('span').innerHTML="lewa";

            var today = new Date();
            var nextTime = today.getTime();
            var hours = today.getHours();
            var minutes = today.getMinutes();
            hours = (hours < 10) ? '0'+ hours : hours;
            minutes = (minutes < 10 ) ? '0'+ minutes : minutes;
            var time = hours+':'+minutes;
            createTimeStop(time);
            //setTimeNext(nextTime,2);
            addToDB(nextTime, feedSide);

        }else{
            
            if(startFeedBtnR.classList.contains('active')){
                startFeedBtnR.classList.remove('active');
                startFeedBtnR.querySelector('span').innerHTML= "prawa";
                var today = new Date();
                var nextTime = today.getTime();
                var hours = today.getHours();
                var minutes = today.getMinutes();
                hours = (hours < 10) ? '0'+ hours : hours;
                minutes = (minutes < 10 ) ? '0'+ minutes : minutes;
                var time = hours+':'+minutes;
                createTimeStop(time);
                //setTimeNext(nextTime,2);


            };
            
                var today = new Date();
                var day = today.getDate();
                var month = today.getMonth();
                day = (day < 10) ? '0'+ day : day;
                month = (month < 10) ? '0'+month :month;
                var date =day +"-"+month+"-"+ today.getFullYear();
                var hours = today.getHours();
                var minutes = today.getMinutes();
                hours = (hours < 10) ? '0'+ hours : hours;
                minutes = (minutes < 10 ) ? '0'+ minutes : minutes;
                var time = hours+':'+minutes;
                createTimeStart(date, time);
            
                feedSide = "L";
                
                this.classList.add('active');
                this.querySelector('span').innerHTML="STOP";

               
        };
        
        

        //addToDB(nextTime, feedSide);
    });
    
   
    startFeedBtnR.addEventListener('click', function(){
        if(startFeedBtnL.classList.contains('inactive')){
            startFeedBtnL.classList.remove('inactive');
        }
        else{
            startFeedBtnL.classList.add('inactive');
        };

        if(this.classList.contains('active')){
            
            
            this.classList.remove('active');
            this.querySelector('span').innerHTML= "prawa";

            var today = new Date();
            var nextTime = today.getTime();
            var hours = today.getHours();
            var minutes = today.getMinutes();
            hours = (hours < 10) ? '0'+ hours : hours;
            minutes = (minutes < 10 ) ? '0'+ minutes : minutes;
            var time = hours+':'+minutes;
            createTimeStop(time);
            //setTimeNext(nextTime,2);
            addToDB(nextTime, feedSide);
        }else{

            

            if(startFeedBtnL.classList.contains('active')){
                startFeedBtnL.classList.remove('active');
                startFeedBtnL.querySelector('span').innerHTML= "lewa";
                var today = new Date();
                var nextTime = today.getTime();
                var hours = today.getHours();
                var minutes = today.getMinutes();
                hours = (hours < 10) ? '0'+ hours : hours;
                minutes = (minutes < 10 ) ? '0'+ minutes : minutes;
                var time = hours+':'+minutes;
                createTimeStop(time);
                //setTimeNext(nextTime,2);
                addToDB(nextTime, feedSide);

            };
            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth();
            day = (day < 10) ? '0'+ day : day;
            month = (month < 10) ? '0'+month :month;
            var date =day +"-"+month+"-"+ today.getFullYear();
            var hours = today.getHours();
            var minutes = today.getMinutes();
            hours = (hours < 10) ? '0'+ hours : hours;
            minutes = (minutes < 10 ) ? '0'+ minutes : minutes;
            var time = hours+':'+minutes;
            createTimeStart(date, time);
            
            feedSide = "P";

            this.classList.add('active');
            this.querySelector('span').innerHTML="STOP";
            
        };
        
    });
    
    /*
    stopFeedBtn.addEventListener('click', function(){
        var today = new Date();
        var nextTime = today.getTime();
        var hours = today.getHours();
        var minutes = today.getMinutes();
        hours = (hours < 10) ? '0'+ hours : hours;
        minutes = (minutes < 10 ) ? '0'+ minutes : minutes;
        var time = hours+':'+minutes;
        createTimeStop(time);
        setTimeNext(nextTime,2);

        this.classList.add('disable');
        //startFeedBtnL.classList.remove('disable');
       // startFeedBtnR.classList.remove('disable');


        addToDB(nextTime, feedSide);
        
    });
    */
};



function createTimeStart(date, time){
    document.querySelector('.time-mark .-left .--from').innerHTML = time;
    document.querySelector('.time-mark .-left .--to').innerHTML = "do";
    document.querySelector('.time-mark .-left .--to').classList.add('waiting');
    document.querySelector('.time-mark  .--date').innerHTML = date;
    document.querySelector('#js-last').classList.remove('inactive');
}

function createTimeStop(time){
    document.querySelector('.time-mark .-left .--to').innerHTML = time;
    document.querySelector('.time-mark .-left .--to').classList.remove('waiting');
    //document.querySelector('#js-next').classList.remove('inactive');
}



function convertDateObjectToDate(today){
        var day = today.getDate();
        var month = today.getMonth();
        day = (day < 10) ? '0'+ day : day;
        month = (month < 10) ? '0'+month :month;
        var date =day +"-"+month+"-"+ today.getFullYear();
        var hours = today.getHours();
        var minutes = today.getMinutes();
        hours = (hours < 10) ? '0'+ hours : hours;
        minutes = (minutes < 10 ) ? '0'+ minutes : minutes;
        var time = hours+':'+minutes;
    return {date, time};
}

/*
function createTimeEvent(){
    if ('content' in document.createElement('template')) {
        var eventCard = document.getElementById('event');
        var cloneOfeventCard = document.importNode(eventCard.content,true);
        document.querySelector('.day__container').appendChild(cloneOfeventCard);
    }
}

*/

function displayTimer(){     
    var hour = Math.floor(totalSeconds /3600);
    var minute = Math.floor((totalSeconds - hour*3600)/60);
    var seconds = totalSeconds - (hour*3600 + minute*60);
    hour = (hour < 10) ? '0'+ hour : hour;
    minute = (minute < 10 ) ? '0'+ minute : minute;
    seconds = (seconds < 10 ) ? '0'+ seconds : seconds;
    
    display.innerHTML = ((hour > 0 )? hour + ":" : "" )+ minute + ":" + seconds;
    totalSeconds += 1;
}

var display = document.getElementById('feed-timer');
var totalSeconds = 0;
var timer;
var timerRun = false;

startFeedBtnL.addEventListener('click', function(){
   
        if(timerRun == false){
            timer = setInterval(displayTimer, 1000);
            timerRun = true;
           }else{
            clearInterval(timer);
            timerRun = false;
            totalSeconds = 0;
        }
    
    
});

startFeedBtnR.addEventListener('click', function(){
    
        if(timerRun == false){
        timer = setInterval(displayTimer, 1000);
        timerRun = true;
        }else{
        clearInterval(timer);
        timerRun = false;
        totalSeconds = 0;
        }

});

/**
 * print all data from indexedDB
 */


function createTimeElement(time, data, strona){
    var timeList = document.getElementById('timeline');
    var eventElement = document.createElement('div');
    eventElement.innerHTML = '<div class="event_container inactive"><div class="event__time"><h3 class="--next">'+time+'</h3></div><div class="event__name"> <h2>Karmienie</h2></div><div class="event__side"><h3 class="--side">'+strona+'</h3> </div></div>';
    timeList.prepend(eventElement);
}