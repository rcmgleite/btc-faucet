import React, {Component} from 'react'  

import Input from '../components/Input'  
import Button from '../components/Button'

class FormContainer extends Component {  
  constructor(props) {
    super(props)

    this.state = {
      addressTo: ''
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
      console.log(response) // TODO handle success
    }).catch(err => {
      console.log(err) // TODO handle error
    })
  }   

  render() {
    return (
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
            <Input inputType={'text'}
                   title= {'testcoin address'} 
                   name= {'addressTo'}
                   value={this.state.addressTo} 
                   placeholder = {'Enter your testcoin address'}
                   handleChange = {this.handleInput}
                   /> {/* Name of the user */}
          <Button 
              action = {this.handleFormSubmit}
              type = {'primary'} 
              title = {'Give me some coins!'} 
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
