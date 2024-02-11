
const dragEle = document.querySelector(".drag");
var pos3 = 0 , pos4 = 0;

function dragElement(ele){
    ele.addEventListener("mousedown", dragmouseDown);
}

dragElement(dragEle);

function dragmouseDown(e){
 e.preventDefault();
 pos3 = e.clientX;
 pos4 = e.clientY;
 document.addEventListener("mousemove", moveElement);
 document.addEventListener("mouseup", dropElement);
}

function moveElement(e){
    e.preventDefault();
    const posAll = e.target.getBoundingClientRect()
   const pos1 = pos3 - e.clientX;
   const pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
   dragEle.style.top = (dragEle.offsetTop - pos2) + "px";
   dragEle.style.left = (dragEle.offsetLeft - pos1) + "px";
}

function dropElement(){
   document.removeEventListener("mousemove", moveElement);
   document.removeEventListener("mouseup", dropElement);
}