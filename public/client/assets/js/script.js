// Khởi tạo AOS
AOS.init({
});
// menumobile
const buttonMenuMobile = document.querySelector(".header .inner-button-menu");
if(buttonMenuMobile){
  const menu=document.querySelector(".header .inner-menu");
  const overlay = menu.querySelector(".overlay");
  // add class "active" for menu
  buttonMenuMobile.addEventListener("click", ()=>{
    menu.classList.add('active');
  })
  // remove class "active" of menu
  overlay.addEventListener("click", ()=>{
    menu.classList.remove('active');
  })
  const listButtonSubMenu = menu.querySelectorAll("ul > li");
  listButtonSubMenu.forEach(button => {
    // add class "active for li"
    button.addEventListener("click", ()=>{
      button.closest("li").classList.toggle("active");
    })
    //remove class "active" of li when click on overlay
    overlay.addEventListener("click", ()=>{
      button.closest("li").classList.remove("active");
  })
  } )
}
// end menu Mobile
// -----------------------------------------------------------------------------------------------------
// Box type section-1
const boxTypeSection1=document.querySelector(".section-1 .inner-form .inner-box");
if(boxTypeSection1){
  // show/hide box suggest
  const input=boxTypeSection1.querySelector(".inner-input-group input");
  input.addEventListener("click", ()=>{
    boxTypeSection1.classList.toggle("active")
  })
   input.addEventListener("blur", () => {
    boxTypeSection1.classList.remove("active");
  })
 
  // clicking event for each item
  const listItem = boxTypeSection1.querySelectorAll(".inner-suggest .inner-item");
  listItem.forEach(item=>{
    item.addEventListener("mousedown", ()=>{
      const title = item.querySelector(".inner-item-title").innerHTML.trim();
      input.value = title;
    })
  })
}
// End Box type section-1

// input-calendar section-1


// -----------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------

// clock experience section-2
const clockExpire = document.querySelector("[clock-expire]")
if(clockExpire){
  const listBoxNumber = clockExpire.querySelectorAll(".inner-number");
  const expireDateTimeString = clockExpire.getAttribute("clock-expire");
  const expireDateTime = new Date(expireDateTimeString);

   const updateClock =() => {
    const now = new Date();
    const remainingTime = expireDateTime - now;
    if(remainingTime > 0){
      const days = Math.floor(remainingTime / (24 * 60 * 60 *1000));
      const hours = Math.floor(remainingTime / (60 * 60 *1000) % 24);
      const minutes = Math.floor(remainingTime / (60 *1000) % 60);
      const seconds = Math.floor(remainingTime / (1000) % 60);
      listBoxNumber[0].innerHTML = days < 10 ? `0${days}` : days;
      listBoxNumber[1].innerHTML = hours < 10 ? `0${hours}` : hours;
      listBoxNumber[2].innerHTML = minutes < 10 ? `0${minutes}` : minutes;
      listBoxNumber[3].innerHTML = seconds < 10 ? `0${seconds}` : seconds;
    }
    else{
      clearInterval(intervalClock);
    }
   };
   const intervalClock = setInterval(updateClock,1000);
} 
// clock experience section-2

// box filter page list book
const buttonFilterMobile = document.querySelector(".section-9 .inner-button-filter")
if(buttonFilterMobile){
  const boxleft = document.querySelector(".section-9 .inner-left");
  buttonFilterMobile.addEventListener("click",()=>{
    boxleft.classList.add("active");
  })
  const overlay = boxleft.querySelector(".section-9 .overlay")
  overlay.addEventListener("click",()=>{
    boxleft.classList.remove("active");
  })
  const buttonFilter = boxleft.querySelector(".box-filter .inner-head i");
  buttonFilter.addEventListener("click",()=>{
    boxleft.classList.remove("active");
  })
}
// box filter page list book

