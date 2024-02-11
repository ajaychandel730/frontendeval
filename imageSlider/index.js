const img = document.querySelector(".photo");

function imageSliderInterval(time){
    let id;
   return (action)=>{
    if(action == "clear"){
        clearInterval(id);
        return;
    }

    id =  setInterval(()=>{
      img.src  = photos.slider();
    }, time);
   }
}

const  imageSlider = imageSliderInterval(1000);

function addEvents (){
const leftArrow = document.querySelector(".arrow_left");
const rightArrow = document.querySelector(".arrow_right");
let idLeftArrow;
let idRightArrow;
leftArrow.addEventListener("click", ()=>
{     
    clearTimeout(idLeftArrow);
     imageSlider("clear");
     img.src = photos.prePhoto();
     idLeftArrow =  setTimeout(imageSlider, 2000);
});

rightArrow.addEventListener("click", ()=>{
    clearTimeout(idRightArrow);
    imageSlider("clear");
    img.src = photos.nextPhoto();
   idRightArrow = setTimeout(imageSlider, 2000);
});
};


class PhotoGallery{
    constructor(){
    this.Allphotos = [];
    this.loading = false;
    this.#fetchAllPhotos();
    this.idx  = 0;
    this.length = 0;
    }

    async #fetchAllPhotos(){
        this.loading = true;
        const res = await fetch("https://www.reddit.com/r/aww/top/.json?t=all");
        const photos = await res.json();

        for(let val of  photos.data.children){
            let photoLink  = val.data.url_overridden_by_dest;
            if(photoLink.endsWith(".jpg")){
                this.Allphotos.push(photoLink);      
            }
        } 

        this.length = this.Allphotos.length;
        imageSlider();
        addEvents();
        this.loading = false;
    }; 
  
    prePhoto(){
        if(this.idx == 0){
              return this.Allphotos[this.idx];
        }

        return this.Allphotos[--this.idx];
    }
    
    nextPhoto(){
        if(this.idx == this.length-1){
              return this.Allphotos[this.idx];
        }

        return this.Allphotos[++this.idx];
    }

    slider(){
       if(this.idx == this.length-1){
            this.idx = 0;
            return this.Allphotos[this.length-1];
       }else{
         return this.Allphotos[this.idx++];
       }
    }
};

const photos =  new PhotoGallery();



