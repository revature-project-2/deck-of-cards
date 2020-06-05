import {Component, Input, OnInit} from '@angular/core';
import {User} from 'src/app/models/user';
import {BlackjackService} from 'src/app/services/blackjack.service';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {Card} from 'src/app/models/card';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})

export class BlackjackComponent implements OnInit {
  player: User;
  public playerCards: Card[] = [];
  public dealerCards: Card[] = [];
  @Input() dealer = false;

  // injecting the blackjack and authentication service
  constructor(public blackjackService: BlackjackService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.player = this.authenticationService.currentUserValue;
    this.blackjackService.newGame().subscribe(
      resp => {
        console.log(resp.deck_id);
      }
    );
    this.dealerCards = this.blackjackService.dealer.hand;
    this.playerCards = this.blackjackService.user.hand;
    console.log(this.dealerCards);
  }

  public deal(): void {
    this.blackjackService.startRound();
    this.dealerCards = this.blackjackService.dealer.hand;
    this.playerCards = this.blackjackService.user.hand;
  }

  public hit(): void {
    this.blackjackService.hit();
    this.dealerCards = this.blackjackService.dealer.hand;
    this.playerCards = this.blackjackService.user.hand;
  }

  public stand(): void {
    this.blackjackService.stand();
    this.dealerCards = this.blackjackService.dealer.hand;
    this.playerCards = this.blackjackService.user.hand;
  }

  public reset(): void {
    this.playerCards = [];
    this.dealerCards = [];
    this.blackjackService.startRound();
    this.dealerCards = this.blackjackService.dealer.hand;
    this.playerCards = this.blackjackService.user.hand;
  }

  public save(): void {
    // this.blackjackService.save();
  }

}
