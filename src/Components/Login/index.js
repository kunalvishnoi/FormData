import React, { Component } from 'react';
import superagent from 'superagent';
import {NavLink} from 'react-router-dom';
import {Card, Form, Button, Heading} from "../../Shared/styles.js"

class Login extends  Component {
  constructor() {
    super();
    this.state = {
      phone: '',
      password: '',
      error: ''
    }
  }
  handlephoneChanged(event) {
    this.setState({phone: event.target.value});
  }
   handlePasswordChanged(event) {
    this.setState({password: event.target.value});
  }
  submitForm(event) {
    event.preventDefault();
    const payload = {
      phone: this.state.phone,
      password: this.state.password
    }
    superagent
  .post("https://agile-dusk-86729.herokuapp.com/api/login")
      .set("Content-Type", "application/json")
      .send(payload)
      .then(res => {
        console.log(res);        
        localStorage.setItem("token", res.headers["x-auth"]);
        this.props.onSuccessfulLogin();
      })
      .catch(err => {
        this.setState({
          error: 'Authentication Failed'
        })
      });
  }

  render() {
    return (
        <Card>
   
          <Form 
            className="p-3"
            onSubmit={this.submitForm.bind(this)}
            >       
            <Heading>Sign In</Heading>
            <div className="input-group mb-4">
        <div className="input-group-prepend">
          <div className="input-group-text"><i className="material-icons">smartphone</i></div>
        </div>
        <input type="tel"
              max-length="10"
              className="form-control"
              value={this.state.phone}
              onChange={this.handlephoneChanged.bind(this)}
              placeholder="Phone"
              required
              />
      </div>            

            <div className="input-group mb-4">
        <div className="input-group-prepend">
          <div className="input-group-text"><i className="material-icons">explore</i></div>
        </div>
            <input type="password" 
              className="form-control" 
              value={this.state.password} 
              name="password"
              placeholder="Password"
              onChange={this.handlePasswordChanged.bind(this)}
              required
              />     
              </div>             
            <Button className="btn btn-lg btn-primary" type="submit">Sign In</Button>   
            <p className="text=center" style={{color: 'red'}}>{this.state.error}</p>
            <p className="text-center" style={{fontSize: '24px'}}>
          <NavLink to="/signup">Yet to Signup?</NavLink>
          </p>
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
        </Card>
      );
  }
}

export default Login;
