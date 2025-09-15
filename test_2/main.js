const _sideNav = document.getElementById('pageTitles');

// Fetches the titles (from the .json file) to display in the side navigation bar
async function fetchTitles(file) {

  const response = await fetch(file);
  const data = await response.json();

  data.forEach((item) => {

    const _path = item.path;
    const _name = item.name;
    const _directory = item.directory;

    // Depending on if its a directory or not add a button- or a simple anchor element
    if (!_directory){
  
      // Create an <a> element for each file in the .json file
      const anchorElement = document.createElement('a');
      anchorElement.textContent = _name;
      anchorElement.setAttribute('file', _path);
  
      _sideNav.appendChild(anchorElement);

    } else {

      // Create a <button> element for each directory in the .json file
      const buttonElement = document.createElement('button');
      buttonElement.textContent = _name;
      buttonElement.setAttribute('class', "dropdown-btn");
      // buttonElement.setAttribute('_directory', _path)
      _sideNav.appendChild(buttonElement);

      // Add an icon to the button (fa stands for Font Awesome)
      const caretIcon = document.createElement('i');
      caretIcon.setAttribute('class', "fa fa-caret-down");
      buttonElement.appendChild(caretIcon);

      // Create a <div> element to hold all the files in the subdirectory
      const divElement = document.createElement('div');
      divElement.setAttribute('class', 'dropdown-container');
      divElement.setAttribute('_directory', _path);
      divElement.setAttribute('id', _name);
      _sideNav.appendChild(divElement);

      // Fetches all the links in the specified subdirectory under _path to display in the dropdown menu
      fetchDropdownTitles(_path, _name);
    }

  })

}

// Function to retrieve all the filenames in a subdirectory directly from the Github Rest API
async function retrieveAPIData(subdirectory) {
  const APIUrl = `https://api.github.com/repos/Djangodv/wiki/contents/${subdirectory}`;

  const response = await fetch(APIUrl);
  // Specifies the API version and response format to make sure Github sends the correct data (not necessary perse)
  // const response = await fetch(apiUrl, {
  //   headers: {
  //     'Accept': 'application/vnd.github.v3+json' 
  //   }
  const data = await response.json();

  return data;
}

// Display all the filenames inside the dropdown menu of a subdirectory
async function fetchDropdownTitles(subdirectory, id) {
  const data = await retrieveAPIData(subdirectory);

  data.forEach((item) => {

    const anchorElement = document.createElement('a');
    anchorElement.textContent = item.name;
    anchorElement.setAttribute('file', item.path);

    // Identify the correct <div> element and append an anchor per file
    const _divElement = document.getElementById(id);

    anchorElement.addEventListener('click', function(event) {
      fetchFile(item.path)
    })
  // document.querySelectorAll('#_name a').forEach(link => {
  //   link.addEventListener('click', function(event) {
  //     console.log("hello");
  //   })
    
  // })

    _divElement.appendChild(anchorElement);

  }
  )
}

// Function used to fetch the file displayed in marked.js
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


  // Loop through all dropdown buttons to toggle between hiding and showing its dropdown content
  const dropdown = document.getElementsByClassName("dropdown-btn");

  document.querySelectorAll('.dropdown-btn').forEach(file => {
    file.addEventListener('click', function(event) {
      console.log("test");
      // 'this' keyword can be replaced with 'file' as it refers to the same element, i.e. .dropdown-btn
      this.classList.toggle("active");
      // Select the <div> element that holds the names of the files in the subdirectory
      const dropdownContent = this.nextElementSibling;
      dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
      // Alternative way of writing the above: dropdownContent.style.display === "block" ? dropdownContent.style.display = "none" : dropdownContent.style.display = "block";

    })
  })




}

updateContent();

// An async function is asynchronous, which means it won't stop other operations when executing the function making it more efficient.

// Return an object of the current URL (used to dynamically update a page)
// const currentUrl = new URL(window.location)
// const page = currentUrl.searchParams.get('pathname')

// const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

