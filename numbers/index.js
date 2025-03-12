const board = document.querySelector(".board");
let wrong = new Audio("wrong-buzzer-6268.mp3");
let correct = new Audio("the-correct-answer-33-183620.mp3");
let squareCount = 2;
let index = 1;
const createSquare=()=>{
    board.innerHTML = ""
    for(let a =1;a<=squareCount;a++){
        let square = document.createElement("div");
        square.classList.add("square");
        square.textContent= a.toString();
        let x=  Math.floor(Math.random()*board.clientWidth);
        let y =   Math.floor(Math.random()*board.clientHeight);
        square.style.left = x+"px";
        square.style.top = y+"px";
        board.appendChild(square);

    }

    let squares = document.querySelectorAll(".square");
    squares.forEach(item=>{
        item.style.pointerEvents = "all"
    })
    setTimeout(()=>{

        squares.forEach(item=>{
            item.style.color = "transparent";
            item.style.pointerEvents = "all"
        })
    },3000)
    squares.forEach(item=>{

        item.addEventListener("click",()=>{
            if(index===parseInt(item.textContent))
            {
                console.log("coreect")
                correct.play();

                correct.currentTime = 0
                item.style.background="green"
                item.style.color = "white"

                if(index===squareCount){
                    squareCount++
                    squares.forEach(square=>{
                        square.style.pointerEvents = "none"
                    })
                    setTimeout(()=>{
                        createSquare()
                        index=1;
                    },3000)
                }
                index++
                ///////////////
            }else {
                if(squareCount>2){
                    squareCount--;

                }
                wrong.play();
                currentTime = 0
                item.style.background="red"
                item.style.color = "white"
                squares.forEach(square=>{
                    square.style.pointerEvents = "none"
                })
                setTimeout(()=>{
                    createSquare()
                    index=1;
                },3000)
            }
        })
    })
}
createSquare()