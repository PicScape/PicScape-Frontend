<template>
    <!-- Modal HTML structure -->
    <div class="modal" id="imageModal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 class="modal-title">Image Preview</h2>
            <img id="modal-image" src="" alt="Preview" />
            <div id="modal-info"></div>
            <button id="downloadButton">Download</button>
        </div>
    </div>
    
    <!-- Rest of your template -->
    <div id="images"></div>
    <div id="info-box" style="display: none;" class="info-box">
        <p>Unable to reach the API.</p>
    </div>
</template>
<style>
#images {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-left: 400px;
    padding-right: 400px;
    padding-top: 40px;
}


.image-container {
    position: relative;
    width: 120px;
    height: 120px;
    overflow: hidden;
    border: 1px solid #ccc;
    text-align: center;
}

.image-container img {
    height: 120px;
    width: 120px;
}

.image-container:hover .overlay {
    display: block;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
}

.overlay button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

.container {
    padding-left: 2000px;
}

.info-box {
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    margin: 10px auto; 
    width: 500px;
    text-align: center;
    position: fixed; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);
    
}

.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal content */
.modal-content {
    background-color: #fefefe;
    margin: 5% auto; /* Adjust the top margin */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Set the width of the modal content */
    max-width: 400px; /* Limit the maximum width of the modal content */
    max-height: 80%; /* Limit the maximum height of the modal content */
    overflow-y: auto; /* Enable vertical scrolling if needed */
}

#modal-image {
    /* Limit the size of the image preview */
    max-width: 100%;
    height: auto;
    width: 200px; /* Set the width of the image preview */
    height: 200px; /* Set the height of the image preview */
    margin: 0 auto 10px; /* Center the image horizontally and add some bottom margin */
    display: block; /* Ensure it's treated as a block element */
}

/* Close button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.modal-title {
    /* Center the modal title */
    text-align: center;
}

#modal-info {
    /* Add some padding to the information container */
    padding: 10px;
}

#downloadButton {
    display: block;
    margin: 0 auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
}

#downloadButton:hover {
    background-color: #0056b3;
}

</style>

<script setup>
async function fetchRandomImages() {
    try {
        const response = await fetch('http://localhost:3000/api/random?count=20');
        if (!response.ok) {
            throw new Error('Failed to fetch random images');
        }
        const data = await response.json();
        return data.map(item => item.randomImage);
    } catch (error) {
        console.error('Error fetching random images:', error.message);
        displayInfoBox('Unable to reach the API.');
        return [];
    }
}

async function fetchAndDisplayImages() {
    try {
        const imagesData = await fetchRandomImages();
        if (imagesData.length === 0) {
            return;
        }
        const imagesDiv = document.getElementById('images');
        imagesData.forEach(imageData => {
            const imageURL = `http://localhost:3000/api/images/${imageData.id}`;
            const img = document.createElement('img');
            img.src = imageURL;
            const container = document.createElement('div');
            container.classList.add('image-container');
            container.appendChild(img);
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            const button = document.createElement('button');
            button.innerText = 'View';
            button.dataset.imageId = imageData.id;
            button.addEventListener('click', () => {
                showImagePreview(imageData); // Call a function to display image preview
            });
            overlay.appendChild(button);
            container.appendChild(overlay);
            imagesDiv.appendChild(container);
        });
    } catch (error) {
        console.error('Error fetching and displaying images:', error.message);
        displayInfoBox('Unable to reach the API.');
    }
}

function showImagePreview(imageData) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modal-image');
    const modalInfo = document.getElementById('modal-info');
    const downloadButton = document.getElementById('downloadButton');
    const modalTitle = document.querySelector('.modal-title');

    // Set image source and other information
    modalImage.src = `http://localhost:3000/api/images/${imageData.id}`;
    modalInfo.textContent = `Image ID: ${imageData.id}, Description: ${imageData.description}, Author: ${imageData.author}`;
    modalTitle.textContent = 'Image Preview';

    // Show modal
    modal.style.display = 'block';

    // Close modal when close button or outside modal area is clicked
    const closeButton = document.querySelector('.close');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Add functionality to the download button
    downloadButton.onclick = function() {
        window.open(`http://localhost:3000/api/images/${imageData.id}`, '_blank');
    };
}

function displayInfoBox(message) {
    const infoBox = document.getElementById('info-box');
    infoBox.style.display = 'block';
    infoBox.querySelector('p').textContent = message;
}

fetchAndDisplayImages();
</script>
