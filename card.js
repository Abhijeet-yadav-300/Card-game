
var errors = 0;
var cardlist =[
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

var cardset;
var board =[];
var rows = 4;
var columns =5;


var card1Selected;
var card2Selected;

window.onload = function () {
    shuffleCards();
    startGame();

}

function shuffleCards() {
    cardset = cardlist.concat(cardlist); //two of each card 
    console.log(cardset);
    //shuffle
    for (let i = 0; i < cardset.length; i++) {
        let j = Math.floor(Math.random() * cardset.length); //get random index

        //swap
        let temp = cardset[i];
        cardset[i] = cardset[j];
        cardset[j] = temp;
    }
    console.log(cardset);
}

function startGame() {
    //arrange the biard 4x5
    for(let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardset.pop();
            row.push(cardImg); //js

            // <img id="0-0" class="card" src="water.jpg"> 
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card)
        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

function selectCard(){

    if (this.src.includes("back")) {
        if(!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0","1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c]+ ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0","1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c]+ ".jpg";
            setTimeout(update, 1000)
        }
    }
}

function update() {
    //if cards aren't the ame , flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
    card1Selected = null;
    card2Selected = null;
}
    
