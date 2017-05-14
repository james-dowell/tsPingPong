import * as React from 'react';
import {IGame, IPlayer} from '../../games';
import Indicator from '../Indicator/Indicator';

interface IGameProps {
    game: IGame;
}

type IGameStatus = 'draw' | 'playerA' | 'playerB';

export default class Game extends React.Component<IGameProps, {}> {

    constructor(props) {
        super(props)
    }

    public render() {

        const { game } = this.props;

        return (
            <div className="game">
                <div className="game__overview">
                    <div className="game__player-one">
                        <Indicator winner={this.isGameWinner(game, 'playerA')} />
                        <span className="game__player-name">{game.playerA.name}</span>
                        <span className="game__player-score">{game.playerA.score}</span>
                    </div>
                    <span>v</span>
                    <div className="game__player-two">
                        <Indicator winner={this.isGameWinner(game, 'playerB')} />
                        <span className="game__player-name">{game.playerB.name}</span>
                        <span className="game__player-score">{game.playerB.score}</span>
                    </div>
                </div>
                <div className="game__sets">
                    {game.sets.map((s, i) => (
                        <div key={i} className="set">
                            {s.scoreA} - {s.scoreB}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    private isGameWinner(game: IGame, player: string): boolean {
        return player === this.getGameWinner(game);
    }

    private getGameWinner({ playerA, playerB }: IGame): IGameStatus {

        if (playerA.score === playerB.score) {
            return 'draw';
        }

        return (playerA.score > playerB.score) ? 'playerA' : 'playerB';
    }

}