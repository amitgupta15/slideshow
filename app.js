(function () {
  'use strict';

  // API for the slideshow
  // Slideshow container should be class="slideshow-container"
  // Each slideshow item should have class="slideshow-item"
  var $ss = {
    auto: false, // toggle for auto slideshow
    next: function () {},
    prev: function () {},
  };
  self.$ss = $ss;

  var slideshowItems = document.querySelectorAll('.slideshow-item');
  var currentIndex = 0;
  // Call it here to start with showing the first slide
  showCurrentSlide();

  function showCurrentSlide() {
    var leavingItem = document.querySelector('.leaving');
    if (leavingItem) leavingItem.classList.remove('leaving');

    var item = document.querySelector('.current');
    if (item) item.classList.remove('current');

    slideshowItems[currentIndex].classList.add('current');
    // if (currentIndex !== 0) slideshowItems[currentIndex - 1].classList.add('leaving');
    if (currentIndex === 0) slideshowItems[slideshowItems.length - 1].classList.add('leaving');
  }
})();
// (function () {
//   var slideshowItems = document.querySelectorAll('.slideshow-item');
//   var currentIndex = 0;
//   switchSlide();
//   createProgressBar();

//   setInterval(function () {
//     currentIndex === slideshowItems.length - 1 ? (currentIndex = 0) : currentIndex++;
//     switchSlide();
//   }, 5000);

//   function switchSlide() {

//   }

//   function createProgressBar() {}

//   document.addEventListener('click', function (event) {
//     event.preventDefault();
//     if (event.target === document.querySelector('.left-control')) {
//       currentIndex === 0 ? (currentIndex = slideshowItems.length - 1) : currentIndex--;
//       switchSlide();
//     }

//     // Check if right arrow is clicked
//     if (event.target === document.querySelector('.right-control')) {
//       currentIndex === slideshowItems.length - 1 ? (currentIndex = 0) : currentIndex++;
//       switchSlide();
//     }
//   });
// })();
