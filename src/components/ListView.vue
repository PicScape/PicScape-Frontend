<template>
    <div class="modal" id="imageModal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 class="modal-title">Image Preview</h2>
            <div class="modal-detail-container">
                <img id="modal-image" src="" alt="Preview" />
                <div class="img-data-container">
                    <div>
                        <h3 style="color: black;">Title:</h3>
                        <h3 class="img-title"></h3>
                    </div>
                    <div>
                        <h3 style="color: black;">Description:</h3>
                        <h3 style="color: black;" class="img-description"></h3>
                    </div>
                    <h4 class="img-description"></h4>
                </div>
                
            </div>
            
            <button id="downloadButton">Download</button>
        </div>
    </div>
    
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
    animation: fadeIn 0.5s ease-in-out; /* Apply fade-in animation */
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.modal-content {
    background-color: #fefefe;
    margin: 5% auto; 
    padding: 20px;
    border: 1px solid #888;
    width: 80%; 
    max-width: 400px; 
    max-height: 80%; 
    overflow-y: auto; 
    animation: slideIn 0.5s ease-in-out; /* Apply slide-in animation */
}

@keyframes slideIn {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}


#modal-image {
    max-width: 100%;
    grid-column: 1/2;
    height: auto;
    width: 200px; 
    height: 200px; 
    margin: 0 auto 10px; 
    display: block;
    background-color: #888;
    border-radius: 20px;
}


.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    transition: 0.3s; 
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.modal-title {
    color: black;
    text-align: center;
}

#modal-info {
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


.modal-detail-container{
    display: grid;
    grid-template-columns: 200px 1fr;
}

.img-data-container{
    text-align: left;
    padding-left: 10px;
    
}

.img-title{
    color: black;
    font-size: 25px;
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

    const imgTitle = document.querySelector('.img-title');
    const imgDescription = document.querySelector('.img-description');

    const downloadButton = document.getElementById('downloadButton');
    const modalTitle = document.querySelector('.modal-title');

    // Set image source and other information
    modalImage.src = `http://localhost:3000/api/images/${imageData.id}`;
    modalTitle.textContent = 'Preview';
    imgTitle.textContent = `${imageData.title}`;
    imgDescription.textContent = `${imageData.description}`;

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
