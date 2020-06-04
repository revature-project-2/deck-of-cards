import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
//import { Dealer } from 'src/app/models/dealer';
import { BlackjackService } from 'src/app/services/blackjack.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})

export class BlackjackComponent implements OnInit {
  player: User;
  public playerCards: Card[] = [];
  public dealerCards: Card[] = [];
  @Input() dealer:boolean = false;

  //injecting the blackjack and authentication service
  constructor(public blackjackService: BlackjackService,
              private authentService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authentService.login(null, null).subscribe(
      resp => {
        this.player = resp;
      }
    );
    this.blackjackService.newGame().subscribe(
      resp => {
        console.log(resp.deck_id);
      }
    );
    this.dealerCards = this.blackjackService.dealer.dealerHand;
    this.playerCards = this.blackjackService.user.playerHand;
    console.log(this.dealerCards);
  }

  public deal(): void {
    this.blackjackService.startRound();
  }

  public hit(): void {
    this.blackjackService.hit();
  }

  public stay(): void {
    this.blackjackService.stand();
  }

  public reset(): void {
    //this.blackjackService.reset();
  }

  public save(): void {
    //this.blackjackService.save();
  }

}
