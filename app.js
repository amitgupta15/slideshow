(function () {
  var items = document.querySelectorAll('.slideshow-item');
  var currentItem = 0;
  switchSlide();

  setInterval(function () {
    if (currentItem <= items.length - 1) {
      switchSlide();
    } else {
      currentItem = 0;
      switchSlide();
    }
  }, 5000);

  function switchSlide() {
    var leavingItem = document.querySelector('.leaving');
    if (leavingItem) leavingItem.classList.remove('leaving');

    var item = document.querySelector('.current');
    if (item) item.classList.remove('current');

    items[currentItem].classList.add('current');
    if (currentItem !== 0) items[currentItem - 1].classList.add('leaving');
    if (currentItem === 0) items[items.length - 1].classList.add('leaving');
    currentItem++;
  }

  document.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target === document.querySelector('.left-control')) {
      var item = document.querySelector('current');
      var leavingItem = document.querySelector('leaving');

      item.classList.remove('current');
      item.classList.add('leaving');
      items[--currentItem].classList.add('current');
    }
    if (event.target === document.querySelector('.right-control')) {
      console.log('Right Arrow Clicked');
    }
  });
})();
