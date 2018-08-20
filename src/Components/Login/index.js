import React, { Component } from 'react';
import superagent from 'superagent';
import { NavLink } from 'react-router-dom';
import { LogInCard, Form, Button, H3, H4, styledH3 } from "../../Shared/styles.js"

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
      <div>
      <H4 className="text-white">Construct a Leasing Negotiation Table in less than 30 Seconds.</H4>
        <LogInCard>
          <Form 
            className="p-3"
            onSubmit={this.submitForm.bind(this)}
            >       
            <H3>Sign In</H3>
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
                  <stop offset="0" stopColor="#97ABFF"/>
                  <stop offset="1" stopColor="#123597"/>
                </linearGradient>
            </defs>
        </svg>                
        </LogInCard>
        <div className="row p-0 text-center text-white data-row">
          <div className="col-md-4">
          <img src="/assets/icon3.png" />
          <h5 class="my-4">Our Machine Learning Analysis, Your Leasing Contracts</h5>
          </div>
          <div className="col-md-4">
          <img src="/assets/icon2.png" />
          <h5 class="my-4">Review takes less than a minute</h5>
          </div>
          <div className="col-md-4">
          <img src="/assets/icon1.png" />
          <h5 class="my-4">Download a negotiation table</h5>
          </div>
        </div>
        </div>
      );
  }
}

export default Login;
