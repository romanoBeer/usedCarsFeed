// Load the XML file
fetch('cars.xml')
    .then(response => response.text())
    .then(xmlString => {
        // Parse the XML string into an XML document
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        // Get the list of vehicles from the XML document
        const vehicles = xmlDoc.getElementsByTagName('Vehicle');

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
            gridItem.innerHTML = `
                <h2>${make} ${model} (${year})</h2>
                <img src="${image}" alt="${make} ${model}">
                <p>Mileage: ${mileage}</p>
                <p>Price: R${price}</p>
            `;

            // Add a click event listener to the grid item
            gridItem.addEventListener('click', () => {
                // Open a pop-up window with the vehicle details
                const popup = window.open('', 'Vehicle Details', 'width=600,height=400');
                popup.document.write(`
                    <html>
                        <head>
                            <title>${make} ${model} (${year})</title>
                        </head>
                        <body>
                            <h2>${make} ${model} (${year})</h2>
                            <img src="${image}" alt="${make} ${model}">
                            <p>Mileage: ${mileage}</p>
                            <p>Price: R${price}</p>
                            <p>Specs: ${specs}</p>
                        </body>
                    </html>
                `);
            });

            // Add the grid item to the grid container
            document.getElementById('car-grid').appendChild(gridItem);
        }
    })
    .catch(error => console.error(error));