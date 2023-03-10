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

function slotMachine() {
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
      break;

    case "$$$":
      console.log(`
      MAKING BANK

      YOU HAVE WON $1,000
      `);
      break;

    case "¢¢¢":
      console.log(`
      POCKET CHANGE

      YOU HAVE WON $0.99
      `);
      break;

    case "ZZZ":
      console.log(`
      SLEEPY JOES

      YOU HAVE WON $100
      `);
      break;
    default:
      console.log(`
      Nothing, try again?
      `);
  }
}

console.log(slotMachine());
