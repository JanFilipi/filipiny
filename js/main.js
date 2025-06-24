

const locations = [
    {timeZone: 'Europe/Prague', name: 'Prague', url: '../img/prague.png', time: '', date: ''}, 
    {timeZone: 'Europe/London', name: 'London', url: '../img/london.png', time: '', date: ''}, 
    {timeZone: 'America/New_York', name: 'New York', url: '../img/new_york.png', time: '', date: ''}, 
    {timeZone: 'Asia/Tokyo', name: 'Tokyo', url: '../img/tokyo2.png', time: '', date: ''}, 
    {timeZone: 'Asia/Manila', name: 'Manila', url: '../img/philippines.png', time: '', date: ''}, 
]

let index = 0;
let lastTime = 0;
const SWIPE_DURATION = 0.5;
const SWIPE_TIMEOUT = SWIPE_DURATION * 1000 + 100;

const boxLeft = document.getElementById('box-left');
const boxMiddle = document.getElementById('box-middle');
const boxRight = document.getElementById('box-right');

const locationLeft = document.getElementById('location-box-left');
const locationMiddle = document.getElementById('location-box-middle');
const locationRight = document.getElementById('location-box-right');

const timeLeft = document.getElementById('time-box-left');
const timeMiddle = document.getElementById('time-box-middle');
const timeRight = document.getElementById('time-box-right');

const dateLeft = document.getElementById('date-box-left');
const dateMiddle = document.getElementById('date-box-middle');
const dateRight = document.getElementById('date-box-right');


window.addEventListener('wheel', (e) => {
    const currentTime = performance.now()
    if (currentTime > lastTime + SWIPE_TIMEOUT) {
        lastTime = currentTime;
        if (e.deltaY > 0) {
            goLeft();
        } else {
            goRight();
        }
    }
})

getTime()
setContentParameters()

function setContentParameters() {
    boxMiddle.style.backgroundImage = `url(${getImageByIndex(index)})`;
    setTexts()
}

function setTexts() {
    locationMiddle.textContent = locations[index].name;
    timeMiddle.textContent = locations[index].time;
    dateMiddle.textContent = locations[index].date;
}

function goLeft() {

    boxLeft.style.backgroundImage = `url(${getImageByIndex(index - 1)})`;
    boxMiddle.style.backgroundImage = `url(${getImageByIndex(index)})`;

    locationLeft.textContent = locations[getOrderIndex(index - 1)].name;
    timeLeft.textContent = locations[getOrderIndex(index - 1)].time;
    dateLeft.textContent = locations[getOrderIndex(index - 1)].date;
    
    boxLeft.style.transform = 'translateX(0)';            
    boxMiddle.style.transform = 'translate(100%)';
    
    setTimeout(() => {
        boxLeft.style.transition = 'none';
        boxMiddle.style.transition = 'none';
        boxLeft.style.transform = 'translateX(-100%)';
        boxMiddle.style.transform = 'translateX(0%)';
        setContentParameters()
        setTimeout(() => {
            boxLeft.style.transition = `transform ${SWIPE_DURATION}s ease`;
            boxMiddle.style.transition = `transform ${SWIPE_DURATION}s ease`;
        }, 50);
    }, SWIPE_DURATION * 1000);
    
    incrementIndex(-1);
}

function goRight() {
    
    boxMiddle.style.backgroundImage = `url(${getImageByIndex(index)})`;
    boxRight.style.backgroundImage = `url(${getImageByIndex(index + 1)})`;

    locationRight.textContent = locations[getOrderIndex(index + 1)].name;
    timeRight.textContent = locations[getOrderIndex(index + 1)].time;
    dateRight.textContent = locations[getOrderIndex(index + 1)].date;

    boxMiddle.style.transform = 'translateX(-100%)';
    boxRight.style.transform = 'translateX(0%)';
    
    setTimeout(() => {
        boxMiddle.style.transition = 'none';
        boxRight.style.transition = 'none';
        boxMiddle.style.transform = 'translateX(0%)';
        boxRight.style.transform = 'translateX(100%)';
        setContentParameters()
        setTimeout(() => {
            boxMiddle.style.transition = `transform ${SWIPE_DURATION}s ease`;
            boxRight.style.transition = `transform ${SWIPE_DURATION}s ease`;
        }, 50);
    }, SWIPE_DURATION * 1000);
    
    incrementIndex(1);
}

function getImageByIndex(index) {
    if (index < 0) {
        return locations[locations.length - 1].url;
    } else if (index >= locations.length) {
        return locations[0].url;
    } 
    return locations[index].url;
}

function getOrderIndex(index) {
    if (index < 0) {
        return locations.length - 1;
    } else if (index >= locations.length) {
        return 0;
    }
    return index;
}

function incrementIndex(i) {
    index += i;
    if (index < 0) {
        index = locations.length - 1;
    } else if (index >= locations.length) {
        index = 0;
    }

}

function getTime() {
    const now = new Date();

    for (let i = 0; i < locations.length; i++) {
        const timeString = now.toLocaleTimeString('cs-CZ', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: locations[i].timeZone
        });
        const dateString = now.toLocaleString("cs-CZ", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: locations[i].timeZone
        });

        locations[i].time = timeString;
        locations[i].date = dateString;
        
    }
    setTexts()
}

setInterval(getTime, 1000);
