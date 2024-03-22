
window.onload = () => {
    /*Pomodoro*/

    let workTime;
    let breakTime;
    let timesCompleted; /*cuantos tiempos completados*/
    let cyclesGoal;
    let cyclesCompleted = 0;

    let clockMinutes;
    let clockSeconds;

    let clock = document.getElementById('clock');
    let cyclesInput = document.getElementById('cycles-input');
    let startButton = document.getElementById('start-button');
    let workTimeInput = document.getElementById('work-time');
    let breakTimeInput = document.getElementById('break-time');
    let restTimeInput = document.getElementById('rest-time');

    let currentTime ;/* Minutos seteados */
    let seconds = 0;
    
    let stopButton = document.getElementById('stop-button');

    startButton.onclick = () => {
        populateVariables();
        startPomodoro();
        document.getElementById('click').play();
        document.getElementById('start-button').style.display = "none";
        document.getElementById('stop-button').style.display = "block";
        
    }
    stopButton.onclick = () => {
        stop();
        document.getElementById('click').play();
        document.getElementById('start-button').style.display = "block";
        document.getElementById('stop-button').style.display = "none";
        document.getElementsByClassName('work')[0].style.display = "none";
        document.getElementsByClassName('break')[0].style.display = "none";
        
    }


    function startPomodoro(){
        seconds=1;
        console.log("Start Pomodoro");
        pomodoroController();
    }
    function pomodoroController(){
        if (isRestTime()){
            cyclesCompleted++;
            if(!goalReached()){
                currentTime = resTime;
                alarm();
                timer();
                timesCompleted = 0;
            }else{
                console.log('Pomodoro Finished!');
                stop();
            }
            return;
        }
        if(timesCompleted % 2 == 0){
            currentTime = workTime;
            timesCompleted++;

            document.getElementsByClassName('work')[0].style.display = "block";
            document.getElementsByClassName('break')[0].style.display = "none";
   
            timer();
         
            console.log('Time to Work! TC:' + timesCompleted + ", cycles:" + cyclesCompleted);
        }else if(timesCompleted % 2 != 0 && timesCompleted > 0){
            currentTime = breakTime;
            timesCompleted++;

            document.getElementsByClassName('work')[0].style.display = "none";
            document.getElementsByClassName('break')[0].style.display = "block";
   

            timer();
            console.log('Time to Break! TC:' + timesCompleted + ", cycles:" + cyclesCompleted);
        }
    }

    /* Timer */
    

    function timer(){
        if(currentTime > 0 || seconds>0) {
            if(seconds == 0){
                seconds = 59;
                currentTime--;
            }else{
                seconds--;
            }
            updateClock();
            console.log(currentTime, seconds);
            interval = setTimeout(timer, 1100);
        }else{
            pomodoroController();
            console.log('El temporizador termino');
            alarm();
        }

    }
    timer();

function isRestTime(){
    return timesCompleted == 7;
}
function goalReached(){
    document.getElementsByClassName('stop')[0].style.display = "block";
    document.getElementsByClassName('work')[0].style.display = "none";
    document.getElementsByClassName('break')[0].style.display = "none";
    return cyclesGoal == cyclesCompleted;
}

function populateVariables(){
    console.log("Populated variables");
    workTime = workTimeInput.value;
    breakTime = breakTimeInput.value;
    resTime = restTimeInput.value;
    cyclesGoal = cyclesInput.value;
    currentTime = workTime;
    timesCompleted = 0
}

function updateClock(){
    clockMinutes = formatNumbers(currentTime);
    clockSeconds = formatNumbers(seconds);
    clock.innerHTML = clockMinutes + ":" + clockSeconds;
}
function formatNumbers(time){

    let formattedDigits;
    if(time < 10){
        formattedDigits = "0" + time;
    }else{
        formattedDigits = time;
    }
    return formattedDigits;
}
function stop(){
    clearTimeout(interval);
}
function alarm(){
    document.getElementById('alarm').play();
}

};
