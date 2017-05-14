import {shallow} from 'enzyme';
import * as React from 'react';
import AddGame from './AddGame';

const expect: Chai.ExpectStatic = chai.expect;

describe('AddGameSpec', () => {

    let component;
    let players: string[];
    let addGameStub;

    beforeEach(() => {
        addGameStub = sinon.stub();
        players = ['Kerge Kotzher', 'Emily M. Mills'];
        component = shallow(<AddGame addGame={addGameStub} players={players} />)
    });

    it('should set the empty player selections on state', () => {
        expect(component.state()).to.deep.equal({
            playerA: undefined,
            playerB: undefined
        });
    });

    describe('rendering a form', () => {

        it('should render a select box to pick playerA', () => {
            let playerASelect = component.find('[data-test-select-player-a]');
            expect(playerASelect).to.have.lengthOf(1);
        });

        it('should render a select box to pick playerB', () => {
            let playerBSelect = component.find('[data-test-select-player-b]');
            expect(playerBSelect).to.have.lengthOf(1);
        });

        it('should render a button to submit', () => {
            let submitButton = component.find('button');
            expect(submitButton).to.have.lengthOf(1);
        });

    });

    describe('submitting the form', () => {

        let submitButton;
        let playerASelect;
        let playerBSelect;

        beforeEach(() => {
            playerASelect = component.find('[data-test-select-player-a]');
            playerBSelect = component.find('[data-test-select-player-b]');
            playerASelect.simulate('change', { target: { value: players[0] } });
            playerBSelect.simulate('change', { target: { value: players[1] } });
            submitButton = component.find('button');
        });

        it('should call the addGame method on props when the submit button is clicked', () => {
            submitButton.simulate('click');
            expect(addGameStub).to.have.been.calledOnce
                .and.calledWith({
                    playerA: players[0],
                    playerB: players[1]
                });
        });

        it('should not call the submit method on props unless both names have been selected', () => {
            playerBSelect.simulate('change', { target: { value: null } });

            submitButton.simulate('click');
            expect(addGameStub).to.not.have.been.called;
        });

    });

});