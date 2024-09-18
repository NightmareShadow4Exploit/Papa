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
        const pdfList = document.getElementById('pdfFileList');
        pdfList.innerHTML = '';

        data.forEach(file => {
            if (file.type === 'file' && file.name.endsWith('.pdf')) {
                const listItem = document.createElement('li');

                // Create the file link
                const fileLink = document.createElement('a');
                fileLink.href = file.download_url;
                fileLink.textContent = file.name;
                fileLink.target = '_blank'; // Open in a new tab

                // Create a view button
                const viewButton = document.createElement('button');
                viewButton.textContent = 'View';
                viewButton.className = 'raw-btn';
                viewButton.onclick = () => renderPDF(file.download_url);

                listItem.appendChild(fileLink);
                listItem.appendChild(viewButton);
                pdfList.appendChild(listItem);
            }
        });
    })
    .catch(error => console.error('Error fetching PDF list:', error));

// Function to render PDF within the page
function renderPDF(url) {
    const pdfContainer = document.getElementById('pdf-container');
    pdfContainer.innerHTML = ''; // Clear previous PDF

    pdfjsLib.getDocument(url).promise.then(pdf => {
        pdf.getPage(1).then(page => {
            const scale = 1.5;
            const viewport = page.getViewport({ scale: scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            pdfContainer.appendChild(canvas);

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }).catch(error => console.error('Error fetching or rendering PDF:', error));
}
