(function () {
  'use strict';

  // API for the slideshow
  // Slideshow container should be class="slideshow-container"
  // Each slideshow item should have class="slideshow-item"
  // Next control should have class="next-control"
  // Prev control should have class="prev-control"
  var $ss = {
    auto: false, // toggle for auto slideshow
    init: init, // call this function to initialize the slideshow
  };
  self.$ss = $ss;

  var slideshowItems, currentIndex;

  function init() {
    slideshowItems = document.querySelectorAll('.slideshow-item');
    currentIndex = 0;
    showCurrentSlide();
  }

  function showCurrentSlide() {
    var leavingItem = document.querySelector('.leaving');
    if (leavingItem) leavingItem.classList.remove('leaving');

    var item = document.querySelector('.current');
    if (item) item.classList.remove('current');

    slideshowItems[currentIndex].classList.add('current');
    if (currentIndex !== 0) slideshowItems[currentIndex - 1].classList.add('leaving');
    if (currentIndex === 0) slideshowItems[slideshowItems.length - 1].classList.add('leaving');
  }

  document.addEventListener('click', function (event) {
    event.preventDefault();
    // Check if prev arrow is clicked
    if (event.target === document.querySelector('.prev-control')) {
      currentIndex === 0 ? (currentIndex = slideshowItems.length - 1) : currentIndex--;
      showCurrentSlide();
    }

    // Check if next arrow is clicked
    if (event.target === document.querySelector('.next-control')) {
      currentIndex === slideshowItems.length - 1 ? (currentIndex = 0) : currentIndex++;
      showCurrentSlide();
    }
  });
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

// })();
