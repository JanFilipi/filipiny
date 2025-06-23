


function getTime() {
  const timeNow = new Date();

  const optionsTime = { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const optionsDate = { timeZone: 'Asia/Manila', year: 'numeric', month: 'long', day: 'numeric' };

  const timePhilippines = timeNow.toLocaleTimeString('cs-CZ', optionsTime);
  const datePhilippines = timeNow.toLocaleDateString('en-US', optionsDate);

  document.getElementById("time").textContent = timePhilippines;
  document.getElementById("date").textContent = datePhilippines;
}

getTime()
setInterval(getTime, 1000);

