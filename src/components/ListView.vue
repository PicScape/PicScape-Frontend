<template>
    <div id="images"></div>
</template>

    


<style>
#images {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
    padding-left: 400px;
    padding-right: 400px;
    padding-top: 80px;


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
    widows: 1120px;
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
</style>


<script setup>





async function fetchRandomImages() {
    const response = await fetch('http://localhost:3000/api/random?count=20');
    const data = await response.json();
    return data.map(item => item.randomImage);


}

async function fetchAndDisplayImages() {
    const imagesData = await fetchRandomImages();

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
}

fetchAndDisplayImages();





</script>