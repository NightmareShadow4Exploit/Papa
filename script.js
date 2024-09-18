// GitHub Pages URL for the repository
const baseUrl = 'https://username.github.io/NightmareShadow4Exploit/jjj/';

// List of file URLs
const fileUrls = [
    { name: 'MOM.xlsx', url: `${baseUrl}files/MOM.xlsx` },
    { name: 'PlanningVsAchievement-2024_Updated on 16 Aug 2024.xlsx', url: `${baseUrl}files/PlanningVsAchievement-2024_Updated on 16 Aug 2024.xlsx` }
];

const fileList = document.getElementById('fileList');

// Display file names as links
fileUrls.forEach(file => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = file.name;
    link.addEventListener('click', () => loadFile(file.url));
    listItem.appendChild(link);
    fileList.appendChild(listItem);
});

function loadFile(url) {
    fetch(url)
        .then(response => response.arrayBuffer())
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
