const form = document.querySelector("#login_form");
const list  =document.querySelector(".full_list");

for(let idx = 1; idx <= 3;  idx++ ){
    form.children[idx].classList.add("hide");
}

class Track{
 
    constructor(idx){
        this.currentValue = idx;
        this.arr = ["name", "email", "date", "password"];
    }

    next(){
      if(this.currentValue == 3) return; 
      this.currentValue++;
    }

    pre(){
        if(this.currentValue == 0) return;
        this.currentValue--;
    }
};

const tracker = new Track(0);

function addHideClass(idx){  
    for(let i = 0; i < 4; i++){
        if(idx == i){
            form.children[i].classList.remove("hide");
        }else{
            form.children[i].classList.add("hide");
        }
    }
};

function handleBack(){
    tracker.pre();
    addHideClass(tracker.currentValue);
    if(form.children[form.children.length-1].textContent !== "next"){
        form.children[form.children.length-1].textContent = "next";
    }
}

function createEel(type, textContent){
    const ele = document.createElement(type);
    if(textContent)
    ele.textContent = textContent
   return ele;
}

function showData(dateForm){
   form.classList.add("hide");
   const back_btn = document.querySelector(".back_btn");
   back_btn.classList.add("hide");
   const h1 = createEel("h1", "Success");
    list.appendChild(h1);
   for(let val of dateForm){
     const li  = createEel("li", `${val[0]}: ${val[1]}`);
     list.appendChild(li);
   }
};

function handleClick(e){
 e.preventDefault();
 const dateForm = new FormData(form);
 const arr = tracker.arr;
 const currentIdx = tracker.currentValue;
  if(dateForm.get(arr[currentIdx])){
    tracker.next();
    addHideClass(tracker.currentValue);
    }
   
    if(form.children[form.children.length-1].textContent === "submit"){
        for(let val of dateForm){
             if(!val[1]) {
                alert("plase fill data retry again.");
               return;
             }
        }
        showData(dateForm);
    }else if(tracker.currentValue == 3){
   form.children[form.children.length-1].textContent = "submit";   
  }
   
}

