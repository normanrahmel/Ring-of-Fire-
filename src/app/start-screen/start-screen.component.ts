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

  async newGame() {
    //StartGame
    let game = new Game();
    this.router.navigateByUrl('/game');
    //const coll: any = collection(this.firestore, 'games');
    //console.log('Generierte Id', coll);

    //let gameInfo = await addDoc(coll, { game: Game.toJson() });
    //console.log(gameInfo);

    //NEW
    /*try {
      this.firestore
        .collection('Games')
        .add(this.game.toJson())
        .then((gameInfo: any) => {
          console.log(gameInfo);
          this.router.navigateByUrl('/game/' + gameInfo.id);
        });
    } catch (error) {
      console.log(this.game.toJson(), error);
    }
    */
  }
}
