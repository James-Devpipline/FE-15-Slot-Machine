/* 
Due: Monday the 13th
Project: Slot Machine
- Rules can be whatever you want
- Symbols can be whatever you want (&, *, (, #, etc..)
- Must include some promise object
- Must include an async function that awaits a promise
- Starting balance, betting system, continue playing by choice, scoring system
- IDEA: Animate the console when you "pull the lever"
  - HINT: combination of console.log and console.clear()

  * & &
[ $ $ $ ] <-
  * ( *
*/

// first create functionality of slot machine
// second incorporate promises

let gambleFunds = 1000;
let isGambling = true;

function gambleLoop() {
  let gambleCheck = true;
  function gambleMenu() {
    console.log(`
    Hello! Welcome to the Slots
    Your starting amount for gambling funds is at $${gambleFunds}
    `);
  }
  function gambleQuit() {
    // console.log(`
    // You currently have $${gambleFunds} to check out!

    // Goodbye!
    // `);
    isGambling = !true;
  }

  while (gambleCheck) {
    let gambleAmount = prompt(`
      How much would you like to gamble?
      You currently have $${gambleFunds}
      Enter none to quit
      `);
    if (gambleAmount) {
      if (parseInt(gambleAmount) > gambleFunds) {
        console.log(`
            Inavlid amount.
            You do not have that much to gamble!
            `);
      } else if (parseInt(gambleAmount) < 0) {
        console.log(`
            ERROR: Cannot Gamble negative amount!
            `);
      } else if (parseInt(gambleAmount) == 0) {
        gambleCheck = !gambleCheck;
        gambleQuit();
      } else if (parseInt(gambleAmount) === gambleFunds) {
        console.log(`
          Going all in? You got it boss!
          `);
        slotMachine(gambleAmount);
        gambleCheck = !gambleCheck;
      } else if (parseInt(gambleAmount) < gambleFunds) {
        gambleCheck = !gambleCheck;
        slotMachine(gambleAmount);
      }
    } else {
      gambleCheck = !gambleCheck;
      gambleQuit();
    }
  }
}

function slotMachine(inputAmount) {
  workingSymbols = "7$¶Z";
  winningSymbols = ["777", "$$$", "¶¶¶", "¢¢¢"];
  workingString = ``;

  for (let i = 0; i < 3; i++) {
    workingString +=
      workingSymbols[Math.floor(Math.random() * workingSymbols.length)];
  }

  console.log(workingString);

  switch (workingString) {
    case "777":
      console.log(`
        LUCKY SEVENS

        YOU HAVE WON $10,000
        `);
      gambleFunds += 10000;
      break;

    case "$$$":
      console.log(`
        MAKING BANK

        YOU HAVE WON $1,000
        `);
      gambleFunds += 1000;
      break;

    case "¢¢¢":
      console.log(`
        POCKET CHANGE

        YOU HAVE WON $1
        `);
      gambleFunds++;
      break;

    case "ZZZ":
      console.log(`
        SLEEPY JOES

        YOU HAVE WON $100
        `);
      gambleFunds += 100;
      break;
    default:
      gambleFunds -= inputAmount;
      console.log("Ahh Darn! Better luck next time!");
  }
}

while (isGambling) {
  gambleLoop();
  alert(isGambling);
}
