const fetchData = async () => {
  //Define URL
  const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";

  //Fetch data from API
  const res = await fetch(url);

  //Convert data to JSON
  const data = await res.json();

  return data;
};

const renderData = (data) => {
  // Select DOM elements
  const loadingEl = document.querySelector(".loading");
  const listContainer = document.querySelector(".listContainer");

  // Hide loading and show list
  loadingEl.style.display = "none";
  listContainer.style.display = "flex";

  let innerHTML = "";
  // Render list items
  data.forEach((item) => {
    innerHTML += `
    <li class="listItem">
        <label>
            <input type="checkbox" ${item.completed ? "checked" : ""} />
            <span>${item.title}</span>
        </label>
    </li>`;
  });

  // Add list items to DOM
  listContainer.innerHTML = innerHTML;
};

const addTodo = (e) => {
  //Prevent page reload
  e.preventDefault();

  //Get values from event
  const title = e.target.title.value;
  const completed = e.target.completed.checked;

  //Select List Container
  const listContainer = document.querySelector(".listContainer");

  //Create new list item
  const newItem = `
    <li class="listItem">
        <label>
            <input type="checkbox" ${completed ? "checked" : ""} />
            <span>${title}</span>
        </label>
    </li>
  `;

  //Add new list item to DOM
  listContainer.innerHTML += newItem;

  //Reset form
  e.target.reset();
};

const init = async () => {
  //Fetch data from API
  const data = await fetchData();

  //Render data to DOM
  renderData(data);

  //Add event listener to form
  const form = document.querySelector(".formContainer");
  form.addEventListener("submit", addTodo);
};

init();
