const _sideNav = document.getElementById('pageTitles');

async function fetchTitles(file) {
  const response = await fetch(file);
  const data = await response.json();

  data.forEach((item) => {

    const _path = item.path;
    const name = item.Name;
    const directory = item.Directory;

    if (!directory){
      console.log(directory);
  
      const anchorElement = document.createElement('a');
      anchorElement.textContent = name;
  
      // anchorElement.setAttribute('href', '#' + item)
      anchorElement.setAttribute('file', _path)
  
      _sideNav.appendChild(anchorElement);
    } else {
      console.log("Hello World!")
      const buttonElement = document.createElement('button');
      buttonElement.textContent = name;
      buttonElement.setAttribute('class', "dropdown-btn")
      // buttonElement.setAttribute('directory', _path)
      _sideNav.appendChild(buttonElement);

      const caretIcon = document.createElement('i');
      caretIcon.setAttribute('class', "fa fa-caret-down")
      buttonElement.appendChild(caretIcon);

      const divElement = document.createElement('div');
      divElement.setAttribute('class', 'dropdown-container')
      divElement.setAttribute('directory', _path)
      divElement.setAttribute('id', name)
      _sideNav.appendChild(divElement);

      fetchDropdownTitles(_path, name);
    }

  })

}

async function retrieveAPIData(subdirectory) {
  const APIUrl = `https://api.github.com/repos/Djangodv/wiki/contents/${subdirectory}`;
  const response = await fetch(APIUrl);
  // const response = await fetch(apiUrl, {
  //   headers: {
  //     'Accept': 'application/vnd.github.v3+json' // Specifies the API version and response format
  //   }
  const data = await response.json();
  console.log(data);
  return data;
}

async function fetchDropdownTitles(subdirectory, id) {
  const jsonData = await retrieveAPIData(subdirectory);

  jsonData.forEach((item) => {
    console.log(item.name);
    const anchorElement = document.createElement('a');
    anchorElement.textContent = item.name;
    anchorElement.setAttribute('file', item.path);
    console.log(item.path);
    const _divElement = document.getElementById(id);
    _divElement.appendChild(anchorElement);
  }
  )
}

async function fetchFile(file) {
    const response = await fetch(file);
    const data = await response.text();
    let content = marked.parse(data);
    document.querySelector('#page').innerHTML = content;
}

async function updateContent() {

  await fetchTitles('wiki-pages.json');


  document.querySelectorAll('#pageTitles a').forEach(link => {
      link.addEventListener('click', function(event) {

          // console.log('Link clicked:', this.href);

          fetchFile(link.getAttribute('file'));

      });
  });

  document.querySelectorAll('.dropdown-container a').forEach(link => {
      link.addEventListener('click', function(event) {

          // console.log('Link clicked:', this.href);

          fetchFile(link.getAttribute('file'));

      });
  });

//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    console.log("test");
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
} 


}

updateContent();

// document.getElementById('content').innerHTML = marked.parse('# Title');
// document.getElementById('content').innerHTML =
//       marked.parse('# Marked in browser\n\nRendered by **marked**.');


// An async function is asynchronous, which means it won't stop other operations when executing the function making it more efficient.

// fetchFile();

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

