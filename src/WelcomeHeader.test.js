import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import WelcomeHeader from './WelcomeHeader';

configure({ adapter: new Adapter() });

describe('WelcomeHeader component testing', () => {
  it('Renders WelcomeHeader Test', () => {
    const wrapper = mount(<WelcomeHeader message="Hi" />);

    expect(wrapper.props().message).to.equal('Hi');
    expect(wrapper.find('.header').text()).to.equal('Hi');
  });
});
