/**
 * Tests for the slideshow
 * Open test.html in a browser and inspect the console to see the test results
 */

// Test Framework
function it(desc, fn) {
  try {
    fn();
    console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
  } catch (error) {
    console.log('\n');
    console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
    console.error(error);
  }
}

function assert(condition) {
  if (!condition) {
    throw new Error();
  }
}
// End Test Framework

function setUp() {
  var slideShowHTML =
    '<div class="slideshow-container">' +
    '<div class="slideshow-item"><h1>Item 1</h1><p>This is item 1</p></div>' +
    '<div class="slideshow-item"><h1>Item 2</h1><p>This is item 2</p></div>' +
    '<div class="slideshow-item"><h1>Item 3</h1><p>This is item 3</p></div>' +
    '<div class="slideshow-item"><h1>Item 4</h1><p>This is item 4</p></div>' +
    '</div>';
  var selector = document.querySelector('.selector');
  selector.innerHTML = slideShowHTML;
  var progressBar = document.createElement('ul');
  progressBar.className = 'progress-bar';
  selector.appendChild(progressBar);
  $ss.init();
}

function tearDown() {
  document.querySelector('.selector').innerHTML = '';
}

it('should initialize $ss object', function () {
  assert(Object.keys($ss).length === 3);
  assert(typeof $ss.setAutoTransition === 'function');
  assert(typeof $ss.init === 'function');
  assert($ss.interval === 3000);
});

it('should add "current" class to the classlist of the first slide and "leaving" class to the classlist of the last slide', function () {
  setUp();

  var allSlides = document.querySelectorAll('.slideshow-item'); // Get all the slides
  // assert "current" class
  assert(allSlides[0].classList.contains('current'));
  //No other slide should have "current" class
  assert(!allSlides[1].classList.contains('current'));
  assert(!allSlides[2].classList.contains('current'));
  assert(!allSlides[3].classList.contains('current'));

  //assert "leaving" class
  assert(allSlides[3].classList.contains('leaving'));
  // No other slide should have "leaving" class
  assert(!allSlides[0].classList.contains('leaving'));
  assert(!allSlides[1].classList.contains('leaving'));
  assert(!allSlides[2].classList.contains('leaving'));

  tearDown();
});

it('should transition to the next slide when "next" control is clicked', function () {
  setUp();
  var allSlides = document.querySelectorAll('.slideshow-item'); // Get all the slides

  var selector = document.querySelector('.selector');
  // Create and add next control to the DOM
  var nextButton = document.createElement('div');
  nextButton.className = 'next-control'; // Next control MUST have class "next-control"
  selector.appendChild(nextButton);

  // Make sure the first slide is the current slide, and last slide is the prev side
  assert(allSlides[0].classList.contains('current'));
  assert(allSlides[3].classList.contains('leaving'));

  // Create "click" event
  var clickEvent = document.createEvent('HTMLEvents');
  clickEvent.initEvent('click', true, true);

  // Dispatch click event from 'next-control'
  nextButton.dispatchEvent(clickEvent);
  assert(allSlides[1].classList.contains('current'));
  assert(allSlides[0].classList.contains('leaving'));

  // Dispatch click event from 'next-control'
  nextButton.dispatchEvent(clickEvent);
  nextButton.dispatchEvent(clickEvent);
  nextButton.dispatchEvent(clickEvent);
  assert(allSlides[0].classList.contains('current'));
  assert(allSlides[3].classList.contains('leaving'));

  tearDown();
});

it('should transition to the previous slide when "prev" control is clicked', function () {
  setUp();
  var allSlides = document.querySelectorAll('.slideshow-item'); // Get all the slides

  var selector = document.querySelector('.selector');
  // Create and add prev control to the DOM
  var prevButton = document.createElement('div');
  prevButton.className = 'prev-control'; // Prev control MUST have class "prev-control"
  selector.appendChild(prevButton);
  // Make sure the first slide is the current slide, and last slide is the prev side
  assert(allSlides[0].classList.contains('current'));
  assert(allSlides[3].classList.contains('leaving'));

  // Create "click" event
  var clickEvent = document.createEvent('HTMLEvents');
  clickEvent.initEvent('click', true, true);

  // Dispatch click event from 'prev-control'
  prevButton.dispatchEvent(clickEvent);
  assert(allSlides[3].classList.contains('current'));
  assert(allSlides[2].classList.contains('leaving'));

  // Dispatch click event from 'prev-control'
  prevButton.dispatchEvent(clickEvent);
  prevButton.dispatchEvent(clickEvent);
  prevButton.dispatchEvent(clickEvent);
  assert(allSlides[0].classList.contains('current'));
  assert(allSlides[3].classList.contains('leaving'));

  tearDown();
});

it('should display progress bar', function () {
  setUp();
  var allSlides = document.querySelectorAll('.slideshow-item'); // Get all the slides

  var allProgressBarItems = document.querySelectorAll('.progress-bar-item');
  assert(allProgressBarItems.length === allSlides.length);
  assert(allProgressBarItems[0].classList.contains('progress-current'));

  var selector = document.querySelector('.selector');
  // Create and add next control to the DOM
  var nextButton = document.createElement('div');
  nextButton.className = 'next-control'; // Next control MUST have class "next-control"
  selector.appendChild(nextButton);

  // Create "click" event
  var clickEvent = document.createEvent('HTMLEvents');
  clickEvent.initEvent('click', true, true);
  // Dispatch click event from 'next-control'
  nextButton.dispatchEvent(clickEvent);
  assert(!allProgressBarItems[0].classList.contains('progress-current'));
  assert(allProgressBarItems[1].classList.contains('progress-current'));

  tearDown();
});

it('should transition slides automatically', function () {
  $ss.interval = 4000;
  setUp();
  var allSlides = document.querySelectorAll('.slideshow-item'); // Get all the slides

  //Override setInterval
  window.setInterval = (callback, interval) => {
    callback();
    assert(interval === 4000);
  };

  $ss.setAutoTransition(true);
  //Setting the auto transition to true will transition to the second slide
  assert(allSlides[0].classList.contains('leaving'));
  assert(allSlides[1].classList.contains('current'));

  var allProgressBarItems = document.querySelectorAll('.progress-bar-item');
  assert(allProgressBarItems[1].classList.contains('progress-current'));

  $ss.init(); //Reset
  $ss.setAutoTransition(false);
  //Setting the auto transition to false will cause the first slide to stay in focus
  assert(allSlides[0].classList.contains('current'));
  assert(allSlides[3].classList.contains('leaving'));
  allProgressBarItems = document.querySelectorAll('.progress-bar-item');
  assert(allProgressBarItems[0].classList.contains('progress-current'));

  tearDown();
});
