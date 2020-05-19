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

it('should initialize $ss object', function () {
  assert(Object.keys($ss).length === 3);
  assert($ss.auto === false);
  assert(typeof $ss.next === 'function');
  assert(typeof $ss.prev === 'function');
});

it('should add "current" class to the classlist of the first slide', function () {
  var allSlides = document.querySelectorAll('.slideshow-item'); // Get all the slides
  assert(allSlides[0].classList.contains('current'));

  //No other slide should have "current" class
  assert(!allSlides[1].classList.contains('current'));
  assert(!allSlides[2].classList.contains('current'));
  assert(!allSlides[3].classList.contains('current'));
});

it('should add "leaving" class to the classlist of the last slide', function () {
  var allSlides = document.querySelectorAll('.slideshow-item'); // Get all the slides
  assert(allSlides[3].classList.contains('leaving'));

  // No other slide should have "leaving" class
  assert(!allSlides[0].classList.contains('leaving'));
  assert(!allSlides[1].classList.contains('leaving'));
  assert(!allSlides[2].classList.contains('leaving'));
});
