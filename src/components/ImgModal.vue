<template>
    <div class="modal" :id="modalId">
      <div class="modal-content">
        <span class="close">&times;</span>

        <div class="image-modal-details-container">
          <img id="modal-image" src="" />
          <div class="information-box">
            <h3 class="img-title text-set-large"></h3>
            <h3 class="img-id text-set-middle-sub"></h3>

          </div>
          <hr>

          <div class="information-box">
            <div style="margin-bottom: 10px;">
              <h3 class="text-set-middle-bottom">Description:</h3>
              <h3 class="img-description text-set-middle-bottom-sub"></h3>
            </div>
            
            <div style="margin-bottom: 10px;">
              <h3 class="text-set-middle-bottom">Tags:</h3>
              <h3 class="img-tags text-set-middle-bottom-sub"></h3>
            </div>

            <div style="margin-bottom: 10px;">
              <h3 class="text-set-middle-bottom">Publish Date:</h3>
              <h3 class="img-upload-date text-set-middle-bottom-sub"></h3>
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
    background-color: #23272a;
    margin: 5% auto; 
    padding: 20px;
    border: 1px solid #888;
    border-radius: 4%;
    
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





#downloadButton {
    display: block;
    margin-left: 15px;
    margin-bottom: 5px;
    
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



.image-modal-details-container{
  text-align: left;  
  padding-bottom: 10px;
}

#modal-image{
  width: 150px;
  height: 150px;
  margin: 20px;
  margin-bottom: 0;
  border-radius: 15%;
  background-color: #101213;
  box-shadow: 10px 10px #15181a;
  
  
}


.information-box{
  margin: 15px;
  
}

hr{
  margin-left: 15px;
  margin-right: 15px;
  border: 1px solid #4e4e4e;
}

.text-set-large{
  font-size: 30px;
}

.text-set-middle-sub{
  font-size: 16px;
  color: #919191;
}

.text-set-middle-bottom-sub{
  font-size: 17px;
  color: #e7e7e7;
}

.text-set-middle-bottom{
  font-size: 17px;
  color: #919191;
}

img-tag{
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  padding: 1px 8px;
  border-radius: 3px; 
  margin-right: 6px;
  display: inline-block;
  transition: background-color 0.3s ease;
  margin-top: 6px;
}



  </style>
  