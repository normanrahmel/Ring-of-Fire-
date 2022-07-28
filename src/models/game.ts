export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currenPlayer: number = 0;

  constructor() {
    for (let i = 0; i < 14; i++) {
      this.stack.push('spade_' + i);
      this.stack.push('hearts' + i);
      this.stack.push('diamonds' + i);
      this.stack.push('clubs' + i);
    }
    shuffle(this.stack);
  }
}

//Shuffles the array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
