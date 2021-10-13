function Tran(){

    let productsRy = Array.from(document.querySelectorAll(".post-item"));


    productsRy.forEach((p,i)=>{
      p.style.top = i * (3 + 1) * 16 +"px";
      p.addEventListener("click",()=>{
      container.removeChild(p);
      productsRy = Array.from(document.querySelectorAll(".product"));
      productsRy.forEach((p1,i1)=>{p1.style.top = i1 * (3 + 1) * 16 +"px";})
    })
      
      
    })

}