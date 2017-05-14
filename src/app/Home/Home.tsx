import * as React from 'react';
import {merge} from 'lodash';
import {IGame} from '../../games';
import Game from '../../components/Game/Game';
import RemoveGame from '../../components/RemoveGame/RemoveGame';
import AddGame, {IGameSubmission} from '../../components/AddGame/AddGame';

interface IHomeProps {
    games: IGame[];
    players: string[];
}

interface IHomeState {
    games: IGame[];
}

const EMPTY_GAME = {
    playerA: {
        name: null,
        score: 0
    },
    playerB: {
        name: null,
        score: 0
    },
    sets: []
}

export default class Home extends React.Component<IHomeProps, IHomeState> {

    constructor(props) {
        super(props);

        this.state = {
            games: this.props.games
        }
    }

    public render() {
        return (
            <div className="constrain">
                <h1 className="h1">Ping Pong league</h1>
                <h2 className="h2 u-text-center">Latest games</h2>

                <ul className="game-list list-plain">
                    {
                        this.state.games.map((g, i)=> (
                            <li key={i} className="game-list__item">
                                <Game game={g} />
                                <RemoveGame removeGame={() => this.removeGameAtIndex(i)} />
                            </li>
                        ))
                    }
                </ul>

                <AddGame addGame={(players) => this.addGame(players)} players={this.props.players} />
            </div>
        )
    }

    private removeGameAtIndex(index: number) {
        const games = this.state.games.slice();
        games.splice(index, 1);

        this.setState({ games });
    }

    private addGame(players: IGameSubmission): void {
        const newState = merge({}, this.state);
        newState.games.push(merge({}, EMPTY_GAME, {
            playerA: { name: players.playerA },
            playerB: { name: players.playerB }
        }))
        this.setState(newState);
    }

}