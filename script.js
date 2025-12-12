
let correctWord;


fetch("./vanlige_5bokstaver.txt")
  .then(res => {
    if (!res.ok) throw new Error("Kunne ikke hente filen");
    return res.text();
  })
  .then(text => {
    const words = text
      .split(/\r?\n/)
      .map(w => w.trim())
      .filter(w => w.length); 

    if (words.length === 0) {
      console.error("Ingen ord funnet i filen.");
      return;
    }

    const chosen = words[Math.floor(Math.random() * words.length)].toUpperCase();
    correctWord = chosen.split(""); // f.eks. ["A","B","B","O","R"]
    console.log("Valgt ord:", chosen, correctWord);
  })
  .catch(err => console.error("Feil ved lasting:", err));


let currentGuess = [];
let currentGuessNumber = 1;
let guess1 = [".word1button1", ".word1button2", ".word1button3", ".word1button4", ".word1button5"];
let guess2 = [".word2button1", ".word2button2", ".word2button3", ".word2button4", ".word2button5"];
let guess3 = [".word3button1", ".word3button2", ".word3button3", ".word3button4", ".word3button5"];
let guess4 = [".word4button1", ".word4button2", ".word4button3", ".word4button4", ".word4button5"];
let guess5 = [".word5button1", ".word5button2", ".word5button3", ".word5button4", ".word5button5"];
let guess6 = [".word6button1", ".word6button2", ".word6button3", ".word6button4", ".word6button5"];
let guess7 = [".word7button1", ".word7button2", ".word7button3", ".word7button4", ".word7button5"];
let guess8 = [".word8button1", ".word8button2", ".word8button3", ".word8button4", ".word8button5"];

let allGuesses = [guess1, guess2, guess3, guess4, guess5, guess6, guess7, guess8]

// for keyboard on website
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", (event) => {
        event.currentTarget.blur(); // To remove focus after clicking on a button, so that "Enter" on physical keyboard, does not re-press the button

        if (event.target.id === "enterButton") {
            enterIsPressed();
            return;
        } else if (event.target.id === "deleteButton") {       
            updateDisplay(true)
            currentGuess.pop()
            return
        } else if (currentGuess.length < 5) {
            if (event.target.tagName === "BUTTON") {
                currentGuess.push(event.target.textContent)
            }
        }
        updateDisplay(false) 
    }); 
}); 

// for keyboard on PC
document.addEventListener("keydown", () => {
    let validLetters = [
        "A","B","C","D","E","F","G","H","I","J","K","L","M",
        "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        "Æ", "Å", "Ø",
    ];

    if (event.key === "Enter") {
        enterIsPressed();
        return;
    } else if (event.key === "Backspace") {    
        updateDisplay(true)
        currentGuess.pop()
        return;
    } else if (currentGuess.length < 5) {
        if (validLetters.includes(event.key.toUpperCase())) {
            currentGuess.push(event.key.toUpperCase())
        }
    }
    updateDisplay(false)
})

function getPos() {
    // To check which row to use 
    let listToUse = allGuesses[currentGuessNumber - 1];
    // To check which cell to use 
    let cell = currentGuess.length-1

    return { listToUse, cell }
}

function newWord() {
    currentGuessNumber+=1
    currentGuess = []
}

function keyboardButton(letter, c) {

    keyboardElement = document.getElementById(letter)
    keyboardElement.style.backgroundColor = c;
}

function isCorrect() {

    console.log(currentGuess)

    let { listToUse } = getPos(); // Do not need cell as it has the same purpose as i (index)
    let color;
    let correctAmount = 0;
    let testWord = correctWord.slice();
    // The reason for using testWord is so that multiple letters do not trigger the same alarm
    // If the word is crane and you guess crann, both n's would be colored. testWord fixes that

    for (let i = 0; i < 5; i++) { // Every letter in currentGuess
        element = document.querySelector(listToUse[i])
        element.style.backgroundColor = "#3A3A3C"
        color = "#3A3A3C"
        correctAmount ++; // +1 for every green letter
        keyboardButton(currentGuess[i], color)
    };

    for (let i = 0; i < 5; i++) { // Every letter in currentGuess
        // Check for all green letters first and then remove them from the testWord 
        element = document.querySelector(listToUse[i])
        if (currentGuess[i] === correctWord[i]) { // If currentGuess letter is the same as testWord letter

            element.style.backgroundColor = "#538D4E"
            color = "#538D4E"
            keyboardButton(currentGuess[i], color)


            index = testWord.indexOf(currentGuess[i]) // This grabs the index of the letter
            testWord.splice(index, 1) // Remove the letter
        }
    };

    for (let i = 0; i < 5; i++) { // Every letter in currentGuess
        element = document.querySelector(listToUse[i]) 

        if (testWord.includes(currentGuess[i])) {// If the currentGuess letter can be found anywhere in testWord
            element.style.backgroundColor = "#B59F3B"
            color = "#B59F3B"
            keyboardButton(currentGuess[i], color)


            index = testWord.indexOf(currentGuess[i]) // This grabs the index of the letter
            testWord.splice(index, 1) // Remove the letter
        } 
    };

    if (correctAmount === 5) { // Means you win
        console.log("fisk")
    }
};

function updateDisplay(deleteIsPressed) { // deleteIsPressed is a bool, only true if Backspace was ever pressed
    let { listToUse, cell } = getPos();

    // Getting and adding the pressed button to the correct cell
    element = document.querySelector(listToUse[cell]) 
    element.textContent = currentGuess[cell]

    if (deleteIsPressed) { // Code above gives false / true depending on if Backspace is used
        element.textContent = "" // Override the textContent with a space 
    }
}

function enterIsPressed() {
    let { listToUse, cell } = getPos();
    
    if (currentGuess.length === 5) {
        element = document.querySelector(listToUse[cell]) 
        isCorrect()
        newWord()

    }
}


