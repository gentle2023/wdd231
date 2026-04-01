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
        
        // 2. Process data with an Array Method
        renderLibrary(books);
    } catch (error) {
        console.error("Fetch Error:", error);
        libraryGrid.innerHTML = `<p>Failed to load books. Please try again later.</p>`;
    }
}

// Dynamic Content Generation using Template Literals
function renderLibrary(books) {
    libraryGrid.innerHTML = ""; // Clear grid
    
    books.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}" loading="lazy">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <div class="card-buttons">
                <button class="details-btn">Details</button>
                <button class="save-btn">Add to List</button>
            </div>
        `;

        // Event Handling
        card.querySelector(".details-btn").addEventListener("click", () => openModal(book));
        card.querySelector(".save-btn").addEventListener("click", () => saveBook(book));

        libraryGrid.appendChild(card);
    });
}

// Modal Interaction
function openModal(book) {
    modalContent.innerHTML = `
        <div class="modal-inner">
            <img src="${book.image}" alt="${book.title}" class="modal-img">
            <h2>${book.title}</h2>
            <p><strong>By:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p class="book-desc">${book.description}</p>
        </div>
    `;
    modal.showModal(); 
}

// Local Storage implementation
function saveBook(book) {
    const currentList = JSON.parse(localStorage.getItem("readingList")) || [];
    
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

// Initial call
fetchBooks();