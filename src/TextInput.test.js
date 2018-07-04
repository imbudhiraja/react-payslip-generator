import React from 'react';
import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import TextInput from './TextInput';

configure({ adapter: new Adapter() });

describe('TextInput component testing', () => {
  const props = {
    title: 'Super Rate:',
    type: 'number',
    value: '',
    maxLength: 2,
    onChange: () => { },
    error: 'error',
  };
  const wrapper = mount(<TextInput {...props} />);

  it('check textinput component display name', () => {
    expect(wrapper.name()).to.equal('TextInput');
  });

  it('props passed to textinput', () => {
    expect(wrapper.props().error).to.equal('error');
    expect(wrapper.props().title).to.equal('Super Rate:');
    expect(wrapper.props().type).to.equal('number');
    expect(wrapper.props().value).to.equal('');
    expect(wrapper.props().maxLength).to.equal(2);
  });

  it('check values assigned to textInput', () => {
    expect(wrapper.find('.title').text()).to.equal('Super Rate:');
    expect(wrapper.find('.error-message').text()).to.equal('error');
    expect(wrapper.find('.textInput[type="number"]').length).to.equal(1);
    expect(wrapper.find('.textInput[maxLength=2]').length).to.equal(1);
    expect(wrapper.find('.textInput').text()).to.equal('');
  });
});
