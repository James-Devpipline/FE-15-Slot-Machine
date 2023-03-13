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

async function gambleLoop() {
  let gambleCheck = true;

  function gambleQuit() {
    console.log(`
    You currently have $${gambleFunds} to cash out!

    Goodbye!
    `);
    isGambling = !true;
  }

  async function slotMachine(inputAmount) {
    const workingSymbols = "7$$¢¢¢###¶¶¶";
    let workingString = ``;
    let animatedString = "";

    const animationTiming = (miliseconds) =>
      new Promise((res) => setTimeout(res, miliseconds));

    function gambleAnimation() {
      for (let i = 0; i < 10; i++) {
        for (let i = 0; i < 3; i++) {
          animatedString +=
            workingSymbols[Math.floor(Math.random() * workingSymbols.length)];
        }
        console.log(animatedString);
        animatedString = "";
        animationTiming(500);
        console.clear();
      }
    }

    await gambleAnimation();

    for (let i = 0; i < 3; i++) {
      workingString +=
        workingSymbols[Math.floor(Math.random() * workingSymbols.length)];
    }
    console.log(workingString);

    switch (workingString) {
      case "777":
        inputAmount *= 1000;
        console.log(`
          LUCKY SEVENS
  
          YOU HAVE WON $${inputAmount}
          `);
        gambleFunds += inputAmount;
        break;

      case "$$$":
        inputAmount *= 100;
        console.log(`
          MAKING BANK
  
          YOU HAVE WON $${inputAmount}
          `);
        gambleFunds += inputAmount;
        break;

      case "¢¢¢":
        inputAmount *= 10;
        console.log(`
          POCKET CHANGE
  
          YOU HAVE WON $${inputAmount}
          `);
        gambleFunds += inputAmount;
        break;

      case "ZZZ":
        inputAmount *= 2;
        console.log(`
          SLEEPY JOES
  
          YOU HAVE WON $${inputAmount}
          `);
        gambleFunds += inputAmount;
        break;
      default:
        gambleFunds -= inputAmount;
        console.log("Ahh Darn! Better luck next time!");
    }
  }

  while (gambleCheck) {
    if (gambleFunds <= 0) {
      console.log("You ran out of funds :( \nGoodbye!");
      alert("You ran out of funds :( \nGoodbye!");
      isGambling = !isGambling;
      gambleCheck = !gambleCheck;
    } else {
      let gambleAmount = prompt(`
      How much would you like to gamble?
      You currently have $${gambleFunds}
      Press Enter to gamble $20
      Enter $0 to quit
      `);

      if (gambleAmount) {
        if (parseInt(gambleAmount) === 0) {
          gambleCheck = !gambleCheck;
          gambleQuit();
        } else if (parseInt(gambleAmount) > gambleFunds) {
          console.log(`
              Inavlid amount.
              You do not have that much to gamble!
              `);
        } else if (parseInt(gambleAmount) < 0) {
          console.log(`
              ERROR: Cannot Gamble negative amount!
              `);
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
        slotMachine(20);
      }
    }
  }
}

while (isGambling) {
  gambleLoop();
}
