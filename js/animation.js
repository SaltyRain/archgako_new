var isScrolling = false;
 
window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
  if (isScrolling == false) {
    window.requestAnimationFrame(function() {
      scrolling(e);
      isScrolling = false;
    });
  }
  isScrolling = true;
}

document.addEventListener("DOMContentLoaded", scrolling, false);

var listItems = document.querySelectorAll(".advantages--item");
// var firstBox = document.querySelector("#firstBox");
// var secondBox = document.querySelector("#secondBox");
var sectionHeadings = document.querySelectorAll('.section--heading');

var About = document.querySelector('.about');

function scrolling(e) {
 
    // if (isPartiallyVisible(firstBox)) {
    //   firstBox.classList.add("active");

    //   document.body.classList.add("colorOne");
    //   document.body.classList.remove("colorTwo");
    // } else {
    //   document.body.classList.remove("colorOne");
    //   document.body.classList.remove("colorTwo");
    // }

    // if (isFullyVisible(secondBox)) {
    //   secondBox.classList.add("active");

    //   document.body.classList.add("colorTwo");
    //   document.body.classList.remove("colorOne");
    // }

    if (isPartiallyVisible(About)) {
        About.classList.add("active");
      } else {
        About.classList.remove("active");
      }
    
    //   if (isPartiallyVisible(sectionHeading)) {
    //     About.classList.add("active");
    //   } else {
    //     About.classList.remove("active");
    //   }

    for (var i = 0; i < listItems.length; i++) {
      var listItem = listItems[i];

      if (isPartiallyVisible(listItem)) {
        listItem.classList.add("active");
      } else {
        listItem.classList.remove("active");
      }
    }

    for (var i = 0; i < sectionHeadings.length; i++) {
        var sectionHeading = sectionHeadings[i];
        console.log(sectionHeadings[1]);
        if (isPartiallyVisible(sectionHeading)) {
            sectionHeading.classList.add("active");
        } else {
            sectionHeading.classList.remove("active");
        }
      }
  }


function isPartiallyVisible(el) {
    var elementBoundary = el.getBoundingClientRect();

    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;
    var height = elementBoundary.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
  }

  function isFullyVisible(el) {
    var elementBoundary = el.getBoundingClientRect();

    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;

    return ((top >= 0) && (bottom <= window.innerHeight));
  }