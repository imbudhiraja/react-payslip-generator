import React, { PureComponent } from 'react';
import Picker from 'react-month-picker-input';
import WelcomeHeader from './WelcomeHeader';
import TextInput from './TextInput';

const nameRegex = /^[a-zA-Z]{2,25}$/;
const numberRegex = /^[0-9]+$/;

export default class App extends PureComponent {
  state = {
    name: '',
    salary: '',
    rate: '',
    gross: 0,
    net: 0,
    tax: 0,
    superAmt: 0,
    selectedMonth: '',
    validate: false,
    errors: {
      name: null,
      salary: null,
      rate: null,
      selectedMonth: null,
    },
  };


  validateFields = () => {
    const context = this;
    const {
      name, salary, rate, selectedMonth, errors,
    } = context.state;

    if (name.trim() === '') {
      context.setState({
        errors: {
          ...errors,
          name: 'Please enter name',
        },
      });
      return;
    }

    if (!nameRegex.test(name)) {
      context.setState({
        errors: {
          ...errors,
          name: 'Please enter valid name. Name must be in alphabets only and 2 characters long',
        },
      });
      return;
    }

    if (salary.trim() === '') {
      context.setState({
        errors: {
          ...errors,
          salary: 'Please provide salary',
        },
      });
      return;
    }

    if (!numberRegex.test(salary)) {
      context.setState({
        errors: {
          ...errors,
          salary: 'Please enter valid salary amount',
        },
      });
      return;
    }

    if (rate.trim() === '') {
      context.setState({
        errors: {
          ...errors,
          rate: 'Please enter rate',
        },
      });
      return;
    }

    if (!numberRegex.test(rate)) {
      context.setState({
        errors: {
          ...errors,
          rate: 'Please enter valid rate value',
        },
      });
      return;
    }

    if (selectedMonth.trim() === '') {
      context.setState({
        errors: {
          ...errors,
          selectedMonth: 'Please select month',
        },
      });
      return;
    }
    return true;
  }


  calculateValues = () => {
    const context = this;
    const {
      salary, rate,
    } = context.state;

    let taxable = 0;

    if (salary >= 18200 && salary <= 37000) {
      taxable += (salary - (18200)) * 0.19;
    } else if (salary >= 37001 && salary <= 87000) {
      taxable += (salary - 37000) * 0.325 + 3572;
    } else if (salary >= 87001 && salary <= 180000) {
      taxable += (salary - 87000) * 0.37 + 19822;
    } else if (salary > 180001) {
      taxable += (salary - 180000) * 0.45 + 54232;
    }

    const grossSalary = parseFloat(salary) / 12;
    const superAmount = grossSalary * (parseFloat(rate) / 100);
    const monthlytaxAmount = Math.round(taxable / 12);
    const netSalary = grossSalary - monthlytaxAmount;

    return {
      grossSalary,
      monthlytaxAmount,
      netSalary,
      superAmount,
    };
  }

  handleSubmit = () => {
    const context = this;

    if (!context.validateFields()) {
      return false;
    }

    const {
      grossSalary, monthlytaxAmount, netSalary, superAmount,
    } = context.calculateValues();


    context.setState({
      gross: Math.round(grossSalary),
      tax: monthlytaxAmount,
      net: Math.round(netSalary),
      superAmt: Math.round(superAmount),
      validate: true,
    });
  }

  render() {
    const context = this;
    const {
      name,
      salary,
      rate,
      selectedMonth,
      errors,
      validate,
      gross,
      net,
      tax,
      superAmt,
    } = context.state;


    return (
      <div className="app">
        <WelcomeHeader message="Payslip Generator" />
        <form>
          <TextInput
            title="Name"
            value={name}
            onChange={e => context.setState({
              name: e.target.value,
              errors: {
                ...errors,
                name: null,
              },
            })}
            maxLength={25}
            type="text"
            error={errors.name}
          />
          <TextInput
            title="Annual Income"
            type="number"
            value={salary}
            onChange={e => context.setState({
              salary: e.target.value,
              errors: {
                ...errors,
                salary: null,
              },
            })}
            maxLength={10}
            error={errors.salary}
          />
          <TextInput
            title="Super Rate:"
            type="number"
            value={rate}
            onChange={e => context.setState({
              rate: e.target.value,
              errors: {
                ...errors,
                rate: null,
              },
            })
            }
            maxLength={2}
            error={errors.rate}
          />
          <label>
            Select Month:
            <Picker
              value={new Date()}
              onChange={month => context.setState({
                selectedMonth: month,
                errors: {
                  ...errors,
                  selectedMonth: null,
                },
              })}
              year={2018}
              closeOnSelect
            />
            {
              errors.selectedMonth
              && (
                <span className="error-message">
                  {errors.selectedMonth}
                </span>
              )
            }
          </label>
          <button className="submit-button-style" type="button" onClick={context.handleSubmit}>
            Submit
          </button>
        </form>
        {
          validate
          && (
            <div>
              <label>
                Name:
                {name}
                <br />
                Gross Income:
                {gross}
                <br />
                Super Amount:
                {superAmt}
                <br />
                Tax Amount:
                {tax}
                <br />
                Net Income:
                {net}
                <br />
                Selected Month:
                {selectedMonth}
              </label>
            </div>)
        }
      </div>
    );
  }
}
