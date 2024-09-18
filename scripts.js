// GitHub Pages URL for the repository
const baseUrl = 'https://NightmareShadow4Exploit.github.io/Papa/files/';
const repoApiUrl = 'https://api.github.com/repos/NightmareShadow4Exploit/Papa/contents/files';
const pdfRepoApiUrl = 'https://api.github.com/repos/NightmareShadow4Exploit/Papa/contents/pdf';

// Function to load Excel files
function loadExcelFiles() {
    console.log('Fetching Excel files from:', repoApiUrl); // Log the API URL
    fetch(repoApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Excel files data:', data); // Log the response data
            const fileList = document.getElementById('excelFileList');
            fileList.innerHTML = ''; // Clear previous file list
            data.forEach(file => {
                if (file.type === 'file' && file.name.endsWith('.xlsx')) {
                    const listItem = document.createElement('li');

                    // Create the file link
                    const fileLink = document.createElement('a');
                    fileLink.href = '#';
                    fileLink.textContent = file.name;
                    fileLink.addEventListener('click', () => loadFile(file.download_url));

                    // Create the "View Raw" button
                    const rawButton = document.createElement('a');
                    rawButton.href = file.download_url;
                    rawButton.textContent = 'View Raw';
                    rawButton.target = '_blank'; // Open in a new tab
                    rawButton.classList.add('raw-btn');

                    listItem.appendChild(fileLink);
                    listItem.appendChild(document.createTextNode(' ')); // Add space between buttons
                    listItem.appendChild(rawButton);
                    fileList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Error fetching Excel files:', error));
}

// Function to load PDF files
function loadPdfFiles() {
    console.log('Fetching PDF files from:', pdfRepoApiUrl); // Log the API URL
    fetch(pdfRepoApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('PDF files data:', data); // Log the response data
            const pdfList = document.getElementById('pdfFileList');
            pdfList.innerHTML = ''; // Clear previous PDF list
            data.forEach(file => {
                if (file.type === 'file' && file.name.endsWith('.pdf')) {
                    const listItem = document.createElement('li');

                    // Create the PDF link
                    const pdfLink = document.createElement('a');
                    pdfLink.href = file.download_url;
                    pdfLink.textContent = file.name;
                    pdfLink.target = '_blank'; // Open in a new tab

                    listItem.appendChild(pdfLink);
                    pdfList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Error fetching PDF files:', error));
}

// Function to load Excel file and display table
function loadFile(url) {
    console.log('Attempting to load file from URL:', url);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            displayTable(jsonData);
        })
        .catch(error => console.error('Error loading file:', error));
}

// Function to display data in table
function displayTable(data) {
    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.getElementById('tableBody');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    // Display headers (first row)
    const headerRow = document.createElement('tr');
    data[0].forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });
    tableHeader.appendChild(headerRow);

    // Display the rest of the data (remaining rows)
    data.slice(1).forEach(rowData => {
        const row = document.createElement('tr');
        rowData.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}

// Get the elements
const excelBtn = document.getElementById('excelBtn');
const pdfBtn = document.getElementById('pdfBtn');
const excelPopup = document.getElementById('excelPopup');
const pdfPopup = document.getElementById('pdfPopup');
const closeExcelBtn = document.querySelector('#excelPopup .close-btn');
const closePdfBtn = document.querySelector('#pdfPopup .close-btn');

// Show the Excel files pop-up
excelBtn.addEventListener('click', () => {
    console.log('Showing Excel files pop-up');
    excelPopup.classList.remove('hidden');
    loadExcelFiles(); // Function to populate Excel files
});

// Show the PDF files pop-up
pdfBtn.addEventListener('click', () => {
    console.log('Showing PDF files pop-up');
    pdfPopup.classList.remove('hidden');
    loadPdfFiles(); // Function to populate PDF files
});

// Close the Excel files pop-up when the close button is clicked
closeExcelBtn.addEventListener('click', () => {
    console.log('Closing Excel pop-up');
    excelPopup.classList.add('hidden');
});

// Close the PDF files pop-up when the close button is clicked
closePdfBtn.addEventListener('click', () => {
    console.log('Closing PDF pop-up');
    pdfPopup.classList.add('hidden');
});

// Close the pop-up when clicking outside the content area
window.addEventListener('click', (event) => {
    if (event.target === excelPopup) {
        console.log('Clicked outside Excel pop-up');
        excelPopup.classList.add('hidden');
    }
    if (event.target === pdfPopup) {
        console.log('Clicked outside PDF pop-up');
        pdfPopup.classList.add('hidden');
    }
});