//book  ìnfor
const bookInfor = document.querySelector(" .book-info");
if(bookInfor){
  const buttonViewAll = bookInfor.querySelector(".inner-read-more button");
  buttonViewAll.addEventListener("click", ()=>{
    if(bookInfor.classList.contains("active")){
      bookInfor.classList.remove("active");
      buttonViewAll.innerHTML = "Xem tất cả";
    }
    else{
      bookInfor.classList.add("active");
      buttonViewAll.innerHTML = "Ẩn bớt";
    }
  })
}
//book  ìnfor


// Swiper Section 2
const swiperSection2 = document.querySelector(".section-2 .swiperSection2");
if(swiperSection2){
 new Swiper(".swiperSection2", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },

  });
}
// Swiper Section 2

// Swiper Section 3
const swiperSection3 = document.querySelector(".section-3 .swiperSection3");
if(swiperSection3){
 new Swiper(".swiperSection3", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },

  });
}
// Swiper Section 3

// Swiper Section 4
const swiperSection4 = document.querySelector(".section-4 .swiperSection4");
if(swiperSection4){
 new Swiper(".swiperSection4", {
    slidesPerView: 2,
    spaceBetween: 20,
    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

  });
}
// Swiper Section 4


// box-images section-10
const boxImages10 = document.querySelector(".box-images");
if(boxImages10){
 const swiperImagesThumb = new Swiper (".swiperImagesThumb", {
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      spaceBetween: 5,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
         breakpoints: {
        576: {
          spaceBetween: 10,
        },
      },
    });
    var swiperImagesMain = new Swiper(".swiperImagesMain", {
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      spaceBetween: 10,
      thumbs: {
        swiper: swiperImagesThumb,
      },
    });
  }
// box-images section-10
// zoom section-10
const section10 = document.querySelector(".section-10");
if(section10){
  new Viewer(section10);
}
// zoom section-10

// validate coupon form
const couponForm = document.querySelector("#coupon-form");
if(couponForm){
  const validator = new JustValidate('#coupon-form');

  validator 
    .addField("#coupon-input", [
      {
        rule: "required", 
        errorMessage: "Vui lòng nhập mã giảm giá"
      },
    ])
    .onSuccess((event)=>{
      const emacouponil = event.target.coupon.value;
    })
}
// validate coupon form


// validate order form
const orderForm = document.querySelector("#orderForm");
if(orderForm){
  const validator = new JustValidate('#orderForm');

  validator 
    .addField("#fullName", [
      {
        rule: "required", 
        errorMessage: "Vui lòng nhập Họ tên"
      },
        {
        rule: "minLength", 
        value: 3,
        errorMessage: "Vui lòng nhập ít nhất 3 ký tự!"
      },
    ])
     .addField("#number-phone", [
      {
        rule: "required", 
        errorMessage: "Vui lòng nhập số điện thoại"
      },
       {
        rule: "customRegexp", 
        value:/^(?:\+84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
        errorMessage: "Vui lòng nhập số điện thoại đúng định dạng"
      },
    ])
    .addField("#email", [
      {
        rule: "required", 
        errorMessage: "Vui lòng nhập email"
      },
       {
        rule: "email", 
        errorMessage: "Vui lòng nhập email đúng định dạng"
      },
    ])

    .onSuccess((event)=>{
      const fullName = event.target.fullName.value;
      const numberPhone = event.target.numberPhone.value;
      const note = event.target.note.value;
      const medthod = event.target.method.value;
      const email = event.target.email.value;
    })

    // list input method
    const listInputMethod = orderForm.querySelectorAll(`input[name='method']`);
    const elementInforBank = orderForm.querySelector(".inner-info-bank");
    listInputMethod.forEach(input => {
      input.addEventListener("change", () =>{
        if(input.value==="bank"){
          elementInforBank.classList.add("active");
        }
        else{
          elementInforBank.classList.remove("active");
        }
      })
    })
}
// validate order form
