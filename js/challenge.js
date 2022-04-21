


window.addEventListener('DOMContentLoaded', (event) => {
    script()
});


//the whole program runs out of a script function to make use of the DOMContentLoaded method above
function script(){
//constances for convienence
const ticker = document.querySelector('#counter')
const pauseButton = document.querySelector('#pause')


//interval must be global outside funciton toggle interval so it can be checked to toggle. plus, added the text content to resume and pause here.
let interval = false
function togglePause(){
if (interval) {clearInterval(interval); interval = false; pauseButton.textContent = 'resume' }
else  { interval = setInterval(counterHTML,1000,ticker,1); pauseButton.textContent = 'pause'}
}

//arg1 = html element, arg2 = numberical interval, returns html element with textContent incremented
function counterHTML(element, interval){
let integer = parseInt(element.textContent,10)
 element.textContent = (integer + interval)
 return element
}

function handleLike(){
     //create a const for current second
    const int = parseInt(ticker.textContent,10)
    
    //if a li with id of seconds-int exists,
    if ( document.querySelector(`#second-${int}`) ){
        //split like message to extract number of likes as 'num'
        let num = document.querySelector(`#second-${int}`).textContent.split(' ')
        //add 1 to it
         likeNum = (parseInt(num[3],10) + 1)
         //reset the message with new number of likes
         document.querySelector(`#second-${int}`).textContent = `${int} seconds has ${likeNum} likes`
    }
    //otherwise, just create a new html element
   else {
    //create new like message
     let newNum = 1
    const likeInstance = document.createElement('li')
    likeInstance.id = `second-${int}`
    likeInstance.textContent = `${int} seconds has ${newNum} likes`
    document.querySelector('.likes').appendChild(likeInstance)
    }

}

//handleComments must be passed an event to utilize the preventDefault()
function handleComments(event){
    //first supress default form behavior
    event.preventDefault()
    const words = document.querySelector('#comment-input').value
    const comment = document.createElement('li')
    comment.textContent = words
    document.querySelector('#list').appendChild(comment)
    //clear the comment bar
    document.querySelector('#comment-input').value = ''
}


//begin the time interval count on load
togglePause()

//like, plus and minus on click if interval is going, ie if program is not paused
document.querySelector('#minus').addEventListener('click',()=> {if (interval) {counterHTML(ticker,-1)}})
document.querySelector('#plus').addEventListener('click',()=> {if (interval) {counterHTML(ticker,1)}})
document.querySelector('#heart').addEventListener('click',()=> {if (interval) {handleLike()}})

//add pause button click event
pauseButton.addEventListener('click', togglePause)

//add the comment click event
document.querySelector('#comment-form').addEventListener('submit',(event)=>handleComments(event))

}
