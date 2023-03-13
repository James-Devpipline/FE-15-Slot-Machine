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

let scores = {
  Wins: 0,
  Losses: 0,
};

function gambleLoop() {
  let gambleCheck = true;

  function gambleQuit() {
    console.log(`
    You currently have $${gambleFunds} to cash out!

    You won ${scores.Wins} times
    You lost ${scores.Losses} times

    Goodbye!
    `);
    isGambling = !true;
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

function winnerTypes(winningString) {
  switch (winningString) {
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

    default:
      inputAmount *= 2;
      console.log(`
        SLEEPY JOES

        YOU HAVE WON $${inputAmount}
        `);
      gambleFunds += inputAmount;
  }
}

function slotMachine(inputAmount) {
  const workingSymbols = "7$$¢¢¢#####¶¶¶¶¶ZZZ";
  const winningStrings = ["777", "$$$", "¢¢¢", "ZZZ"];
  let workingString = ``;

  // for (let i = 0; i < 3; i++) {
  //   workingString +=
  //     workingSymbols[Math.floor(Math.random() * workingSymbols.length)];
  // }

  workingString = "777";
  console.log(workingString);

  function slotMachinePromise() {
    return new Promise((res, reject) => {
      if (winningStrings.includes(workingString)) {
        res(winnerTypes(workingString));
      } else {
        reject(console.log("Ahh Darn! Better luck next time!"));
      }
    });
  }

  slotMachinePromise()
    .then(() => {
      console.log("test");
      winnerTypes(workingString);
    })
    .then(() => {
      scores.Wins++;
    })
    .catch(() => {
      gambleFunds -= inputAmount;
      scores.Losses--;
    });
}

while (isGambling) {
  gambleLoop();
}
