// Function to get and display URL parameters
function displayResults() {
    // Get the current URL's search parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Extract the 'query' value (this matches the name="query" attribute in the form)
    const searchQuery = urlParams.get('query');
    
    const displayDiv = document.querySelector("#results-display");
    const querySpan = document.querySelector("#user-query");

    if (searchQuery) {
        // Display the data back to the user
        displayDiv.innerHTML = `
            <p><strong>Field:</strong> Search Term</p>
            <p><strong>Value:</strong> ${searchQuery}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        `;
        querySpan.textContent = searchQuery;
    } else {
        displayDiv.innerHTML = "<p>No search data was found.</p>";
        querySpan.textContent = "nothing";
    }
}

document.addEventListener("DOMContentLoaded", displayResults);