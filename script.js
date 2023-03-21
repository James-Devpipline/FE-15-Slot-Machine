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

const scores = {
  Wins: 0,
  Losses: 0,
};

async function gambleLoop() {
  let gambleAmount;

  async function setBetAmount() {
    if (gambleFunds <= 0) {
      console.log("You ran out of funds :( \nGoodbye!");
      alert("You ran out of funds :( \nGoodbye!");
      gambleQuit();
      return false;
    } else {
      gambleAmount = prompt(`
        How much would you like to gamble?
        You currently have $${gambleFunds}
        Press Enter to gamble $20
        Enter $0 to quit
        `);

      if (gambleAmount !== "" || gambleAmount !== undefined) {
        if (parseInt(gambleAmount) === 0) {
          gambleQuit();
          return false;
        } else if (parseInt(gambleAmount) > gambleFunds) {
          console.log(`
                Inavlid amount.
                You do not have that much to gamble!
                `);
          return false;
        } else if (parseInt(gambleAmount) < 0) {
          console.log(`
                ERROR: Cannot Gamble negative amount!
                `);
          return false;
        } else if (parseInt(gambleAmount) === gambleFunds) {
          console.log(`
              Going all in? You got it boss!
              `);
          return true;
        } else if (parseInt(gambleAmount) < gambleFunds) {
          return true;
        }
      } else if (gambleAmount === null) {
        alert("Later dude!");
        gambleQuit();
        return false;
      } else {
        gambleAmount = 20;
        return true;
      }
    }
  }

  function winnerTypes(winningString) {
    const winningStrings = ["777", "$$$", "¢¢¢", "ZZZ"];
    let betAmount = +gambleAmount;

    if (!winningStrings.includes(winningString)) {
      gambleFunds -= betAmount;
      return "OUCH!!! Better Luck Next time!!";
    }

    switch (winningString) {
      case "777":
        gambleFunds += betAmount;
        return `
        LUCKY SEVENS
        YOU HAVE WON $${betAmount}
        `;

      case "$$$":
        betAmount *= 100;
        gambleFunds += betAmount;

        return `
        MAKING BANK
        YOU HAVE WON $${betAmount}
        `;

      case "¢¢¢":
        betAmount *= 10;
        gambleFunds += betAmount;

        return `
        POCKET CHANGE
        YOU HAVE WON $${betAmount}
        `;

      default:
        betAmount *= 2;
        gambleFunds += betAmount;

        return `
        SLEEPY JOES
        YOU HAVE WON $${betAmount}
        `;
    }
  }

  async function slotMachine() {
    const workingSymbols = "7$$¢¢¢#####¶¶¶¶¶ZZZ";
    let selectedSymbols = "";

    for (let i = 0; i < 3; i++) {
      selectedSymbols +=
        workingSymbols[Math.floor(Math.random() * workingSymbols.length)];
    }

    alert(`
      ---> ${selectedSymbols[0]} | ${selectedSymbols[1]} | ${selectedSymbols[2]} <---`);

    return selectedSymbols;
  }

  function gambleQuit() {
    console.log(`
    You currently have $${gambleFunds} to cash out!
    You won ${scores.Wins} times
    You lost ${scores.Losses} times
    Goodbye!
    `);
    isGambling = false;
  }

  const isBetOk = await setBetAmount().then((bool) => bool);

  if (isBetOk !== false || isBetOk !== undefined) {
    await slotMachine()
      .then((roll) => {
        alert(winnerTypes(roll));
      })
      .catch((err) => console.error("Game Error: ", err));
  }
}

async function main() {
  while (isGambling) {
    await gambleLoop();
  }
}

main();
