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
        pdfList.innerHTML = ''; // Clear previous PDF list

        data.forEach(file => {
            if (file.type === 'file' && file.name.endsWith('.pdf')) {
                const listItem = document.createElement('li');

                // Create the PDF link
                const pdfLink = document.createElement('a');
                pdfLink.href = file.download_url;
                pdfLink.textContent = file.name;
                pdfLink.target = '_blank'; // Open in a new tab

                // Create a view button
                const viewButton = document.createElement('button');
                viewButton.textContent = 'View';
                viewButton.className = 'raw-btn'; // Add class for styling
                viewButton.onclick = () => renderPDF(file.download_url); // Render PDF on click

                listItem.appendChild(pdfLink); // Add link to list item
                listItem.appendChild(viewButton); // Add view button to list item
                pdfList.appendChild(listItem); // Add list item to list
            }
        });
    })
    .catch(error => console.error('Error fetching PDF list:', error));

// Function to render PDF within the page
function renderPDF(url) {
    const pdfContainer = document.getElementById('pdf-container');
    pdfContainer.innerHTML = ''; // Clear previous PDF

    // Load and render the PDF
    pdfjsLib.getDocument(url).promise.then(pdf => {
        // Loop through all pages (optional: for multi-page PDFs)
        const numPages = pdf.numPages;
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            pdf.getPage(pageNum).then(page => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                // Create canvas and context
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                pdfContainer.appendChild(canvas);

                // Render the page
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext).promise.then(() => {
                    console.log(`Page ${pageNum} rendered`);
                });
            }).catch(error => console.error(`Error rendering page ${pageNum}:`, error));
        }
    }).catch(error => console.error('Error fetching or rendering PDF:', error));
}
