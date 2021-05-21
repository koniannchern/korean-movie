//輪播效果js
var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: -15,
      depth: 70,
      modifier: 5,
      slideShadows: true,
    },
    direction: 'horizontal',
      loop: false
   
  });
  swiper.slideTo(2, false,false);
   
  //navbar響應式效果
  let showMenu = document.querySelector('.showmenu');
  let homepageNav = document.querySelector('.homepage-navbar');
  showMenu.addEventListener('click',function(e){
       e.preventDefault();
       document.body.classList.toggle('menu-show');
  })

  //訂位系統

  const bookingSeats = document.querySelector('.seats-container');
  const seats = document.querySelectorAll('.row .seat:not(.occupied)');
  const movieSelect = document.getElementById('moviename');
  let bookingTime = document.getElementById('booking-time');
  let bookingDate = document.getElementById("booking-date");
  

  //選擇日期限定今明兩天
  let bookingToday = new Date();
  let bookingTom = new Date(bookingToday);
  bookingTom.setDate(bookingTom.getDate() + 1);
  

  
  bookingDate.innerHTML = 
  `
   <option>${bookingToday.getMonth() + 1}/${bookingToday.getDate()}</option>
   <option>${bookingTom.getMonth() + 1}/${bookingTom.getDate()}</option>
  `
//訂位失敗條件
  let btn = document.getElementById('btn');
  let phone = document.getElementById('phone');
  let alertbox = document.querySelector('.alertbox');
  let alertTitle = document.getElementById('alert-content-title')
  let alertWarn = document.getElementById('alert-warning');
  let indexBox = [];
  
  populateUI();

  btn.addEventListener('click',function(){
    let seatsSelected = document.querySelectorAll('.row .seat.selected');
    let movieName = document.getElementById('alert-movie-name');
    let movieDate = document.getElementById('alert-movie-date');
    let movieTime = document.getElementById('alert-movie-time');
    let ticketCount = document.getElementById('alert-ticket-count');
    let ticketPrice = document.getElementById('ticket-price');

    if(seatsSelected.length == 0 || phone.value == ""){
      alertbox.style.display = "block";
      alertTitle.innerText = "訂位失敗!";
      movieName.innerText = ``;
      movieDate.innerText = ``;
      movieTime.innerText = ``;
      ticketCount.innerText = ``;
      ticketPrice.innerText = ``;
      alertWarn.innerText = "請確實選擇座位及填寫電話號碼";

    }else{
      

      const seatsIndex = [...seatsSelected].map(seat => [...seats].indexOf(seat));
      console.log(seatsIndex)
      
      for(let i = 0; i < seatsIndex.length; i++){
        indexBox.push(seatsIndex[i]);
      }
      console.log(indexBox);

      localStorage.setItem('selectedSeats', JSON.stringify(indexBox));
      const selectedSeatsCount = seatsIndex.length;
      
      alertbox.style.display = "block";
      alertTitle.innerText = "訂位成功!";
      movieName.innerText = `電影名: ${movieSelect.value}`;
      movieDate.innerText = `日期: ${bookingDate.value}`;
      movieTime.innerText = `場次: ${bookingTime.value}`;
      ticketCount.innerText = `電影票: ${selectedSeatsCount}張`;
      ticketPrice.innerText = `金額: ${selectedSeatsCount * 200}元`;
      alertWarn.innerText = "請依電話號碼至臨櫃付款取票";
      phone.value = "";

      populateUI()
    }
      
  })

  function closeAlert(){
    alertbox.style.display = "none";
  }

  function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0){
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.remove('selected');
          seat.classList.add('occupied');
        }
      });
    }
  }

//選擇座位顯示顏色
  bookingSeats.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
      e.target.classList.toggle('selected');
    }
  });
  
//change電影名時，顯示不同場次時間
  movieSelect.addEventListener('change',function(e){
    if(e.target.value === "緣起不滅"){
       bookingTime.innerHTML = 
       `
       <option value="9:00">9:00</option>
       <option value="10:30">10:30</option>
       <option value="13:40">13:40</option>
       <option value="16:20">16:20</option>
       <option value="19:00">19:00</option>
       <option value="21:10">21:10</option>
       `
    }else if(e.target.value === "流感"){
      bookingTime.innerHTML = 
      `
      <option value="9:30">9:30</option>
      <option value="11:00">10:00</option>
      <option value="12:40">12:40</option>
      <option value="14:50">14:50</option>
      <option value="17:00">17:00</option>
      <option value="20:10">20:10</option>
      `
    }else if(e.target.value === "大叔"){
      bookingTime.innerHTML = 
      `
      <option value="8:50">8:50</option>
      <option value="10:20">10:20</option>
      <option value="13:00">13:00</option>
      <option value="15:20">15:20</option>
      <option value="17:10">17:10</option>
      <option value="21:00">21:00</option>
      `
    }else if(e.target.value === "歡迎來到東莫村"){
      bookingTime.innerHTML = 
      `
      <option value="9:10">9:10</option>
      <option value="11:50">11:50</option>
      <option value="13:20">13:20</option>
      <option value="16:00">16:00</option>
      <option value="18:30">18:30</option>
      <option value="21:10">21:10</option>
      `
    }else{
      bookingTime.innerHTML = 
      `
      <option value="9:40">9:40</option>
      <option value="11:10">11:10</option>
      <option value="13:40">13:40</option>
      <option value="15:50">15:50</option>
      <option value="18:40">18:40</option>
      <option value="20:40">20:40</option>
      `
    }
  })


  


  