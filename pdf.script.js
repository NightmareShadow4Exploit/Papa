// GitHub Pages URL for the repository
const pdfRepoApiUrl = 'https://api.github.com/repos/NightmareShadow4Exploit/Papa/contents/pdf';

// Fetch the list of PDF files from the GitHub repository
fetch(pdfRepoApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const pdfList = document.getElementById('pdfList');
        pdfList.innerHTML = '';

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
