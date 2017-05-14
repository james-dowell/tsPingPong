import {shallow} from 'enzyme';
import * as React from 'react';
import {merge} from 'lodash';
import {MOCK_GAME} from '../../../fixtures/game';

import Game from './Game';
import Indicator from '../Indicator/Indicator';
import {IGame} from '../../games';

const expect: Chai.ExpectStatic = chai.expect;

describe('GameComponentSpec', () => {

    let component;

    beforeEach(() => {
        let mockGame: IGame = merge({}, MOCK_GAME);
        component = shallow(<Game game={mockGame} />)
    });

    it('should render the name for player A', () => {
        let name = component.find('.game__player-one .game__player-name');
        expect(name.text()).to.equal('Player A');
    });

    it('should render the score for player A', () => {
        let name = component.find('.game__player-one .game__player-score');
        expect(name.text()).to.equal('1');
    });

    it('should render name for player B', () => {
        let name = component.find('.game__player-two .game__player-name');
        expect(name.text()).to.equal('Player B');
    });

    it('should render the score for player B', () => {
        let name = component.find('.game__player-two .game__player-score');
        expect(name.text()).to.equal('0');
    });

    describe('rendering the indicator component', () => {

        it('should render an indicator component for each player', () => {
            let playerOne = component.find('.game__player-one');
            let playerTwo = component.find('.game__player-two');

            expect(playerOne.find(Indicator)).to.have.lengthOf(1);
            expect(playerTwo.find(Indicator)).to.have.lengthOf(1);
        });

        describe('where player one wins', () => {

            let playerAWins: IGame;

            beforeEach(() => {
                playerAWins = merge({}, MOCK_GAME, {
                    playerA: { score: 2 },
                    playerB: { score: 0 }
                });
                component = shallow(<Game game={playerAWins} />);
            });

            it('should pass a positive value prop for the winner', () => {
                let playerOne = component.find('.game__player-one');
                expect(playerOne.find(Indicator).props().winner).to.be.true;
            });

            it('should pass a negative value prop for the loser', () => {
                let playerTwo = component.find('.game__player-two');
                expect(playerTwo.find(Indicator).props().winner).to.be.false;
            });

        });

        describe('where player two wins', () => {

            let playerBWins: IGame;

            beforeEach(() => {
                playerBWins = merge({}, MOCK_GAME, {
                    playerA: { score: 2 },
                    playerB: { score: 4 }
                });
                component = shallow(<Game game={playerBWins} />);
            });

            it('should pass a positive value prop for the winner', () => {
                let playerOne = component.find('.game__player-one');
                expect(playerOne.find(Indicator).props().winner).to.be.false;
            });

            it('should pass a negative value prop for the loser', () => {
                let playerTwo = component.find('.game__player-two');
                expect(playerTwo.find(Indicator).props().winner).to.be.true;
            });

        });

        it('should not indicate a winner if the game was drawn', () => {
            let draw = merge({}, MOCK_GAME, {
                playerA: { score: 2 },
                playerB: { score: 2 }
            });
            component = shallow(<Game game={draw} />);

            let playerOne = component.find('.game__player-one');
            let playerTwo = component.find('.game__player-two');

            expect(playerOne.find(Indicator).props().winner).to.be.false;
            expect(playerTwo.find(Indicator).props().winner).to.be.false;
        });

    });

    describe('rendering the sets', () => {

        it('should render the set scores', () => {
            let setScore = merge({}, MOCK_GAME, {
                sets: [
                    { scoreA: 11, scoreB: 4 },
                    { scoreA: 11, scoreB: 6 }
                ]
            });
            component = shallow(<Game game={setScore} />);

            let sets = component.find('.game__sets');
            expect(sets.find('.set').at(0).text()).to.equal('11 - 4');
            expect(sets.find('.set').at(1).text()).to.equal('11 - 6');
        });

    });

});