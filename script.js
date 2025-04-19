// Wait for the document to load before running the script 
(function ($) {
  
  // Initialize dark mode from localStorage
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  // Dark mode toggle functionality
  $('.theme-toggle').on('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });

  // We use some Javascript and the URL #fragment to hide/show different parts of the page
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Linking_to_an_element_on_the_same_page
  $(window).on('load hashchange', function(){
    
    // First hide all content regions
    $('.content-region').removeClass('show');
    
    // Remove any active classes on the main-menu
    $('.main-menu a').removeClass('active');
    var region = location.hash.toString() || $('.main-menu a:first').attr('href');
    
    // Now show the region specified in the URL hash with a delay for animation
    setTimeout(() => {
      $(region).addClass('show');
    }, 50);
    
    // Highlight the menu link associated with this region
    $('.main-menu a[href="'+ region +'"]').addClass('active');

    // Smooth scroll to the content
    $('html, body').animate({
      scrollTop: $(region).offset().top - 100
    }, 500);

    // Alternate method: Use AJAX to load the contents of an external file into a div based on URL fragment
    // This will extract the region name from URL hash, and then load [region].html into the main #content div
    // var region = location.hash.toString() || '#first';
    // $('#content').load(region.slice(1) + '.html')
    
  });

  // Add parallax effect to background
  $(window).on('scroll', function() {
    const scrolled = $(window).scrollTop();
    $('html').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
  });
  
})(jQuery);
