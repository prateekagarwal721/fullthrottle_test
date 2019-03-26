import React, { Component } from 'react';
import './App.css';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      loan_amount: '',
      loan_duration:'',
      result:'',
      isLoaded:false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
    this.getResult = this.getResult.bind(this)
  }

  getResult(amount, duration){
    if(amount<=5000 && amount>=500 && duration>=10 && duration<=24)
    {
    fetch(`https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${duration}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result
          });
        },
        (error) => {
          console.log(error);
         alert(error.message);
        }
      )
    }
  }

  handleChange(event) {
    this.setState({loan_amount: event.target.value});
    this.getResult(event.target.value, this.state.loan_duration)
  }

  handleValuesChange(values) {
    console.log(values)
    this.setState({
      loan_amount: values,
    });
      
    this.getResult(values, this.state.loan_duration)
      
  }

  handleDurationChange(event){
    const duration = event.target.value
    this.setState({
      loan_duration:event.target.value
    })
    {duration >= 10 && duration <= 24 &&
    this.getResult(this.state.loan_amount, duration)
    }
  }


  render() {
    console.log('render')
    return (
      <div className="App">
        <header className="App-header">
          <div style={{marginTop:'10%'}}>
            <div style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
          <label>Enter Loan Amount</label>
                            <input id='loan_amount'
                              style={{width:'100px',height:'20px', marginLeft:'2%'}}
                              name='loan_amount'
                              type="number"
                              min="500"
                              max="5000"
                              value={this.state.loan_amount}
                              onChange={this.handleChange}
                              placeholder=""/>
          </div>
          
          <div style={{width:'50%',float:'right',margin:'4%'}}>
          <InputRange
            maxValue={5000}
            minValue={500}
            value={this.state.loan_amount}
            onChange={this.handleValuesChange.bind(this)} />
            </div>
            </div>
          <div>
          <label>Enter Loan Duration</label>
                            <input id='loan_duration'
                              style={{width:'100px',height:'20px', marginLeft:'2%'}}
                              name='loan_duration'
                              type="number"
                              min="10"
                              max="24"
                              value={this.state.loan_duration}
                              onChange={this.handleDurationChange}
                              placeholder=""/>
          </div>

          {this.state.isLoaded && this.state.result.interestRate &&
          <div style={{display:'flex',margin:'10%',justifyContent:'space-evenly'}}>
            <div>
            Interest Rate: {this.state.result.interestRate}
            </div>
            <div>
            Monthly Payment: ${this.state.result.monthlyPayment.amount}
            </div>
          </div>
          }
        </header>
      </div>
    );
  }
}

export default App;
