import React, {Component} from 'react'  

import Input from '../components/Input'  
import Button from '../components/Button'

class FormContainer extends Component {  
  constructor(props) {
    super(props)

    this.state = {
      addressTo: '',
      type: 'info',
      message: '',
      submitBtnDisabled: false,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(e) {
   let value = e.target.value
   this.setState(() => ({ addressTo:  value}))
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.setState({ type: 'info', message: 'processing...', submitBtnDisabled: true });
    let reqBody = {
      destinationAddress: this.state.addressTo
    }
    console.log(reqBody)

    // FIXME - hardcode address
    fetch('http://127.0.0.1:3000/sendbtc',{
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      console.log(response)
      if (response.status !== 200) {
        throw response
      }
      this.setState({ type: 'success', message: 'Transaction succeeded', submitBtnDisabled: false }, this.sendFormData);
    }).catch(err => {
      console.log(err)
      this.setState({ type: 'danger', message: 'Something went wrong...', submitBtnDisabled: false }, this.sendFormData);
    })
  }   

  render() {
    if (this.state.type && this.state.message) {
      var classString = 'alert alert-' + this.state.type;
      var status = <div id="status" className={classString} ref="status">
        {this.state.message}
      </div>;
    }
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <Input inputType={'text'}
          title= {'testcoin address'} 
          name= {'addressTo'}
          value={this.state.addressTo} 
          placeholder = {'Enter your testcoin address'}
          handleChange = {this.handleInput}
        /> {/* Name of the user */}
        {status}
        <Button 
          action = {this.handleFormSubmit}
          type = {'primary'} 
          title = {'Give me some coins!'} 
          disabled = {this.state.submitBtnDisabled}
          style={buttonStyle}
        /> { /*Submit */ }
      </form>
    )
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default FormContainer
