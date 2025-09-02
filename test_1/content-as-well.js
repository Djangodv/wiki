async function fetchMarkdownDocument() {
        try {
            // Fetch the Markdown content
            const response = await fetch('markdown.md');
            if (!response.ok) throw new Error('Network response was not ok');
            const markdownContent = await response.text();

            // Parse the Markdown content
            const tokens = marked.lexer(markdownContent);

            // Return an object containing the parsed tokens and the original content
            return {
                content: markdownContent,
                tokens: tokens
            };
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return null;
        }
    }

// Parse the Markdown content
const tokens = fetchMarkdownDocument().content;
// Use the marked.lexer function to parse the Markdown content into tokens. Tokens are the basic units of the parsed Markdown content.

// Function to extract titles
function extractTitles(tokens) {
    const titles = [];
    // Initialize an empty array to store the extracted titles.
    tokens.forEach(token => {
        // Iterate through each token in the parsed Markdown content.
        if (token.type === 'heading') {
            // Check if the token type is 'heading'. Headings in Markdown are denoted by '#', '##', '###', etc.
            titles.push(token.text);
            // If the token is a heading, add its text to the titles array.
        }
    });
    return titles;
    // Return the array of extracted titles.
}

// Extract titles
const titles = extractTitles(tokens);
// Call the extractTitles function with the parsed tokens to get an array of extracted titles.

// Display the titles
const titlesList = document.getElementById('titles-list');
// Retrieve the unordered list element with the id 'titles-list'. This is where the extracted titles will be displayed.
titles.forEach(title => {
    // Iterate through each title in the extracted titles array.
    const listItem = document.createElement('li');
    // Create a new list item element for each title.
    listItem.textContent = title;
    // Set the text content of the list item to the title.
    titlesList.appendChild(listItem);
    // Append the list item to the unordered list.
});
// The extracted titles are now displayed in the unordered list on the webpage. make this code smaller and consies without any funcitons and as little lines of code as possible