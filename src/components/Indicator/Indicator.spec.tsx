import {shallow} from 'enzyme';
import * as React from 'react';
import Indicator from './Indicator';

const expect: Chai.ExpectStatic = chai.expect;

describe('IndicatorSpec', () => {

    it('should render an indicator component', () => {
        let component = shallow(<Indicator winner={false} />)
        expect(component.find('.indicator')).to.have.lengthOf(1);
    });

    it('should add the winner modifier if winner prop is true', () => {
        let component = shallow(<Indicator winner={true} />)
        expect(component.find('.indicator').hasClass('indicator--winner')).to.be.true;
    });

    it('should not have the winner modifier if winner prop if false', () => {
        let component = shallow(<Indicator winner={false} />)
        expect(component.find('.indicator').hasClass('indicator--winner')).to.be.false;
    });

});