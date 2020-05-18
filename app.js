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
})();
