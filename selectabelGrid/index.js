const canvas = document.getElementById('myCanvas');
const container = document.querySelector(".container");
const body = document.querySelector("body");
const childArray = [];
function createEle(type, classes){
    const ele = document.createElement(type);
    if(classes)
     ele.className  = classes;
   return ele;
};

function createGridColsAndRows(){
     
    for(let i = 1; i <= 10; i++){
        const temp = [];
        for(let j = 1; j <= 10; j++){
             const newChild = createEle("div", "grid_box");
             temp.push(newChild);
             requestAnimationFrame(()=>{
                 container.appendChild(newChild);
             })
        }
        childArray.push(temp);
    }
};

function isMyInside(tarcorA, compareCor ){  // helper function of applySelectEffect
    if(!(tarcorA.left > compareCor.left)) return  false;
    if(!(tarcorA.top > compareCor.top)) return false;
    if(!(tarcorA.right < compareCor.right)) return false;
    if(!(tarcorA.bottom < compareCor.bottom)) return  false;
    return true;
 };

 function applySelectEffect(){  // helper function of mouseMoveing
    const canvasCordinates = canvas.getBoundingClientRect();
    
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            const eleCordinates = childArray[i][j].getBoundingClientRect();
            if(isMyInside(eleCordinates, canvasCordinates)){
               requestAnimationFrame(()=>{childArray[i][j].classList.add("highlight")});
            }else{
               requestAnimationFrame(()=>{childArray[i][j].classList.remove("highlight")});
            }
        }
    }
    
 }

function applyGridSelectEffect(){
    let startX = 0;
    let StartY = 0;
    function mouseMoveing(e){ // define mousemove event callback function
        canvas.style.width = `${e.clientX - startX}px`;
        canvas.style.height = `${e.clientY - StartY}px`;
        applySelectEffect();
    };

    window.addEventListener("mousedown", (e)=>{
        startX = e.clientX;
        StartY = e.clientY;
        canvas.style.top = `${StartY}px` ;
        canvas.style.left = `${startX}px`;
        canvas.classList.remove("hide");
        window.addEventListener("mousemove", mouseMoveing); // add mouse moveEvent
    });

    window.addEventListener("mouseup", ()=>{
        window.removeEventListener("mousemove", mouseMoveing); // removing mousemove event  
        canvas.style.width = "0px";
        canvas.style.height = "0px";
        canvas.classList.add("hide");
    })
 };

 
 
createGridColsAndRows();
applyGridSelectEffect();