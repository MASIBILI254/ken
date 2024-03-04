//getting elements from html.
let playertext=document.getElementById('PlayerText');
let btn=document.getElementById('btn');
//converting the elements into an array
let boxes=Array.from(document.getElementsByClassName('box'));
let winner=getComputedStyle(document.body).getPropertyValue(' --winning_box')
//intilizing variable x and o
let O_TEXT="O";
let X_TEXT="X";

let currentPlayer=X_TEXT;
let spaces=Array(9).fill(null)
//starting game method
function StartGame(){
    boxes.forEach(box=>box.addEventListener('click',boxclicked))
}
function boxclicked(e) {
    let id=e.target.id
    if (!spaces[id]) {
        spaces[id]=currentPlayer
        e.target.innerText=currentPlayer
        currentPlayer=currentPlayer==X_TEXT? O_TEXT:X_TEXT
        if (playerHasWon()!==false) {
            playertext=`${currentPlayer}has won`
           let winning_block=playerHasWon()
           winning_block.map(box=>boxes[box].style.backgroundColor=winner)
           return
        }
    }

}
const winningcombos=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [3,4,5],
    [6,7,8],
    [2,5,8]
]
function playerHasWon() {
    for (const condition of winningcombos) {
        let [a,b,c]=condition
        if (spaces[a]&& (spaces[a]==spaces[b]&& spaces[a]==spaces[c])) {
            return[a,b,c]
        }
    }
    return false
}
btn.addEventListener('click',restart)
function restart() {
    spaces.fill(null)
    boxes.forEach(box=>{box.innerText=''})
    box.style.backgroundColor=''
    playertext='Tic Tac Toe'
    currentPlayer=X_TEXT;
}
StartGame()
