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
