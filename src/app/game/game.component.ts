import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  //Speicher das Game Objekt in einer neuen Variable
  game!: Game;

  constructor() {}

  ngOnInit(): void {
    this.game = new Game();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    this.pickCardAnimation = true;
  }
}
