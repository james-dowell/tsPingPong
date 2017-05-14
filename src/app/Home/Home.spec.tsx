import {shallow} from 'enzyme';
import * as React from 'react';
import Home from './Home';
import Game from '../../components/Game/Game';
import {IGame} from '../../games';
import {MOCK_GAME} from '../../../fixtures/game';
import RemoveGame from '../../components/RemoveGame/RemoveGame';
import AddGame from '../../components/AddGame/AddGame';

const expect: Chai.ExpectStatic = chai.expect;

describe('HomeSpec', () => {

    let component;

    beforeEach(() => {
        component = shallow(<Home games={[MOCK_GAME]} players={[]} />)
    });

    it('should put the games on state on initial render', () => {
        expect(component.state().games).to.deep.equal([MOCK_GAME]);
    });

    it('should render a game component for each game', () => {
        const GAMES = [{} as IGame, {} as IGame];
        component = shallow(<Home games={GAMES} players={[]} />);
        expect(component.find(Game)).to.have.lengthOf(2);
    });

    it('should pass a remove game method to the RemoveGame compoenent', () => {
        let removeGame = component.find(RemoveGame);
        expect(removeGame).to.have.lengthOf(1);
        expect(component.state().games).to.deep.equal([MOCK_GAME]);
        removeGame.at(0).props().removeGame();
        expect(component.state().games).to.deep.equal([]);
    });

    it('should render the AddGame component', () => {
        expect(component.find(AddGame)).to.have.lengthOf(1);
    });

    it('should pass a method to add a new empty game', () => {
        let addGame = component.find(AddGame).props().addGame;
        expect(component.state().games).to.deep.equal([MOCK_GAME]);

        addGame({ playerA: 'James', playerB: 'Steve'});
        expect(component.state().games[1]).to.deep.equal({
            playerA: {
                name: 'James',
                score: 0
            },
            playerB: {
                name: 'Steve',
                score: 0
            },
            sets: []
        });

    });

});