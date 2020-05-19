(function () {
  'use strict';

  // API for the slideshow
  // Slideshow container should be class="slideshow-container"
  // Each slideshow item should have class="slideshow-item"
  // Next control should have class="next-control"
  // Prev control should have class="prev-control"
  var $ss = {
    setAutoTransition: setAutoTransition, // toggle for auto slideshow
    init: init, // call this function to initialize the slideshow
    interval: 3000,
  };
  self.$ss = $ss;

  var slideshowItems, currentIndex;

  function init() {
    slideshowItems = document.querySelectorAll('.slideshow-item');

    currentIndex = 0;
    initProgressBar();
    displayCurrentSlide();
    // displayProgress();
  }

  function displayCurrentSlide() {
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
      displayCurrentSlide();
      // displayProgress();
    }

    // Check if next arrow is clicked
    if (event.target === document.querySelector('.next-control')) {
      currentIndex === slideshowItems.length - 1 ? (currentIndex = 0) : currentIndex++;
      displayCurrentSlide();
      // displayProgress();
    }
  });

  function setAutoTransition(isAutoEnabled) {
    if (isAutoEnabled) {
      setInterval(function () {
        currentIndex === slideshowItems.length - 1 ? (currentIndex = 0) : currentIndex++;
        displayCurrentSlide();
        // displayProgress();
      }, $ss.interval);
    }
  }

  function initProgressBar() {
    var progressBar = document.querySelector('.progress-bar');
    var progressBarItems = '';
    for (var i = 0; i < slideshowItems.length; i++) {
      progressBarItems += '<li class="progress-bar-item"></li>';
    }
    progressBar.innerHTML = progressBarItems;
  }

  function displayProgress() {
    var currentProgress = document.querySelector('.progress-current');
    console.log(currentProgress);
    // if (currentProgress) {
    currentProgress.classList.remove('.progress-current');
    // }

    var progressBarItems = document.querySelectorAll('.progress-bar-item');
    progressBarItems[currentIndex].classList.add('progress-current');
  }
})();
