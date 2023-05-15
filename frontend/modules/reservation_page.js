import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them


  // Place holder for functionality to work in the Stubs
  try{
    let reservationData = await fetch(`${config.backendEndpoint}/reservations/`);
    let dataJSON = await reservationData.json();
    // console.log(dataJSON);
    return dataJSON;
  }
  catch(err){
    
    return null;
  }
}
 
//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  let noReservationBanner = document.querySelector("#no-reservation-banner");
  let reservaionTableParent = document.querySelector("#reservation-table-parent");
  let reservationTable = document.querySelector("#reservation-table");

  if(reservations.length===0){
    noReservationBanner.style.display = "block";
    reservaionTableParent.style.display = "none";
  }
  else{
    noReservationBanner.style.display = "none";
    reservaionTableParent.style.display = "block";
    //adding rows to table for each reservation
    reservations.forEach((res)=>{
      //formating date and time
      const dateStr = new Date(res.date);
      const day = dateStr.getDate();
      const month = dateStr.getMonth() + 1;
      const year = dateStr.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      
      let time1 = new Date(res.time).toLocaleString('en-IN', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      let time2 = new Date(res.time).toLocaleString('en-IN', { 
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      });

      reservationTable.innerHTML += 
                                `<tr>
                                <th scope="col">${res.id}</th>
                                <th scope="col">${res.name}</th>
                                <th scope="col">${res.adventureName}</th>
                                <th scope="col">${res.person}</th>
                                <th scope="col">${formattedDate}</th>
                                <th scope="col">${res.price}</th>
                                <th scope="col">${time1}, ${time2}</th>
                                <th scope="col" id="${res.id}">
                                <a  href="../../../pages/adventures/detail/?adventure=${res.adventure}"><button class="reservation-visit-button text-white" >Visit Adventure</button></a>
                                </th>
                                </tr>`
    })
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
