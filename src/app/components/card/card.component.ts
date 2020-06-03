import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  image: string;
  altText: string;

  constructor() { }

  ngOnInit(): void {
    this.chooseImage();
  }

  chooseImage(){
    /*if (this.card.isFlipped === true)
    {
      this.image = this.card.image;
      this.image = this.card.value;
    } else
    {*/
      this.image = 'https://i.ibb.co/n8Rc4FM/card-back.png';
      this.altText = 'Card';
    //}
  }

}
