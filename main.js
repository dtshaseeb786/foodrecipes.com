// Data for our recipes and categories
const recipeData = {
    categories: [
        {
            id: 1,
            name: "Biryani",
            description: "The king of Pakistani cuisine",
            image: "images/biryani-category.jpg"
        },
        {
            id: 2,
            name: "Karahi",
            description: "Spicy and flavorful dishes",
            image: "images/karahi-category.jpg"
        },
        {
            id: 3,
            name: "BBQ",
            description: "Delicious grilled meats",
            image: "images/bbq-category.jpg"
        },
        {
            id: 4,
            name: "Sweets",
            description: "Traditional Pakistani mithai",
            image: "images/sweets-category.jpg"
        }
    ],
    recipes: [
        {
            id: 1,
            name: "Chicken Biryani",
            description: "Fragrant rice with tender chicken",
            category: "Biryani",
            time: "1.5 hours",
            rating: "4.9",
            image: "images/chicken-biryani.jpg",
            link: "recipes/biryani.html"
        },
        {
            id: 2,
            name: "Chicken Karahi",
            description: "Spicy wok-cooked chicken",
            category: "Karahi",
            time: "45 mins",
            rating: "4.8",
            image: "images/chicken-karahi.jpg",
            link: "recipes/karahi.html"
        },
        {
            id: 3,
            name: "Beef Nihari",
            description: "Slow-cooked beef stew",
            category: "Curries",
            time: "6 hours",
            rating: "5.0",
            image: "images/beef-nihari.jpg",
            link: "recipes/nihari.html"
        }
    ],
    quickLinks: [
        { name: "Ramzan Special", link: "#" },
        { name: "Eid Recipes", link: "#" },
        { name: "Street Food", link: "#" },
        { name: "Breakfast", link: "#" }
    ]
};

// DOM Elements
const categoriesContainer = document.getElementById('categoriesContainer');
const recipesContainer = document.getElementById('recipesContainer');
const quickLinks = document.getElementById('quickLinks');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const newsletterForm = document.getElementById('newsletterForm');
const currentYear = document.getElementById('currentYear');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Load categories
    loadCategories();
    
    // Load recipes
    loadRecipes();
    
    // Load quick links
    loadQuickLinks();
    
    // Setup event listeners
    setupEventListeners();
});

// Load categories into the DOM
function loadCategories() {
    categoriesContainer.innerHTML = recipeData.categories.map(category => `
        <div class="category-card" onclick="window.location.href='#'">
            <div class="category-img">
                <img src="${category.image}" alt="${category.name}">
            </div>
            <div class="category-info">
                <h3>${category.name}</h3>
                <p>${category.description}</p>
                <a href="#" class="btn">View Recipes</a>
            </div>
        </div>
    `).join('');
}

// Load recipes into the DOM
function loadRecipes() {
    recipesContainer.innerHTML = recipeData.recipes.map(recipe => `
        <div class="recipe-card" onclick="window.location.href='${recipe.link}'">
            <div class="recipe-img">
                <img src="${recipe.image}" alt="${recipe.name}">
                <span class="recipe-time">${recipe.time}</span>
            </div>
            <div class="recipe-info">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <div class="recipe-meta">
                    <span>${recipe.category}</span>
                    <span>${recipe.rating} ★</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Load quick links into the footer
function loadQuickLinks() {
    quickLinks.innerHTML = recipeData.quickLinks.map(link => `
        <li><a href="${link.link}">${link.name}</a></li>
    `).join('');
}

// Setup all event listeners
function setupEventListeners() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Search functionality
    searchBtn.addEventListener('click', searchRecipes);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchRecipes();
        }
    });
    
    // Newsletter form submission
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with ${email}! You'll receive our weekly recipes.`);
        this.reset();
    });
}

// Search recipes function
function searchRecipes() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm.trim() === '') {
        loadRecipes(); // Reset to all recipes if search is empty
        return;
    }
    
    const filteredRecipes = recipeData.recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm) || 
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.category.toLowerCase().includes(searchTerm)
    );
    
    if (filteredRecipes.length === 0) {
        recipesContainer.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <h3>No recipes found for "${searchTerm}"</h3>
                <p>Try searching for something else</p>
            </div>
        `;
    } else {
        recipesContainer.innerHTML = filteredRecipes.map(recipe => `
            <div class="recipe-card" onclick="window.location.href='${recipe.link}'">
                <div class="recipe-img">
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <span class="recipe-time">${recipe.time}</span>
                </div>
                <div class="recipe-info">
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                    <div class="recipe-meta">
                        <span>${recipe.category}</span>
                        <span>${recipe.rating} ★</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}