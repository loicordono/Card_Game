const cardArray = [
  {
    name: "Giyu",
    img: "img/Giyu.jpg",
  },
  {
    name: "Gyomei",
    img: "img/Gyomei.jpg",
  },
  {
    name: "Inosuke",
    img: "img/Inosuke.jpg",
  },
  {
    name: "Kyojuro",
    img: "img/Kyojuro.jpg",
  },
  {
    name: "Mitsuri",
    img: "img/Mitsuri.jpg",
  },
  {
    name: "Muichiro",
    img: "img/Muichiro.jpg",
  },
  {
    name: "Nezuko",
    img: "img/Nezuko.jpg",
  },
  {
    name: "Obanai",
    img: "img/Obanai.jpg",
  },
  {
    name: "Sanemi",
    img: "img/Sanemi.jpg",
  },
  {
    name: "Shinobu",
    img: "img/Shinobu.jpg",
  },
  {
    name: "Tanjiro",
    img: "img/Tanjiro.jpg",
  },
  {
    name: "Tengen",
    img: "img/Tengen.jpg",
  },
  {
    name: "Zenitsu",
    img: "img/Zenitsu.jpg",
  },
  {
    name: "Giyu",
    img: "img/Giyu.jpg",
  },
  {
    name: "Gyomei",
    img: "img/Gyomei.jpg",
  },
  {
    name: "Inosuke",
    img: "img/Inosuke.jpg",
  },
  {
    name: "Kyojuro",
    img: "img/Kyojuro.jpg",
  },
  {
    name: "Mitsuri",
    img: "img/Mitsuri.jpg",
  },
  {
    name: "Muichiro",
    img: "img/Muichiro.jpg",
  },
  {
    name: "Nezuko",
    img: "img/Nezuko.jpg",
  },
  {
    name: "Obanai",
    img: "img/Obanai.jpg",
  },
  {
    name: "Sanemi",
    img: "img/Sanemi.jpg",
  },
  {
    name: "Shinobu",
    img: "img/Shinobu.jpg",
  },
  {
    name: "Tanjiro",
    img: "img/Tanjiro.jpg",
  },
  {
    name: "Tengen",
    img: "img/Tengen.jpg",
  },
  {
    name: "Zenitsu",
    img: "img/Zenitsu.jpg",
  },
];

// console.log(cardArray);

cardArray.sort(() => 0.5 - Math.random());

// console.log(cardArray);

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
const winImage = document.getElementById("testTanji");
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
  for (let i = 0; i < 26; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "img/blank.jpg");
    card.setAttribute("data-id", i);
    card.setAttribute("class", "imgcards");
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
    // console.log(card, i);
  }
}

createBoard();

// function disableWin() {
//   winImage.style.visibility = "visible";
// }

var defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
};

function checkMatch() {
  console.log("check for a match");
  const cards = document.querySelectorAll(".imgcards");
  const firstCardId = cardsChosenIds[0];
  const secondCardId = cardsChosenIds[1];
  if (cardsChosen[0] == cardsChosen[1] && firstCardId != secondCardId) {
    // alert("You found a match!");
    // disableWin();
    cards[firstCardId].style.visibility = "hidden";
    cards[secondCardId].style.visibility = "hidden";
    cards[firstCardId].removeEventListener("click", flipCard);
    cards[secondCardId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star']
      });
    
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle']
      });
    }
    
    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  } else {
    cards[firstCardId].setAttribute("src", "img/blank.jpg");
    cards[secondCardId].setAttribute("src", "img/blank.jpg");
    cards[firstCardId].style.transform = "rotateY(0deg)";
    cards[secondCardId].style.transform = "rotateY(0deg)";
    console.log("is not a pair");
  }
  resultDisplay.textContent = "Score : " + cardsWon.length + "/13";
  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.textContent = "Congratulation !";
  }
}

function flipCard() {
  if (cardsChosen.length < 2) {
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    console.log("Clicked", cardId);
    console.log(cardsChosen);
    console.log(cardsChosenIds);
    this.style.transform = "rotateY(360deg)";
    this.setAttribute("src", cardArray[cardId].img);

    if (cardsChosen.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function startCountdown(duration) {
  const countdownDisplay = document.getElementById("countdown");

  let timer = duration;
  let minutes, seconds;

  const intervalId = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    countdownDisplay.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(intervalId);
      countdownDisplay.textContent = "00:00"; // Le compte à rebours est terminé
      location.reload();
    }
    if (cardsWon.length == cardArray.length / 2) {
      countdownDisplay.textContent = "00:00";
    }
  }, 1000);
}

// Appelez la fonction pour démarrer le compte à rebours de 2 minutes
startCountdown(120);
