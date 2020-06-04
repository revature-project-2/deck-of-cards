import { User } from "./user";
import { GameType} from "./game-type"

export class Game {
    id: number;
    playerId: User;
    deckId: number;
    gameTypeId: GameType;
    score: number;
    amountWon: number;

    // constructor()
}
