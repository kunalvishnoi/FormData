import React, { Component } from 'react';
import superagent from 'superagent';
import {NavLink} from 'react-router-dom';
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
        <div className="wrapper" style={{marginTop:'100px'}}>
          <form 
            className="form-signin"
            onSubmit={this.submitForm.bind(this)}
            >       
            <h2 className="form-signin-heading text-center">Login</h2>
             <input type="tel"
              max-length="10"
              className="form-control"
              value={this.state.phone}
              onChange={this.handlephoneChanged.bind(this)}
              placeholder="phone"
              required
              />
              <br/>
            <input type="password" 
              className="form-control" 
              value={this.state.password} 
              name="password"
              placeholder="Password"
              onChange={this.handlePasswordChanged.bind(this)}
              required
              />      
              <br/>
            <button className="btn btn-lg btn-primary" type="submit">Login</button>   
            <p className="text=center" style={{color: 'red'}}>{this.state.error}</p>
            <p className="text-center" style={{fontSize: '24px'}}>
          <NavLink to="/signup">Yet to Signup?</NavLink>
          </p>
          </form>
          <br/>
        </div>
      </div>
      );
  }
}

export default Login;
