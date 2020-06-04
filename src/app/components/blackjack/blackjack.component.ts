import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
//import { Dealer } from 'src/app/models/dealer';
import { BlackjackService } from 'src/app/services/blackjack.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})

export class BlackjackComponent implements OnInit {
  player: User;

  //injecting the blackjack and authentication service
  constructor(private blackjackService: BlackjackService,
              private authentService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authentService.login(null, null).subscribe(
      resp => {
        this.player = resp;
      }
    );
  }

  public deal(): void {
      //this.blackjackService.deal();
  }

  public hit(): void {
    //this.blackjackService.hit();
  }

  public stay(): void {
    //this.blackjackService.stay();
  }

  public reset(): void {
    //this.blackjackService.reset();
  }

  public save(): void {
    //this.blackjackService.save();
  }

}
