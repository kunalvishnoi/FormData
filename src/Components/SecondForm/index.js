import React, { Component } from "react";
import superagent from "superagent";
import { Redirect } from "react-router-dom";
import "../../App.css";

class SecondForm extends Component {
  constructor(props) {
    super(props);
    const state = {};
    props.formData.forEach((data, i) => {
      state[`${i}-index`] = data.index;
      state[`${i}-clause_no`] = data.clause_no;
      state[`${i}-action`] = data.action;
      state[`${i}-keep`] = data.keep;
      state[`${i}-reason`] = "";
    });
    this.state = state;
  }

  handleChange = event => {
    const elem = event.target;
    this.setState({
      [elem.name]: event.value
    });
  };
  submitForm = event => {
    event.preventDefault();
    const payload = {
      kunal: "hi"
    };
    superagent
      .post("http://35.185.80.55:8081/export")
      .set("Content-Type", "application/json")
      .send(payload)
      .then(res => {
        window.open(res.body.link);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  renderField = (fieldData, i) => {
    const indexName = `${i}-index`;
    const clauseName = `${i}-clause_no`;
    const action = `${i}-action`;
    const reason = `${i}-reason`;
    const keep = `${i}-keep`;

    return (
      <div className="container-fluid" key={i}>
        <div className="row pt-2">
          <div className="col-md-2">
            <input
              name={indexName}
              value={this.state[indexName]}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              name={clauseName}
              value={this.state[clauseName]}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              name={action}
              value={this.state[action]}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              name={reason}
              value={this.state[reason]}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              name={keep}
              value={this.state[keep]}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="wrapper">
        <form
          className="form-signin"
          onSubmit={this.submitForm}
          style={{ maxWidth: "1000px" }}
        >
          <h2>Form</h2>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <label>Index</label>
              </div>
              <div className="col-md-2">
                <label>Clause_No</label>
              </div>
              <div className="col-md-2">
                <label>Action</label>
              </div>
              <div className="col-md-2">
                <label>Reason</label>
              </div>
              <div className="col-md-2">
                <label>Keep</label>
              </div>
            </div>
          </div>
          {this.props.formData.map(this.renderField)}
          <div className="text-center">
            <button className="btn btn-primary mt-4" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SecondForm;
