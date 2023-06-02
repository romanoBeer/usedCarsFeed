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
		const SearchBar = document.getElementById('car-search');
		const SortBar = document.getElementById('sort-select');
		carLoop(vehicles, carCounter, SearchBar)

		SearchBar.addEventListener('input', () => {
			clearPage();
			carLoop(vehicles, carCounter, SearchBar);
		})

	})
	.catch(error => console.error(error));

const clearPage = () => {
	const carItems = document.querySelectorAll('.grid-item');
	carItems.forEach(item => {
		item.remove();
	})
}

const carLoop = (vehicles, carCounter, SearchBar) => {
	let gridItem = "";
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
		if (make.toUpperCase().includes(SearchBar.value.toUpperCase()) || model.toUpperCase().includes(SearchBar.value.toUpperCase())) {
			// Create the grid item
			gridItem = document.createElement('div');
			gridItem.classList.add('grid-item');
			// Add the vehicle details to the grid item
			// This below only renders an image if there is an image in the list.
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
					// Closes modal on overlay click
					modal.addEventListener('keydown', () => {
						modal.style.display = 'none';

					})
				});
				// Add the grid item to the grid container
				document.getElementById('car-grid').appendChild(gridItem);
			} else {
				gridItem.innerHTML = "None"
			}
		} else {

		}
	}

}