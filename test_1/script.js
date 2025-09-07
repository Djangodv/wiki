

(async () => {
    try {
        const response = await fetch('markdown.md');
        if (!response.ok) throw new Error('Network response was not ok');
        const markdownContent = await response.text();
        
        const content = marked.parse(markdownContent);
        document.getElementById('content').innerHTML = content;

        const tokens = marked.lexer(markdownContent);

        const titles = tokens.filter(token => token.type === 'heading').map(token => token.text);

        const titlesList = document.getElementById('titles-list');
        titles.forEach(title => {
            const listItem = document.createElement('li');
            listItem.textContent = title;
            titlesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
})();

// Returns a promise
function fetchFilenames() {
    return fetch('documents_in_sidenav.json')
        .then(response => response.json())
        // .then(data => console.log(data))
        .catch(error => console.error('Error fetching JSON:', error));
}

fetchFilenames().then(documents => {
    const documentsList = document.getElementById('sidenav');

    documents.forEach(fileName => {
        const listItem = document.createElement('a');
        listItem.textContent = fileName;
        listItem.setAttribute('href', 'google.com')
        documentsList.appendChild(listItem);
    });
});

// document.querySelectorAll('#sidenav a').forEach(link => {
//     link.addEventListener('click', function(event) {
//         event.preventDefault(); // Prevent default for internal links
//         const fileName = this.getAttribute('data-file');

//         if (fileName) {
//             // Fetch and display content dynamically
//             fetch(fileName)
//                 .then(response => response.text())
//                 .then(markdownContent => {
//                     const content = marked.parse(markdownContent);
//                     document.getElementById('content').innerHTML = content;
//                 })
//                 .catch(error => console.error('Error fetching content:', error));
//         } else {
//             // Allow default behavior for external links
//             window.location.href = this.href;
//         }
//     });
// });
