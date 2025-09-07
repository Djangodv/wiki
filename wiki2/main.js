const _sideNav = document.getElementById('sideNav');

async function fetchTitles(file) {
  const response = await fetch(file);
  const data = await response.json();

  data.forEach((item) => {

    const newElement = document.createElement('a');
    newElement.textContent = item;

    newElement.setAttribute('href', '#' + item)
    newElement.setAttribute('page', item + '.md')

    _sideNav.appendChild(newElement);

  })

}

async function fetchFile(file) {
    const response = await fetch(file);
    const data = await response.text();
    let content = marked.parse(data);
    document.querySelector('#mainContent').innerHTML = content;
}

async function updateContent() {

  await fetchTitles('wiki-pages.json');

  document.querySelectorAll('#sideNav a').forEach(link => {
      link.addEventListener('click', function(event) {

          console.log('Link clicked:', this.href);

          fetchFile(link.getAttribute('page'));

      });
  });
}

updateContent();
// document.getElementById('content').innerHTML = marked.parse('# Title');
// document.getElementById('content').innerHTML =
//       marked.parse('# Marked in browser\n\nRendered by **marked**.');


// An async function is asynchronous, which means it won't stop other operations when executing the function making it more efficient.

fetchFile();

// fetch('markdown.md')
//     .then(response => response.text())
//     .then((result) => {
//         var content = marked.parse(result);
//         document.querySelector('#main-content').innerHTML = result;
//     })

// Return an object of the current URL (used to dynamically update a page)
const currentUrl = new URL(window.location)
const page = currentUrl.searchParams.get('pathname')

console.log(currentUrl)
console.log(page)


// const newElement = document.getElementById('data.json')

  //     const tempElement = document.createElement('a');
  //     tempElement.textContent = element;
  //     tempElement.setAttribute('href', '#github.com')
  //     tempElement.setAttribute('data', element)

  //     _sideNav.appendChild(tempElement);
  
  //   })
      
// fetchTitles('data.json');

// }
// fetch('data.json')
//   .then(response => response.json())
//   .then((result) => {
//       const data = result;
// //       })
//   })


// const newChild = document.createElement('a');
// newChild.textContent = 'About';

// const newElement = document.getElementById('mySidenav');
// newElement.appendChild(newChild);
// console.log(newElement.id);


// const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

