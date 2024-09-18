// GitHub Pages URL for the repository
const baseUrl = 'https://NightmareShadow4Exploit.github.io/Papa/files/';
const repoApiUrl = 'https://api.github.com/repos/NightmareShadow4Exploit/Papa/contents/files';

// Fetch the list of files from the GitHub repository
fetch(repoApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const fileList = document.getElementById('fileList');
        const pdfList = document.getElementById('pdfList');
        fileList.innerHTML = '';
        pdfList.innerHTML = '';

        data.forEach(file => {
            if (file.type === 'file') {
                const listItem = document.createElement('li');

                // Check if file is an Excel or PDF
                if (file.name.endsWith('.xlsx')) {
                    // Create the file link for Excel files
                    const fileLink = document.createElement('a');
                    fileLink.href = '#';
                    fileLink.textContent = file.name;
                    fileLink.addEventListener('click', () => loadFile(file.download_url));

                    // Create the "View Raw" button for Excel files
                    const rawButton = document.createElement('a');
                    rawButton.href = file.download_url;
                    rawButton.textContent = 'View Raw';
                    rawButton.target = '_blank'; // Open in a new tab
                    rawButton.classList.add('raw-btn');

                    listItem.appendChild(fileLink);
                    listItem.appendChild(document.createTextNode(' ')); // Add space between buttons
                    listItem.appendChild(rawButton);
                    fileList.appendChild(listItem);
                } else if (file.name.endsWith('.pdf')) {
                    // Create the file link for PDF files
                    const listItem = document.createElement('li');
                    const pdfLink = document.createElement('a');
                    pdfLink.href = file.download_url;
                    pdfLink.textContent = file.name;
                    pdfLink.target = '_blank'; // Open in a new tab
                    listItem.appendChild(pdfLink);
                    pdfList.appendChild(listItem);
                }
            }
        });
    })
    .catch(error => console.error('Error fetching file list:', error));

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
const pdfIcon = document.getElementById('pdfIcon');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');

// Show the pop-up when the folder icon is clicked
folderIcon.addEventListener('click', () => {
    document.getElementById('fileList').classList.remove('hidden');
    document.getElementById('pdfList').classList.add('hidden');
    popup.classList.remove('hidden');
});

// Show the pop-up when the PDF icon is clicked
pdfIcon.addEventListener('click', () => {
    document.getElementById('fileList').classList.add('hidden');
    document.getElementById('pdfList').classList.remove('hidden');
    popup.classList.remove('hidden');
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
