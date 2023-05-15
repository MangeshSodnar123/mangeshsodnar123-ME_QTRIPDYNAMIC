import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get("city"); 
  return city; 
}      

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const adventureData = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const adventureDataJson = await adventureData.json();
    // console.log(adventureDataJson);
    return adventureDataJson;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  try{
    const adventureRow = document.querySelector("#data");
    adventureRow.innerHTML = "";
    const adventuresArray = Array.from(adventures);
    adventuresArray.forEach((element) => {
      adventureRow.innerHTML += `<div class="col-6 col-lg-3 mb-4 d-flex justify-content-center align-items-strech">
      <div class="activity-card align-self-stretch" style="width:100%; height:100%;">
      <a href=detail/?adventure=${element.id} id="${element.id}" class="w-100 h-100 d-block">
      
      <div class="category-banner">${element.category}</div>
      
      <img
      src=${element.image}
      class="img-fluid"
      style="height: 12rem;"
      />
      
      <div class="card-body w-100 font-weight-bold">
      <div class="d-flex flex-wrap justify-content-between">
      <div>${element.name}</div>
      <div>${element.currency + element.costPerHead}</div>
      </div>
      <div class="d-flex flex-wrap justify-content-between">
      <div>Duration</div>
      <div>${element.duration} hours</div>
      </div>
      </div>
      
      </a>
      </div>
      
      </div>`;
    });
  }
  catch(err){
    console.log(err);
  }
}
//TODO(optional) - Add new adventures to the City
// try{
// const addAdventureButton = document.querySelector("#add-Adventure-Button");
// // console.log(addAdventureButton);
// addAdventureButton.addEventListener("click",async function(){
  
//     let city = getCityFromURL(window.location.search);
    
//     let response = await fetch(`${config.backendEndpoint}/adventures/new`, {
//       method: 'POST',
//       body: JSON.stringify({
//         "city":city
//       }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     })
//   })

//   }
  // catch(err){
  //   console.log(err);
  // }
  
//helper function
const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newList = [];
  //check for empty categoryList
  if((low==="") || (high==="") || (low===null) || (high===null)){
    return list;
  }
  //filtering the list according to duration
  //converting string to numbers
  let lowInt = Number.parseInt(low);
  let highInt = Number.parseInt(high);
  //filtering list according to duration.
  newList = list.filter((val,ind)=>{
  return val.duration>=lowInt && val.duration<=highInt;
  })

  return newList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let tempList = [];
  let newList = [];
  console.log(categoryList);
  //check for empty categoryList
  if((compareArrays(categoryList,[""]))|| (compareArrays(categoryList,[]))){
    return list;
  }
  else{
  //filtering the list according to categoryList
  for(let category of categoryList){
    tempList = list.filter((val,ind)=>{
      return val.category===category
    })
    newList = newList.concat(tempList);
  }
  return newList;

  }

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
console.log(filters);
//case1:if both fitlters are empty
if((filters["duration"]=="") && ((compareArrays(filters["category"],[]))||(compareArrays(filters["category"],[""])))){
  // console.log(list);
  return list; 
}
else{
  //case2:if both filters are present
  if(!(filters["duration"]==="")&&!((compareArrays(filters["category"],[]))||(compareArrays(filters["category"],[""])))){
    let categoryFilteredList = filterByCategory(list,filters.category)
    let highLowArr = filters["duration"].split("-");
    let low = highLowArr[0];
    let high = highLowArr[1];
    let durationAndCategoryFilteredList = filterByDuration(categoryFilteredList,low,high);
    return durationAndCategoryFilteredList;
  }
  //case3:if only category filter is present
  else if(filters["duration"]===""){
    let newList = filterByCategory(list,filters.category)
    return newList;
  }
  //case4:if only duration filter is present.
  else if((compareArrays(filters["category"],[]))||(compareArrays(filters["category"],[""]))){
    let highLowArr = filters["duration"].split("-");
    let low = highLowArr[0];
    let high = highLowArr[1];
    let newList = filterByDuration(list,low,high);
    return newList;
  }
  
}
return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  let filtersObject;
  try{

    let filters = window.localStorage.getItem("filters");
    filtersObject = JSON.parse(filters);
  }
  catch(err){
    console.log(err);
  }
  // console.log(filtersObject);
  return filtersObject;
}

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let selectedFilterPillNode = document.querySelector("#category-list"); 
  let categoryList = filters.category;

  categoryList.forEach((val)=>{
      selectedFilterPillNode.innerHTML += `<span class="category-filter">${val}</span>`;  
  })
}
  
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
