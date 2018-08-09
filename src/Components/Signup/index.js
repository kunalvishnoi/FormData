import React, { Component } from 'react';
import superagent from 'superagent';
class Signup extends  Component {
  constructor() {
    super();
    this.state = {
      phone: '',
      password: '',
      name: '',
      email: ''
    }
  }
  handlephoneChanged(event) {
    this.setState({phone: event.target.value});
  }
   handlePasswordChanged(event) {
    this.setState({password: event.target.value});
  }
  handleemailChanged(event) {
    this.setState({email: event.target.value});
  }
  handlenameChanged(event) {
    this.setState({name: event.target.value});
  }
  submitForm(event) {
    event.preventDefault();
    const payload = {
      phone: this.state.phone,
      password: this.state.password,
      name: this.state.name,
      email: this.state.email
    }
    superagent
  .post("https://agile-dusk-86729.herokuapp.com/api/signup")
      .set("Content-Type", "application/json")
      .send(payload)
      .then(res => {
        console.log(res);        
        localStorage.setItem("token", res.headers["x-auth"]);
        this.props.onSuccessfulSignup();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div className="wrapper" style={{marginTop: '100px'}}>
          <form 
            className="form-signin"
            onSubmit={this.submitForm.bind(this)}
            >       
            <h2 className="form-signin-heading text-center">Signup</h2>
            <input type="text" name="name"
              className="form-control"
              value={this.state.name}
              onChange={this.handlenameChanged.bind(this)}
              placeholder="name"
              />
              <br/>
              <input type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleemailChanged.bind(this)}
              placeholder="email"
              />
              <br/>
            <input type="tel"
              className="form-control"
              value={this.state.phone}
              onChange={this.handlephoneChanged.bind(this)}
              placeholder="phone"
              />
              <br/>
            <input type="password" 
              className="form-control" 
              value={this.state.password} 
              name="password"
              placeholder="Password"
              onChange={this.handlePasswordChanged.bind(this)}
              />      
              <br/>
            <button className="btn btn-lg btn-primary" type="submit">Signup</button>   
          </form>
        </div>
      </div>
      );
  }
}

export default Signup;
