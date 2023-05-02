// Load the XML file
fetch('cars.xml')
    .then(response => response.text())
    .then(xmlString => {
        // Parse the XML string into an XML document
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        const carCounter = document.getElementById('car-counter');
        // Get the list of vehicles from the XML document
        const vehicles = xmlDoc.getElementsByTagName('Vehicle');
        const carSearch = document.getElementById('car-search');
        // carSearch.addEventListener('change')
        carLoop(vehicles, carCounter)
    })
    .catch(error => console.error(error));

    // // ChatGPT Search
// fetch('cars.xml')
//     .then(response => response.text())
//     .then(xmlString => {
//         // Parse the XML string into an XML document
//         const parser = new DOMParser();
//         const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
//         const carCounter = document.getElementById('car-counter');
//         // Get the list of vehicles from the XML document
//         const vehicles = xmlDoc.getElementsByTagName('Vehicle');
//         const carSearch = document.getElementById('car-search');
//         carSearch.addEventListener('input', () => {
//             const inputValue = carSearch.value.toLowerCase();
//             for (let i = 0; i < vehicles.length; i++) {
//                 const vehicle = vehicles[i];
//                 const make = vehicle.getElementsByTagName('MakeName')[0].textContent.toLowerCase();
//                 const gridItem = document.getElementsByClassName('grid-item')[i];
//                 if (make.includes(inputValue)) {
//                     gridItem.style.display = 'block';
//                 } else {
//                     gridItem.style.display = 'none';
//                 }
//             }
//         });
//         carLoop(vehicles, carCounter);
//     })
//     .catch(error => console.error(error));


const carLoop = (vehicles, carCounter) => {
    // Get the modal element
    const modal = document.getElementById('modal');
    let counter = 0;
    // Loop through the vehicles and create a grid item for each one
    for (let i = 0; i < vehicles.length; i++) {
        const vehicle = vehicles[i];
        // Get the vehicle details
        const make = vehicle.getElementsByTagName('MakeName')[0].textContent;
        const model = vehicle.getElementsByTagName('ModelName')[0].textContent;
        const year = vehicle.getElementsByTagName('Year')[0].textContent;
        const mileage = vehicle.getElementsByTagName('Mileage')[0].textContent;
        const price = vehicle.getElementsByTagName('Price')[0].textContent;
        const imageElement = vehicle.getElementsByTagName('Image')[0];
        const image = imageElement ? imageElement.getAttribute('FullUrl') : '';
        const specs = vehicle.getElementsByTagName('Comments')[0].textContent;

        // Create the grid item
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        // Add the vehicle details to the grid item
        if (typeof imageElement !== "undefined") {
            counter++;
            carCounter.innerHTML = counter + " Vehicles Listed";
            gridItem.innerHTML = `
                <div class="grid-item-image">
                    <img src="${image}" alt="${make} ${model}">
                </div>
                <div class="grid-item-details">
                    <h2>${make} ${model} (${year})</h2>
                    <p>Price: R${price}</p>
                </div>
            `;


            // Closes modal on overlay click
            modal.addEventListener('click', () => {
                modal.style.display = 'none';
            })
            // Add a click event listener to the grid item
            gridItem.addEventListener('click', () => {
                // Set the modal content
                modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-details">
                        <h2>${make} ${model} (${year})</h2>
                        <img src="${image}" alt="${make} ${model}">
                    </div>
                    <div class="modal-info">
                        <div class="close">&times;</div>
                        <p class="modal-info-2">Mileage: ${mileage} km</p>
                        <p>Price: R${price}</p>
                        <p>Specs: ${specs}</p>
                    </div>
                </div>
            `;

                // Show the modal
                modal.style.display = 'block';

                // Get the close button element inside the modal
                const modalCloseButton = modal.querySelector('.close');

                // Add a click event listener to the close button
                modalCloseButton.addEventListener('click', () => {
                    // Hide the modal
                    modal.style.display = 'none';
                });

                // Calculate the position of the modal
                const modalContent = modal.querySelector('.modal-content');
                const modalWidth = modalContent.offsetWidth;
                const modalHeight = modalContent.offsetHeight;
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                const left = (screenWidth - modalWidth) / 2;
                const top = (screenHeight - modalHeight) / 2;

                // Set the position of the modal
                modalContent.style.left = left + 'px';
                modalContent.style.top = top + 'px';
            });

            // Add the grid item to the grid container
            document.getElementById('car-grid').appendChild(gridItem);
        } else {
            gridItem.innerHTML = "None"
        }
    }
}