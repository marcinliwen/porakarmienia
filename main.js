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
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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
        var hours = today.getHours();
        var minutes = today.getMinutes();
        hours = (hours < 10) ? '0'+ hours : hours;
        minutes = (minutes < 10 ) ? '0'+ minutes : minutes;
        var time = hours+':'+minutes;
        createTimeStop(time);

        this.classList.add('disable');
        startFeedBtn.classList.remove('disable');
    })
};



function createTimeStart(date, time){
    var li = document.createElement('li');
    var divLeft = document.createElement('div');
    divLeft.setAttribute('class', '-left');
    var h3 = document.createElement('h3');
    var span = document.createElement('span');
    span.innerText = date;
    var button = document.createElement('button');  

    li.setAttribute('class', 'time-mark current');
    li.appendChild(divLeft);

    li.appendChild(button);
    button.innerHTML= '<i class="material-icons">close </i>';
    button.setAttribute('class', 'btn -celar js-clear-selected');
    divLeft.appendChild(span);
    divLeft.appendChild(h3);    
    h3.innerText = time;

    if(document.querySelectorAll('.time-mark').length == 0){
        lastTime.appendChild(li);
    }else{
       lastTime.insertBefore(li, lastTime.childNodes[0]);
    }
    
    clearlistener();
}

function createTimeStop(time){
    //var h3 = document.createElement('h3');
    //h3.innerText = "- " + time;
    document.querySelector('.time-mark.current .-left h3').textContent += " - " + time;
   // document.querySelector('.time-mark.current .-left').appendChild(h3);
    document.querySelector('.time-mark.current').classList.remove('current');
    clearlistener();
}


function clearlistener(){
    
    var clearSelected = document.getElementsByClassName('js-clear-selected');
    for (let i = 0; i < clearSelected.length; i++){
        clearSelected[i].addEventListener('click', function(e){
                if(this.parentNode.classList.contains('current')){
                        startFeedBtn.classList.remove('disable');
                        stopFeedBtn.classList.add('disable');
                        this.parentNode.remove();
                }else{
                    this.parentNode.remove();
                }
                
        })
    }
};

