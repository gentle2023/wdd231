const listGrid = document.querySelector("#reading-list-grid");
const listCount = document.querySelector("#list-count");
const emptyMessage = document.querySelector("#empty-message");

// Load data from Local Storage
function loadReadingList() {
    const savedBooks = JSON.parse(localStorage.getItem("readingList")) || [];
    renderList(savedBooks);
}

// Render the saved books
function renderList(books) {
    listGrid.innerHTML = "";
    
    // Update the count text
    listCount.textContent = `You have ${books.length} book(s) in your list.`;

    if (books.length === 0) {
        emptyMessage.classList.remove("hidden");
        return;
    }

    emptyMessage.classList.add("hidden");

    books.forEach((book, index) => {
        const card = document.createElement("div");
        card.className = "book-card saved-card";
        
        // Check if the book was marked as read (application state)
        const isRead = book.completed ? "completed" : "";

        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="${isRead}">
            <h3 class="${isRead}">${book.title}</h3>
            <p>By: ${book.author}</p>
            <div class="card-buttons">
                <button class="status-button">${book.completed ? "Mark Unread" : "Mark Read"}</button>
                <button class="remove-button">Remove</button>
            </div>
        `;

        // Event: Toggle Read/Unread status
        card.querySelector(".status-button").addEventListener("click", () => toggleStatus(index));
        
        // Event: Remove book from list
        card.querySelector(".remove-button").addEventListener("click", () => removeBook(index));

        listGrid.appendChild(card);
    });
}

// Toggle Completed Status
function toggleStatus(index) {
    let list = JSON.parse(localStorage.getItem("readingList"));
    // Toggle the boolean property
    list[index].completed = !list[index].completed;
    localStorage.setItem("readingList", JSON.stringify(list));
    loadReadingList();
}

// Remove Book (Array Filtering/Splicing)
function removeBook(index) {
    let list = JSON.parse(localStorage.getItem("readingList"));
    // Remove 1 item at the specific index
    list.splice(index, 1);
    localStorage.setItem("readingList", JSON.stringify(list));
    loadReadingList();
}

// Initial Load
document.addEventListener("DOMContentLoaded", loadReadingList);