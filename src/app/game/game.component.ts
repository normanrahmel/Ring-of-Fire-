import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { DialogShareComponent } from '../dialog-share/dialog-share.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  //Speicher das Game Objekt in einer neuen Variable
  game!: Game;
  animal: any;
  name: any;
  gameId: string;
  gameOver: boolean = false;
  playedCardSound = new Audio('/assets/sounds/playedcard.mp3');

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //Erstellt neues Game
    this.newGame();
    console.log(this.game);

    //Wandelt die URL immer auf das Akteulle spiel ab
    this.route.params.subscribe((params: any) => {
      console.log(params.id);
      this.gameId = params.id;

      this.firestore
        .collection('Games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game Update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.stack = game.stack;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      //Hier definiere ich das immer der aktuelle Spieler an der Reihe ist
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;

      this.playedCardSound.play();
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('1.webp');
        this.saveGame();
      }
    });
  }

  saveGame() {
    this.firestore
      .collection('Games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }

  /**
   * calls a dialog to facilitate copying the url of the game
   */
  shareDialog(): void {
    this.dialog.open(DialogShareComponent);
  }

  editPlayer(playerId: number) {
    console.log('Edit Player', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      console.log('Chance Picture', change);

      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }
}
