const timeLeftDisplay= document.querySelector('#time-left')
const resultDisplay= document.querySelector('#result')
const startPauseButton= document.querySelector('#start-pause-button')
const squares= document.querySelectorAll('.grid div')
const reward = document.querySelector('#reward')
// [div,div,...] 배열로 저장된다.

const logsLeft= document.querySelectorAll('.log-left') //[배열]
const logsRight= document.querySelectorAll('.log-right')
const carsLeft= document.querySelectorAll('.car-left')
const carsRight= document.querySelectorAll('.car-right')

console.log(squares)
let currentIndex =76    //currentIndex는 0~79 좌표이다.
const width =9
let tempIndex
let timer1Id
let timer2Id
let timer3Id
let outcomeTimerId
let currentTime =10

function moveFrog(e){
  squares[currentIndex].classList.remove('frog')

  // tempIndex = currentIndex
  switch(e.key){
    case 'ArrowLeft': 
      if(currentIndex % width !==0) {currentIndex -=1}
      break
      // if(currentIndex % 9 ===0){break}
      // currentIndex -=1; break;
    case 'ArrowRight': 
      if(currentIndex % width !==8){currentIndex +=1}
      break    
    case 'ArrowUp': 
      if(currentIndex > 0){currentIndex -= width}
      break       
    case 'ArrowDown': 
      if(currentIndex < width*8){currentIndex += width}
      break 

      //참고//
      //if(currentIndex < width*8){currentIndex += width; break}
      // 이렇게 하면 전혀 달라진다.
      // swith의 case문마다 break가 있어야 되는데, 만약 case문 안에 있는 if문에 break가 들어가면, 전혀 다르게 작동한다. 다른 case도 또 살피게 된다. 그러다보면 예상치못한 에러가 나타난다.
      
  }  
  squares[currentIndex].classList.add('frog')
  // squares[tempIndex].classList.remove('frog') 
  // index.html에 class starting-block 에 추가로 frog class를 추가하고
  // moveFrog에서 remove('frog')로 시작하니, 필요없다.  
}

document.addEventListener('keyup', moveFrog)  // anykey


function moveEveryLeftLogs(){
  logsLeft.forEach(logLeft => moveLogLeft(logLeft))
}
function moveEveryRightLogs(){
  logsRight.forEach(logRight => moveLogRight(logRight))
}

function moveLogLeft(logLeft){
  switch(true) {   // 무조건 실행되는 조건
    case logLeft.classList.contains('l1') : 
      logLeft.classList.remove('l1')
      logLeft.classList.add('l2')
      break
    case logLeft.classList.contains('l2') : 
      logLeft.classList.remove('l2')
      logLeft.classList.add('l3')
      break
    case logLeft.classList.contains('l3') : 
      logLeft.classList.remove('l3')
      logLeft.classList.add('l4')
      break
    case logLeft.classList.contains('l4') : 
      logLeft.classList.remove('l4')
      logLeft.classList.add('l5')
      break
    case logLeft.classList.contains('l5') : 
      logLeft.classList.remove('l5')
      logLeft.classList.add('l1')
      break
  }
}
function moveLogRight(logRight){
  switch(true) {  
    case logRight.classList.contains('l1') : 
      logRight.classList.remove('l1')
      logRight.classList.add('l5')
      break
    case logRight.classList.contains('l2') : 
      logRight.classList.remove('l2')
      logRight.classList.add('l1')
      break
    case logRight.classList.contains('l3') : 
      logRight.classList.remove('l3')
      logRight.classList.add('l2')
      break
    case logRight.classList.contains('l4') : 
      logRight.classList.remove('l4')
      logRight.classList.add('l3')
      break
    case logRight.classList.contains('l5') : 
      logRight.classList.remove('l5')
      logRight.classList.add('l4')
      break
  }
}

function autoMoveCars(){
  currentTime--
  timeLeftDisplay.textContent = currentTime
  carsLeft.forEach(carLeft => moveCarLeft(carLeft))
  carsRight.forEach(carRight => moveCarRight(carRight)) 
}

function moveCarLeft(carLeft){
  switch(true) {   // 무조건 실행되는 조건
    case carLeft.classList.contains('c1') : 
      carLeft.classList.remove('c1')
      carLeft.classList.add('c2')
      break
    case carLeft.classList.contains('c2') : 
      carLeft.classList.remove('c2')
      carLeft.classList.add('c3')
      break
    case carLeft.classList.contains('c3') : 
      carLeft.classList.remove('c3')
      carLeft.classList.add('c1')
      break
  }
}
function moveCarRight(carRight){
  switch(true) {  
    case carRight.classList.contains('c1') : 
      carRight.classList.remove('c1')
      carRight.classList.add('c3')
      break
    case carRight.classList.contains('c2') : 
      carRight.classList.remove('c2')
      carRight.classList.add('c1')
      break
    case carRight.classList.contains('c3') : 
      carRight.classList.remove('c3')
      carRight.classList.add('c2')
      break
  }
}

function lose(){
  if(
    squares[currentIndex].classList.contains('c1') ||
    squares[currentIndex].classList.contains('l4') ||
    squares[currentIndex].classList.contains('l5') 
  ){
    resultDisplay.textContent = 'You Lose!'
    clearInterval(timer1Id); clearInterval(timer2Id);
    clearInterval(timer3Id);
    squares[currentIndex].classList.remove('frog')
    document.removeEventListener('keyup', moveFrog)
  }
}

function win(){
  if(squares[currentIndex].classList.contains('ending-block')){
    resultDisplay.textContent = 'You Win!'    
    clearInterval(timer1Id); 
    clearInterval(timer2Id);
    clearInterval(timer3Id);
    squares[currentIndex].classList.remove('frog')
    document.removeEventListener('keyup', moveFrog)
    if (currentTime >4){
      const rewardBtn = document.createElement('button')
      const rwdImg= document.createElement('img');
      document.body.appendChild(rwdImg);
        
      rewardBtn.addEventListener('click', ()=>{      
      rwdImg.setAttribute('src', 'reward.png')
    
      });   
      rewardBtn.innerText = "Meet your girl"
      reward.appendChild(rewardBtn)  
      clearInterval(outcomeTimerId)
      
    }
    
    
               
         
  }
  
}

function checkOutComes(){  // lose, win function이 항시 작동
  lose()          //해야 되는데, 그러려면 setInterval에 등록
  win()           //0.05초마다 감시한다.
}

startPauseButton.addEventListener('click', () => {
  if (timer1Id) {
      clearInterval(timer1Id);clearInterval(timer2Id);
      clearInterval(timer3Id)
      clearInterval(outcomeTimerId)
      outcomeTimerId = null
      timer1Id = null; timer2Id=null; timer3Id=null;
      document.removeEventListener('keyup', moveFrog)
  } else {
      timer1Id = setInterval(moveEveryLeftLogs, 1000)
      timer2Id = setInterval(moveEveryRightLogs,1500)
      timer3Id = setInterval(autoMoveCars, 1000)
      outcomeTimerId = setInterval(checkOutComes, 50)
      document.addEventListener('keyup', moveFrog)
  }
})

// 이것은 start 버튼으로 작동하게 만들었다.
// timer1Id = setInterval(moveEveryLeftLogs, 1000)
// timer2Id = setInterval(moveEveryRightLogs,1500)
// timer3Id = setInterval(autoMoveCars, 1000)
