function playSound( e ) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if ( !audio )  return;  // stop here if no audio
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing'); 
}

function removeTransition(e) {
    if(e.propertyName !== 'transform') return; 
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

keys.forEach(key => key.addEventListener(
    'click',
    e => {
        let keyCode = e.target.dataset.key || e.target.parentElement.dataset.key;
        playSound({ keyCode });
    }
))

window.addEventListener( 'keydown', playSound );