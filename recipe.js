// Initialize recipe page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Add click event to print button if it exists
    const printBtn = document.querySelector('.btn[onclick="window.print()"]');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            // You can add additional print-specific styling here if needed
            console.log('Printing recipe...');
        });
    }
    
    // You can add more recipe-specific JavaScript here
    // For example: rating system, cooking timer, etc.
});