import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
//import { addDoc, collection } from 'firebase/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  game: any;
  constructor(private router: Router, private firestore: AngularFirestore) {}

  ngOnInit(): void {}
  startGameSound = new Audio('/assets/sounds/startgame.mp3');
  loadStackSound = new Audio('/assets/sounds/loadStack.mp3');

  newGame() {
    //StartGame
    let game = new Game();

    this.firestore
      .collection('Games')
      .add(game.toJson())
      .then((gameInfo: any) => {
        console.log(gameInfo);
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
    this.startGameSound.play();
    this.stackSoundPlayed();
  }

  stackSoundPlayed() {
    setTimeout(() => {
      this.loadStackSound.play();
    }, 1200);
  }
}
