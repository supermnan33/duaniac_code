
const secondHand = document.getElementsByClassName('second-hand')[0]
const minuteHand = document.getElementsByClassName('min-hand')[0]
const hourHand = document.getElementsByClassName('min-hand')[0]
const timeText = document.getElementsByClassName('time')[0]
let second = new Date().getSeconds()


function currentSecond() {
  second = new Date().getSeconds()
  const degreeOfCurrentSecond = ((second / 60) * 360) + 90
  secondHand.style.transform = `rotate(${degreeOfCurrentSecond}deg)`

  const minute = new Date().getMinutes()
  const degreeOfCurrentMinute = ((minute / 60) * 360) + 90
  minuteHand.style.transform = `rotate(${degreeOfCurrentMinute}deg)`

  const hour = new Date().getHours()
  const degreeOfCurrentHour = ((hour / 12) * 360) + 90
  hourHand.style.transform = `rotate(${degreeOfCurrentHour}deg)`

  updateMinuteOnChange()
}

setInterval(
  currentSecond,
  1000
)

function updateMinuteOnChange() {

  if ( second === 0 ) {
    timeText.innerHTML = new Date().toLocaleTimeString().split(/\:\d{2}\s/)[0]
  }
}