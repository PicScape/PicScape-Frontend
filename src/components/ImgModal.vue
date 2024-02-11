<template>
    <div class="modal" :id="modalId">
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
          </div>
        </div>
        <button id="downloadButton">Download</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['modalId'],
    
  }
  </script>
  
  <style>
  .modal {
    display: none; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; 
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4); 
    animation: fadeIn 0.5s ease-in-out; 
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
    
    width: 500px; 
    max-height: 80%; 
    overflow-y: auto; 
    animation: slideIn 0.5s ease-in-out; 
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
  