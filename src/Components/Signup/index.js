import React, { Component } from 'react';
import superagent from 'superagent';

import {LogInCard, Form, Button, Heading} from "../../Shared/styles.js"

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
        <LogInCard>
          <Form 
            className="p-3"
            onSubmit={this.submitForm.bind(this)}
            >       
            <Heading>Sign up</Heading>
            <div className="input-group mb-4">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1"><i className="material-icons">person</i></span>
  </div>
  <input type="text" name="name"
              className="form-control"
              value={this.state.name}
              onChange={this.handlenameChanged.bind(this)}
              placeholder="Name"
              />


</div>            

            <div className="input-group mb-4">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1"><i className="material-icons">email</i></span>
  </div>
              <input type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleemailChanged.bind(this)}
              placeholder="Email"
              />
              </div>       
            <div className="input-group mb-4">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1"><i className="material-icons">smartphone</i></span>
  </div>
            <input type="tel"
              className="form-control"
              value={this.state.phone}
              onChange={this.handlephoneChanged.bind(this)}
              placeholder="Phone"
              />
              </div>       
            <div className="input-group mb-4">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1"><i className="material-icons">explore</i></span>
  </div>
            <input type="password" 
              className="form-control" 
              value={this.state.password} 
              name="password"
              placeholder="Password"
              onChange={this.handlePasswordChanged.bind(this)}
              />     
              </div>     
            <Button className="btn btn-lg btn-primary" type="submit">Sign Up</Button>   
          </Form>
          <svg className="rocks" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon className="svg--sm" fill="red" points="0,0 30,100 65,21 90,100 100,75 100,100 0,100"/>
            <polygon className="svg--lg" fill="red" points="0,0 15,100 33,21 45,100 50,75 55,100 72,20 85,100 95,50 100,80 100,100 0,100" />
          </svg>    
          <svg className="gradient">
            <defs>
                <linearGradient id="grad">
                  <stop offset="0" stopColor="#CE9FFC"/>
                  <stop offset="1" stopColor="#7367F0"/>
                </linearGradient>
            </defs>
        </svg>              
        </LogInCard>
      );
  }
}

export default Signup;
