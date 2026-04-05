// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active"); 
  navMenu.classList.toggle("active");  
});

// Dynamic Copyright Year
const year = new Date().getFullYear();
document.getElementById("currentyear").textContent = year;

// Last Modified Date
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;

// Sample data for the homepage 
const featuredBooks = [
    {
        title: "The Kremlin Conspiracy",
        author: "Joel C. Rosenberg",
        genre: "Fiction",
        image: "images/kremlin.webp"
    },
    {
        title: "Jurassic Park",
        author: "Michael Crichton",
        genre: "Sci-Fi",
        image: "images/jurassic.webp"
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        image: "images/hobbit.webp"
    },
    {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        image: "images/1984.webp"
    }
];

// Function to display books
const displayFeaturedBooks = (books) => {
    const container = document.querySelector("#book-container");
    
    // Clear container just in case
    container.innerHTML = "";

    books.forEach(book => {
        // Create the card using Template Literals
        const card = `
            <div class="book-card">
                <img src="${book.image}" alt="${book.title}" loading="lazy">
                <h3>${book.title}</h3>
                <p>By: ${book.author}</p>
                <p><em>${book.genre}</em></p>
            </div>
        `;
        container.innerHTML += card;
    });
};


// Initialize
document.addEventListener("DOMContentLoaded", () => {
    displayFeaturedBooks(featuredBooks);
    
    const menuBtn = document.querySelector("#menu-button");
    menuBtn.addEventListener("click", toggleMenu);
});