
const clock  = document.querySelector(".clock");
const hour  = document.querySelector(".hour");
const min  = document.querySelector(".min");
const sec  = document.querySelector(".sec");
const childern = clock.children;
for(let i = 0; i <  childern.length; i++){
    childern[i].style.transform = `rotate(${30 * (i+1)}deg)`;
    if((i+1) % 3 == 0){
        childern[i].children[0].style.backgroundColor = "green";
    }
}

setInterval(()=>{
  const date = new Date(); 
  const getMin = date.getMinutes();
  const getHour = date.getHours();
  const getSec = date.getSeconds();
  hour.style.transform = `rotate(${(getHour * 30) + (0.5 * getMin) }deg)`; 
  min.style.transform = `rotate(${6 * getMin}deg)`; 
  sec.style.transform = `rotate(${6 * getSec}deg)`; 
}, 1000);
