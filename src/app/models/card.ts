export class Card {
    image: string;
    value: string;
    numValue: number;
    suit: string;
    code: string;
    isFlipped: boolean;

    constructor(image: string, value: string, suit: string, code: string) {
        this.image = image;
        this.value = value;
        this.suit = suit;
        this.code = code;
    }
}
