function Comments(resComments){
return`
<div class="comment-content" >
  <img src="../images/f.png">
 <div id="text-comment">
 <span>${resComments.firstName} </span>
 <p id="text-${resComments.postId}-${resComments.id}"></p>
 </div>
  
   </div>`


}



function Post(res){
// console.log(res.id)
    return  `<div class="blog" id="${res.id}">
    <div class="container-blog">
    <div class="title-img">
      <h1>${res.postTitle}</h1>
    </div>
    <div class="img-box">
    <img src="../../images/${res.PostImage}">
    </div>
    <div class="blog-content" style="white-space: pre-line">
    ${res.PostText}
    </div>
    
    <div class="like-comment">
    <span class="like" onclick='like(this)'  data="${res.id}"> 
    <svg  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-up" class="svg-inline--fa fa-thumbs-up fa-w-16" role="img" viewBox="0 0 512 512"><path id="icon-${res.id}" fill="currentColor" d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"/></svg>
     </span>
    <span class="comment">Comment <button onclick="drop(event)" data-btn-comment="${res.id}" id="comment-drop"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="svg-inline--fa fa-caret-down fa-w-10" role="img" viewBox="0 0 320 512"><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/></svg></button></span>
    </div>
    
    
    
    <div class="all-comment"  id="display-comment-${res.id}" style="display:none;">
    <div id="body-content-${res.id}">
    
    </div>
    
    
    
    
    <div class="r-commment">
    <img src="../images/f.png">
    <form id="form" onsubmit="submitForm(event)" data-comment-post="${res.id}">
    <input autocomplete="off" type="text" name="" id="com${res.id}" placeholder="write a comment....">
    </form>
    </div>
    <!-- end of blog -->
    </div>
    </div>`
}

export{Post}   

export {Comments}