// Function to highlight matching text
function highlight(text, query) {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
}

// Save to reading list (same logic as library.js)
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

// Function to get and display results
async function displayResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('query')?.toLowerCase().trim();

    const displayDiv = document.querySelector("#results-display");
    const querySpan = document.querySelector("#user-query");

    if (!searchQuery) {
        displayDiv.innerHTML = "<p>No search data was found.</p>";
        querySpan.textContent = "nothing";
        return;
    }

    querySpan.textContent = searchQuery;

    let resultsHTML = `<h2>Search Results for "${searchQuery}"</h2>`;
    let foundSomething = false;

    // -----------------------------
    // Local Storage Results
    // -----------------------------
    const localBooks = JSON.parse(localStorage.getItem("readingList")) || [];

    const localMatches = localBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery) ||
        book.author.toLowerCase().includes(searchQuery)
    );

    if (localMatches.length > 0) {
        resultsHTML += `<h3>📦 Your Reading List</h3><div class="book-grid">`;

        localMatches.forEach(book => {
            resultsHTML += `
                <div class="book-card">
                    <img src="${book.image}" alt="${book.title}">
                    <h3>${highlight(book.title, searchQuery)}</h3>
                    <p><strong>Author:</strong> ${highlight(book.author, searchQuery)}</p>
                    <button class="save-btn">Add to List</button>
                </div>
            `;
        });

        resultsHTML += `</div>`;
        foundSomething = true;
    }

    // -----------------------------
    // Library Results
    // -----------------------------
    try {
        const response = await fetch("data/books.json");
        if (!response.ok) throw new Error("Failed to fetch");

        const books = await response.json();

        const matches = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery) ||
            book.author.toLowerCase().includes(searchQuery) ||
            book.genre.toLowerCase().includes(searchQuery)
        );

        if (matches.length > 0) {
            resultsHTML += `<h3>📚 Library</h3><div class="book-grid">`;

            matches.forEach((book, index) => {
                resultsHTML += `
                    <div class="book-card" data-index="${index}">
                        <img src="${book.image}" alt="${book.title}">
                        <h3>${highlight(book.title, searchQuery)}</h3>
                        <p><strong>Author:</strong> ${highlight(book.author, searchQuery)}</p>
                        <p><strong>Genre:</strong> ${highlight(book.genre, searchQuery)}</p>
                        <button class="save-btn">Add to List</button>
                    </div>
                `;
            });

            resultsHTML += `</div>`;
            foundSomething = true;

            // Add event listeners AFTER rendering
            setTimeout(() => {
                document.querySelectorAll(".book-card").forEach((card, i) => {
                    const btn = card.querySelector(".save-btn");

                    if (btn) {
                        btn.addEventListener("click", () => {
                            saveBook(matches[i]);
                        });
                    }
                });
            }, 0);
        }

    } catch (error) {
        console.error(error);
        resultsHTML += `<p>Error loading books.</p>`;
    }

    // -----------------------------
    // No Results
    // -----------------------------
    if (!foundSomething) {
        resultsHTML += `<p>No matching books found.</p>`;
    }

    displayDiv.innerHTML = resultsHTML;
}

document.addEventListener("DOMContentLoaded", displayResults);