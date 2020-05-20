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
    display();
  }

  function display() {
    displayCurrentSlide();
    displayProgress();
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
      display();
    }

    // Check if next arrow is clicked
    if (event.target === document.querySelector('.next-control')) {
      currentIndex === slideshowItems.length - 1 ? (currentIndex = 0) : currentIndex++;
      display();
    }

    // Check if any item on the progess bar is clicked
    if (event.target.dataset.progressId) {
      currentIndex = parseInt(event.target.dataset.progressId);
      display();
    }
  });

  function setAutoTransition(isAutoEnabled) {
    if (isAutoEnabled) {
      setInterval(function () {
        currentIndex === slideshowItems.length - 1 ? (currentIndex = 0) : currentIndex++;
        display();
      }, $ss.interval);
    }
  }

  function initProgressBar() {
    var progressBar = document.querySelector('.progress-bar');
    var progressBarItems = '';
    for (var i = 0; i < slideshowItems.length; i++) {
      progressBarItems += '<li data-progress-id="' + i + '" class="progress-bar-item"></li>';
    }
    progressBar.innerHTML = progressBarItems;
  }

  function displayProgress() {
    var progressCurrent = document.querySelector('.progress-current');
    if (progressCurrent) progressCurrent.classList.remove('progress-current');

    var progressBarItems = document.querySelectorAll('.progress-bar-item');
    progressBarItems[currentIndex].classList.add('progress-current');
  }
})();
