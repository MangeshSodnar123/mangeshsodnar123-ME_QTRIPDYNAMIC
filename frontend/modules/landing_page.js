import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const cities = await fetch(`${config.backendEndpoint}/cities`);
    const citiesJson = await cities.json();
    return citiesJson;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const data = document.querySelector("#data");
  data.innerHTML += 
                `<div class="col-6 col-lg-3 mb-4 d-flex justify-content-center">
                  <a href="pages/adventures/?city=${id}" id=${id}>
                    <div class="tile">
                      <img
                        src=${image}
                        alt=${id}
                        class="align-self-stretch"
                      />
                      <div class="tile-text">
                        <h3>${city}</h3>
                        <p>${description}</p>
                      </div>
                    </div>
                  </a>
                </div>`;

}

export { init, fetchCities, addCityToDOM };
