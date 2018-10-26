/*var linksContainer = document.getElementById("header-nav");

// Get all buttons with class="btn" inside the container
var links = linksContainer.getElementsByClassName("nav-link");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("nav-link-highlighted");
    current[0].className = current[0].className.replace(" nav-link-highlighted", "");
    this.className += " nav-link-highlighted";
  });
}

*/


var sections = $('.section')
  , nav = $('#header-nav')
  , side_nav = $('#mySidenav')
  , nav_height = 200;//nav.outerHeight();



$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();

  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
        	
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('nav-link-highlighted');
      sections.removeClass('nav-link-highlighted');

      $(this).addClass('nav-link-highlighted');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('nav-link-highlighted');



      side_nav.find('a').removeClass('nav-link-highlighted');
      sections.removeClass('nav-link-highlighted');

      $(this).addClass('nav-link-highlighted');
      side_nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('nav-link-highlighted');
    }
  });
});