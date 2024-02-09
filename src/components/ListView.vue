<template>
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
                alert('Image ID: ' + button.dataset.imageId);
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

function displayInfoBox(message) {
    const infoBox = document.getElementById('info-box');
    infoBox.style.display = 'block';
    infoBox.querySelector('p').textContent = message;
}

fetchAndDisplayImages();
</script>
