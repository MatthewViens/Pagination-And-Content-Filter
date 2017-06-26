// Create div and ul to hold pagination buttons and append to bottom of
// main content div
const mainDiv = document.querySelector('.page');
const paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';
const paginationList = document.createElement('ul');
paginationDiv.appendChild(paginationList);
mainDiv.appendChild(paginationDiv);

// Create search div, input, and button and append to bottom of header div
const headerDiv = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
const searchField = document.createElement('input');
searchField.setAttribute('placeholder', 'Search for students...');
searchDiv.classList.add('student-search');
const searchButton = document.createElement('button');
searchButton.textContent = "Search";
searchDiv.appendChild(searchField);
searchDiv.appendChild(searchButton);
headerDiv.appendChild(searchDiv);

// Get all items to be paginated, set quantity per page, and determine how
// many pages are needed to show all items
const allStudents = document.querySelectorAll('.student-item');
students = allStudents;
let itemsPerPage = 10;
let pages = Math.ceil(students.length/itemsPerPage);

// Set defaults for first time page load
let page = 1;
renderButtons();
renderItems();

// Add click event listener to search button
  // create array of students to hold search results.
  // if any student includes search query, add to students array.
  // reset search field to blank.
  // recalculate number of pages needed based on results.
  // rerender buttons and items
searchButton.addEventListener('click', () => {
  students = [];
  let search = searchField.value;
  for(let i = 0; i < allStudents.length; i++){
    if (allStudents[i].innerText.includes(search)){
      students.push(allStudents[i]);
    }
  }
  searchField.value = '';
  pages = Math.ceil(students.length/itemsPerPage);
  renderButtons();
  renderItems();
});

// Iterate over number of pages, for each page create list item and an anchor
// element. Append anchor to list item, append list item to pagination div.
function renderButtons(){
  paginationList.innerHTML = '';
  for(let i = 1; i <= pages; i++){
    let item = document.createElement('li');
    let link = document.createElement('a');
    item.appendChild(link);
    link.setAttribute('href', '#');
    link.textContent = i;
  // First page 'active' on page load
    if(i === 1){
      link.classList.add('active');
    }
  // Add click event to anchor element:
    // remove active class on all pagination buttons
    // prevent default link behavior
    // add active class back to clicked buttons
    // set global page variable
    // show/hide elements via render function
    link.addEventListener('click', (e) => {
      document.querySelector('.active').classList.remove('active');
      e.preventDefault();
      e.target.classList.add('active');
      page = i;
      renderItems();
    });
    paginationList.appendChild(item);
    page = 1;
  }
}

// Hide all items
function hidelist(){
  for(let i = 0; i < allStudents.length; i++){
    allStudents[i].style.display = 'none';
  }
}

// Called when pagination buttons clicked.
  // hides all items
  // determines what items to show based on upper and lower limits
  // iterate over items within limits and show
function renderItems(){
  hidelist();
  let lower = (page - 1) * itemsPerPage;
  let upper = page * itemsPerPage;
  if(students.length){
    for(let i = lower; i < upper; i++){
      if(students[i]){
      students[i].style.display = 'block';
      }
    }
  } else {
    console.log('no results');
  }
}
