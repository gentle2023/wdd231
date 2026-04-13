// DOM Element Selection
const libraryGrid = document.querySelector("#library-grid");
const modal = document.querySelector("#book-modal");
const closeModal = document.querySelector("#close-modal");
const modalContent = document.querySelector("#modal-content");

// Data Fetching with try...catch
async function fetchBooks() {
    try {
        const response = await fetch('data/books.json');
        if (!response.ok) throw new Error("Network response was not ok");
        const books = await response.json();
        
        // Pass the books to the render function
        renderLibrary(books);
    } catch (error) {
        console.error("Fetch Error:", error);
        libraryGrid.innerHTML = `<p>Failed to load books. Please try again later.</p>`;
    }
}

// Dynamic Content Generation using Template Literals
function renderLibrary(books) {
    // Clear existing content
    libraryGrid.innerHTML = ""; 
    
    // We use the index (0, 1, 2...) to assign unique grid areas
    books.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        
        /**
         * NAMED GRID AREA ASSIGNMENT
         * This line matches the 'book-0', 'book-1' etc. in your CSS.
         * It allows the CSS Grid Map to place this specific card in a specific spot.
         */
        card.style.gridArea = `book-${index}`; 
        
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="card-img" loading="lazy">
            <div class="card-info">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p class="book-description-short">${book.description ? book.description.substring(0, 100) + '...' : ''}</p>
                <div class="card-buttons">
                    <button class="details-button">Details</button>
                    <button class="save-button">Add to List</button>
                </div>
            </div>
        `;

        // Event Handling for Modal
        card.querySelector(".details-button").addEventListener("click", () => openModal(book));
        
        // Event Handling for Local Storage
        card.querySelector(".save-button").addEventListener("click", () => saveBook(book));

        libraryGrid.appendChild(card);
    });
}

// Modal Interaction
function openModal(book) {
    modalContent.innerHTML = `
        <div class="modal-inner">
            <img src="${book.image}" alt="${book.title}" class="modal-img">
            <div class="modal-text">
                <h2>${book.title}</h2>
                <p><strong>By:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <hr>
                <p class="book-desc">${book.description}</p>
            </div>
        </div>
    `;
    modal.showModal(); 
}

// Local Storage implementation
function saveBook(book) {
    const currentList = JSON.parse(localStorage.getItem("readingList")) || [];
    
    // Check if book already exists in the list
    const exists = currentList.some(item => item.title === book.title);
    
    if (!exists) {
        currentList.push(book);
        localStorage.setItem("readingList", JSON.stringify(currentList));
        alert(`${book.title} added to your Reading List!`);
    } else {
        alert("This book is already in your list.");
    }
}

// Close Modal Event
closeModal.addEventListener("click", () => modal.close());

// Initial call to start the app
fetchBooks();