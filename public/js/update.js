


function Edit (){
    return`<div class="nav-post">
    <div class="container">
        <div class="list-nav flex">
        
        <div>
            <button class="go-back"><a href="http://127.0.0.1:5502/Final-project/admin/admin.html">go back to admin page</a></button>
          </div>

          <div>
            <button id="publish">Edit</button>
             </div>
        </div>
    </div>
</div>



<!-- <div id="editorjs"></div> -->

 <div class="edit-post">
    <div class="container">
        <div class="title">
            <input placeholder="Titel" id="title"></input>
             </div>


             <div class="image-post-edit">
                <div class="uplod">
                    <div class="header-uplod flex">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="image"
                        class="svg-inline--fa fa-image fa-w-16" role="img" viewBox="0 0 512 512">
                        <path fill="currentColor"
                            d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"
                            style="fill: #42485a"/>
                    </svg>
                        <span>imag</span>
                    </div>

                    <div>
                    <p>upioad an image file pick one from yur media library add ine with a URL</p>
                    </div>

                    <div>
                        <form id="uploadf" enctype="multipart/form-data" class="upload-form">
                        <input type="file" id="upload" name="upload">
                               
                                <input type="submit" id="sub" value="Submit">


                        <button class="insert-img">Insert from URL</button>
                     </form>
                    </div>



                </div>

                 <div id="show-image-edit">
                     <img id="img-edit">
                </div>
             </div>


            
                 <div class="text-post">
                     <div class="header-text-post">
                         <p>add your text here for blog post </p>

                     </div>
                    <div contenteditable="true"  id="text-post-content" placeholder="add text here">
                         <span placeholder="add text here ....." contenteditable="false" id="placeholder"></span>
                    </div>
                
                 </div>
        
     </div>
  

    
</div> 

`


}


    document.body.innerHTML=Edit();


//  module.exports={Render}
