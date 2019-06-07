const lastTime = document.getElementById('js-last');
const startFeedBtn = document.getElementById('js-start');
const stopFeedBtn = document.getElementById('js-stop');
const setIntervalBtn = document.getElementById('js-set-interval');
const nextTime = document.getElementById('js-next');
const clearLastBtn = document.getElementById('js-clear-last');




window.onload = function(){
    getCurrentTime();
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
        setTimeNext(nextTime, 2);

        this.classList.add('disable');
        startFeedBtn.classList.remove('disable');
    })
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

function setTimeNext(currentTime, interval){
    var timeInterval = interval * 3600000;

    var nextTime = currentTime + timeInterval;
    var date = new Date(nextTime);
    var nextaDate =  convertDateObjectToDate(date);
    document.querySelector('.time-mark .-left .--next').innerHTML = nextaDate.time;
    document.querySelector('#js-next .--date').innerHTML = nextaDate.date;
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