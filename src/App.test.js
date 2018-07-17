import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

describe('App component testing', () => {
  const wrapper = shallow(<App />);

  it('render initial states', () => {
    expect(wrapper.state().name).to.equal('');
    expect(wrapper.state().salary).to.equal('');
    expect(wrapper.state().rate).to.equal('');
    expect(wrapper.state().gross).to.equal(0);
    expect(wrapper.state().net).to.equal(0);
    expect(wrapper.state().tax).to.equal(0);
    expect(wrapper.state().superAmt).to.equal(0);
  });

  it('count of text inputs in app', () => {
    expect(wrapper.find('TextInput')).to.have.length(3);
  });

  it('check button existance, buttons parents', () => {
    expect(wrapper.find('.submit-button-style').parent().is('form')).to.equal(true);
    expect(wrapper.find('.submit-button-style').parents()).length(2);
    expect(wrapper.find('.submit-button-style').length).to.equal(1);
  });

  it('should return false if there is a validation error', () => {
    wrapper.instance().handleSubmit();
    expect(wrapper.instance().handleSubmit()).to.equal(false);
  });

  it('should return error if name is empty', () => {
    const expectedResponse = {
      name: 'Please enter name', salary: null, rate: null, selectedMonth: null,
    };

    wrapper.setState({
      name: '',
      errors: {
        name: null,
        salary: null,
        rate: null,
        selectedMonth: null,
      },
    });
    wrapper.instance().handleSubmit();
    expect(wrapper.state().errors).deep.equal(expectedResponse);
  });

  it('should return error if salary is empty', () => {
    const expectedResponse = {
      name: null, salary: 'Please provide salary', rate: null, selectedMonth: null,
    };

    wrapper.setState({
      name: 'manish',
      salary: '',
      errors: {
        name: null,
        salary: null,
        rate: null,
        selectedMonth: null,
      },
    });
    wrapper.instance().handleSubmit();
    expect(wrapper.state().errors).deep.equal(expectedResponse);
  });

  it('should return error if rate is empty', () => {
    const expectedResponse = {
      name: null, salary: null, rate: 'Please enter rate', selectedMonth: null,
    };

    wrapper.setState({
      name: 'manish',
      salary: '60050',
      rate: '',
      errors: {
        name: null,
        salary: null,
        rate: null,
        selectedMonth: null,
      },
    });
    wrapper.instance().handleSubmit();
    expect(wrapper.state().errors).deep.equal(expectedResponse);
  });
});
