import * as React from 'react';
import {clone} from 'lodash';

export interface IGameSubmission {
    playerA: string;
    playerB: string;
}

interface IAddGameProps {
    addGame(IGameSubmission): void;
    players: string[];
}

interface IAddGameState {
    playerA: string;
    playerB: string;
}

const INITIAL_STATE = {
    playerA: undefined,
    playerB: undefined
};

export default class AddGame extends React.Component<IAddGameProps, IAddGameState> {

    constructor(props) {
        super(props);

        this.state = clone(INITIAL_STATE);
    }

    public render() {

        const { players, addGame } = this.props;

        return (
            <div className="add-form">
                <select className="select" data-test-select-player-a onChange={e => this.selectPlayerA(e)}>
                    <option value="null">Select player</option>
                    {players.map((p, i) => (
                            <option key={i} value={p}>{p}</option>
                        )
                    )}
                </select>
                <span>VS</span>
                <select className="select" data-test-select-player-b onChange={e => this.selectPlayerB(e)}>
                    <option value="null">Select player</option>
                    {players.map((p, i) => (
                            <option key={i} value={p}>{p}</option>
                        )
                    )}
                </select>
                <button className="btn btn--block" onClick={this.submit.bind(this)}>
                    Add game
                </button>
            </div>
        );
    }

    private selectPlayerA(e: React.FormEvent): void {
        this.setState({
            playerA: (e.target as any).value,
            playerB: this.state.playerB
        });
    }

    private selectPlayerB(e: React.FormEvent): void {
        this.setState({
            playerA: this.state.playerA,
            playerB: (e.target as any).value
        });
    }

    private isFormValid(): boolean {
        return !!(this.state.playerA && this.state.playerB);
    }

    private submit(): void {
        if (!this.isFormValid()) {
            return;
        }

        this.props.addGame(this.state);
    }

}
