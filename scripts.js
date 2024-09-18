// GitHub Pages URL for the repository
const baseUrl = 'https://NightmareShadow4Exploit.github.io/Papa/files/';
const repoApiUrl = 'https://api.github.com/repos/NightmareShadow4Exploit/Papa/contents/files';
const pdfRepoApiUrl = 'https://api.github.com/repos/NightmareShadow4Exploit/Papa/contents/pdf';

// Fetch the list of files from the GitHub repository
function loadExcelFiles() {
    fetch(repoApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const fileList = document.getElementById('fileList');
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
        .catch(error => console.error('Error fetching file list:', error));
}

// Fetch the list of PDF files from the GitHub repository
function loadPdfFiles() {
    fetch(pdfRepoApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const pdfList = document.getElementById('pdfList');
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
        .catch(error => console.error('Error fetching PDF list:', error));
}

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
const folderIcon = document.getElementById('folderIcon');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
const fileToggleBtn = document.getElementById('toggleFiles');
const pdfToggleBtn = document.getElementById('togglePdfs');
const fileList = document.getElementById('fileList');
const pdfList = document.getElementById('pdfList');

// Show the pop-up when the folder icon is clicked
folderIcon.addEventListener('click', () => {
    popup.classList.remove('hidden');
});

// Show the pop-up and load Excel files when the "View Excel Files" button is clicked
fileToggleBtn.addEventListener('click', () => {
    fileList.classList.remove('hidden');
    pdfList.classList.add('hidden');
    popup.classList.remove('hidden');
    loadExcelFiles(); // Function to populate Excel files
});

// Show the pop-up and load PDF files when the "View PDF Files" button is clicked
pdfToggleBtn.addEventListener('click', () => {
    fileList.classList.add('hidden');
    pdfList.classList.remove('hidden');
    popup.classList.remove('hidden');
    loadPdfFiles(); // Function to populate PDF files
});

// Close the pop-up when the close button is clicked
closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
});

// Close the pop-up when clicking outside the content area
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.classList.add('hidden');
    }
});
