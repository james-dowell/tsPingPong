import {shallow} from 'enzyme';
import * as React from 'react';
import RemoveGame from './RemoveGame';
import {merge} from 'lodash';
import {MOCK_GAME} from '../../../fixtures/game';
import * as sinon from 'sinon';

const expect: Chai.ExpectStatic = chai.expect;

describe('RemoveGameSpec', () => {

    let removeGameStub = sinon.stub();

    it('should call the removeGame method that is passed in on props when clicked', () => {
        let component = shallow(<RemoveGame removeGame={removeGameStub} />)
        component.simulate('click');
        expect(removeGameStub).to.have.been.calledOnce;
    });

});