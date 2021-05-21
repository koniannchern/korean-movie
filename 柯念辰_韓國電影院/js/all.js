


//看預告片
let btn = document.getElementById('trailer-watch');
let close = document.querySelector('.close');

close.addEventListener('click',toggle);
btn.addEventListener('click',toggle);

function toggle(){
    var trailer = document.querySelector('.trailer');
    var video = document.querySelector('video');
    trailer.classList.toggle('active')
    video.pause();
    video.currentTime = 0;
}
