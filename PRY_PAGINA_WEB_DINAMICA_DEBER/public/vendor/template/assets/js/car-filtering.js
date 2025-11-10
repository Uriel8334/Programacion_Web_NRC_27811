// Car Filtering and Navigation System
// Handles filtering of car portfolio items and navigation between them

(function() {
  'use strict';

  // Car Navigation - Smooth scroll and emphasis
  function enhanceCarNavigation() {
    const carLinks = document.querySelectorAll('.car-nav-link');
    
    if (carLinks.length === 0) return;
    
    carLinks.forEach(function(link) {
      // Remove duplicate listeners by cloning
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      newLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('data-car-id');
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) return;
        
        // Update active state
        document.querySelectorAll('.car-nav-link').forEach(function(l) {
          l.classList.remove('active');
        });
        this.classList.add('active');
        
        // Remove emphasis from all items
        document.querySelectorAll('.portfolio-item').forEach(function(item) {
          item.classList.remove('portfolio-item-emphasized');
        });
        
        // Scroll to element
        const headerOffset = 150;
        const elementTop = targetElement.getBoundingClientRect().top;
        const scrollPosition = window.pageYOffset + elementTop - headerOffset;
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
        
        // Add emphasis effect
        setTimeout(function() {
          targetElement.classList.add('portfolio-item-emphasized');
          setTimeout(function() {
            targetElement.classList.remove('portfolio-item-emphasized');
          }, 2500);
        }, 600);
      }, false);
    });
  }

  // Car Category Filtering - Show/hide based on filter
  function initCarFiltering() {
    const filterButtons = document.querySelectorAll('.portfolio-filters li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0 || portfolioItems.length === 0) {
      return;
    }
    
    // Process each filter button
    filterButtons.forEach(function(button) {
      // Remove duplicate listeners by cloning
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      newButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const filterValue = this.getAttribute('data-filter');
        
        // Update active button
        document.querySelectorAll('.portfolio-filters li').forEach(function(btn) {
          btn.classList.remove('filter-active');
        });
        this.classList.add('filter-active');
        
        // Filter items
        portfolioItems.forEach(function(item) {
          let shouldShow = false;
          
          if (filterValue === '*') {
            shouldShow = true;
          } else {
            // Remove the dot: ".filter-app" becomes "filter-app"
            const className = filterValue.substring(1);
            shouldShow = item.classList.contains(className);
          }
          
          if (shouldShow) {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
            item.style.pointerEvents = 'auto';
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            item.style.pointerEvents = 'none';
            setTimeout(function() {
              item.style.display = 'none';
            }, 300);
          }
        });
      }, false);
    });
  }

  // Main initialization function
  function initializeCarSystem() {
    enhanceCarNavigation();
    initCarFiltering();
  }

  // Initialize immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCarSystem);
  } else {
    setTimeout(initializeCarSystem, 50);
  }

  // Re-initialize when dynamic content loads
  window.addEventListener('content:loaded', initializeCarSystem);
  
  // Extra safety: try again after short delay
  setTimeout(initializeCarSystem, 300);
})();
