import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL


  // Place holder for functionality to work in the Stubs
  const searchParams = new URLSearchParams(search);
  const adventureId = searchParams.get('adventure');
  return adventureId;
} 
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call


  // Place holder for functionality to work in the Stubs
  // /adventures/detail?adventure=<adventure_id>
  try{

    let adventureDetails = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let adventureDetailsJSON = await adventureDetails.json();
    return adventureDetailsJSON;
  }
  catch(error){
    
    return null;
  }

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureNameNode = document.querySelector("#adventure-name");
  adventureNameNode.innerHTML = adventure.name;
  
  let adventureSubtitleNode = document.querySelector("#adventure-subtitle");
  adventureSubtitleNode.innerHTML = adventure.subtitle;

  let adventureImagesNode = document.querySelector("#photo-gallery");

  adventure.images.forEach(imgURL => {
    adventureImagesNode.innerHTML += `<div class=""><img class="activity-card-image" src="${imgURL}" alt="${adventure.name} images"></div>`
  });

  let adventureContentNode = document.querySelector("#adventure-content");
  adventureContentNode.innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let adventureImagesNode = document.querySelector("#photo-gallery");
  adventureImagesNode.innerHTML = 
  `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner">
  
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`

let carouselInnerNode = document.querySelector(".carousel-inner");
images.forEach((imgURL,index)=>{
  if(index===0){
    carouselInnerNode.innerHTML +=`<div class="carousel-item active">
                                  <img src="${imgURL}" class="activity-card-image" alt="adventure image">
                                  </div>`
  }
  else{
    
    carouselInnerNode.innerHTML +=`<div class="carousel-item">
                                  <img src="${imgURL}" class="activity-card-image" alt="adventure image">
                                  </div>`
  }
})
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOutPanalNode = document.querySelector("#reservation-panel-sold-out");
  let availablePanalNode = document.querySelector("#reservation-panel-available");
  let reservationPersonCost = document.querySelector("#reservation-person-cost");
  if(adventure.available){
    availablePanalNode.style.display = "block";
    soldOutPanalNode.style.display = "none";
    reservationPersonCost.innerHTML = adventure.costPerHead;
  }
  else{
    availablePanalNode.style.display = "none";
    soldOutPanalNode.style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationCostNode = document.querySelector("#reservation-cost");
  reservationCostNode.innerHTML = adventure.costPerHead*persons;
}

//Implementation of reservation form submission
async function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let myForm = document.querySelector("#myForm");
  myForm.addEventListener("submit",async (event)=>{
    event.preventDefault();

    let name = myForm.elements.name.value
    let date = myForm.elements.date.value
    let person = myForm.elements.person.value
    let adventureId = adventure.id;

    //post request to api to add new reservation
    const data = {
      name: name,
      date: date,
      person:person,
      adventure:adventureId
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    
    try {
      const response = await fetch(`${config.backendEndpoint}/reservations/new`,options);
  
      if (response.ok) {
        alert("Success!");
        window.location.reload();

      }
      else{
      alert("Failed!");
      }
  
      const responseData = await response.json();
      console.log(responseData);

    } catch (error) {
      // console.error('There was a problem with the fetch operation:', error);
      alert("Failed!");

    }
    })
}
 
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure);
  let reservedBanner = document.querySelector("#reserved-banner");
  
  if(adventure.reserved){
    reservedBanner.style.display = "block";
  }
  else{
    reservedBanner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
