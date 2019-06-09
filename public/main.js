const lastTime = document.getElementById('js-last');
const startFeedBtn = document.getElementById('js-start');
const stopFeedBtn = document.getElementById('js-stop');
const setIntervalBtn = document.getElementById('js-set-interval');
const nextTime = document.getElementById('js-next');
const clearLastBtn = document.getElementById('js-clear-last');

let db;


window.onload = function(){
    getCurrentTime();


    let openRequest = indexedDB.open("karmienie", 8);
    
    openRequest.onupgradeneeded = function() {
        db = openRequest.result;
        if (!db.objectStoreNames.contains('lastTime')) { // if there's no "lastTime" store
          db.createObjectStore('lastTime', {keyPath :'id'}); // create it
        }

    };
      
    openRequest.onerror = function() {
    //console.error("Error", openResult.error);
    };
    
    
    openRequest.onsuccess = function() {
        db = openRequest.result;
        // continue to work with database using db object
        setTimeNext(currentTime = 0, 2);
        
    };
    
    
}

function addToDB(lastTime){
    console.log(lastTime);
    let transaction = db.transaction("lastTime", "readwrite"); // (1)

    // get an object store to operate on it
    let lastTimes = transaction.objectStore("lastTime"); // (2)

    let timeNew = {
        id : 'last',
        last_time: lastTime
    };

    let request = lastTimes.add(timeNew); // (3)

    request.onsuccess = function() { // (4)
    console.log("czas dodany", request.result);
    };

    request.onerror = function() {
    console.log("Error", request.error);
    };
}

function setTimeNext(currentTime, interval){
    
    
    if(currentTime!= 0){
        var timeInterval = interval * 3600000;
        console.log(currentTime);
        var nextTime = currentTime + timeInterval;
        var date = new Date(nextTime);
        
        var nextaDate =  convertDateObjectToDate(date);
        document.querySelector('.time-mark .-left .--next').innerHTML = nextaDate.time;
        document.querySelector('#js-next .--date').innerHTML = nextaDate.date;
    }else{
        let transaction = db.transaction("lastTime", "readwrite");
        let objectStore = transaction.objectStore("lastTime");
        let request = objectStore.get("last");
        
        request.onerror = function(event) {
        // Handle errors!
        
        
        };
        request.onsuccess = function(event) {
            
            // Do something with the request.result!
            var currentTime = request.result.last_time;
            
            var timeInterval = interval * 3600000;
            
            var nextTime = currentTime + timeInterval;
            var date = new Date(nextTime);
            
            var nextaDate =  convertDateObjectToDate(date);
            document.querySelector('.time-mark .-left .--next').innerHTML = nextaDate.time;
            document.querySelector('#js-next .--date').innerHTML = nextaDate.date;
            
        };
    }
        
    
}

function getCurrentTime(){
    startFeedBtn.addEventListener('click', function(){
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
        this.classList.add('disable');
        stopFeedBtn.classList.remove('disable');     
        
    });
    
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
        startFeedBtn.classList.remove('disable');

        addToDB(nextTime);
    });
    
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
    document.querySelector('#js-next').classList.remove('inactive');
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