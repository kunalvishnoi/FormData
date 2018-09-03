import React, { Component } from "react";
import superagent from "superagent";
import { Redirect } from "react-router-dom";
import "../../App.css";
import {Card, Form, H3, H4} from "../../Shared/styles"

class SecondForm extends Component {
  constructor(props) {
    super(props);
    const state = {
    };
    props.formData.forEach((data, i) => {
      state[`${i}-index`] = data.index;
      state[`${i}-clause_no`] = data.clause_no;
      state[`${i}-action`] = data.action;
      state[`${i}-keep`] = data.keep;
      state[`${i}-reason`] = data.reason;
      state[`${i}-data`] = data.data;
        
    });
    props.updata.forEach((data, i) => {
      state[`${i}-up-index`] = data.index;
      state[`${i}-up-clause_no`] = data.clause_no;
      state[`${i}-up-action`] = data.action;
      state[`${i}-up-keep`] = data.keep;
      state[`${i}-up-reason`] = data.reason;
      state[`${i}-up-data`] = data.data;
    });
    this.state = state;
  }

  handleChange = event => {
    const elem = event.target;
    this.setState({
      [elem.name]: elem.value
    });
  };
  submitForm = event => {
    event.preventDefault();
    const payload = this.state;
    Object.keys(payload).forEach(key => {
      if (key.endsWith("index") || key.endsWith("keep")) {
        payload[key] = parseInt(payload[key]);
      }
    });
    console.log(payload);
    superagent
      .post("http://35.196.112.28:8081/export")
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
              readOnly="readonly"
              className="pl-2"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              name={clauseName}
              value={this.state[clauseName]}
              onChange={this.handleChange}
              readOnly="readonly"
              className="pl-2"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              name={action}
              value={this.state[action]}
              onChange={this.handleChange}
              className="pl-2"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              name={reason}
              value={this.state[reason]}
              onChange={this.handleChange}
              className="pl-2"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              name={keep}
              value={this.state[keep]}
              onChange={this.handleChange}
              className="pl-2"
              required
            />
          </div>
        </div>
      </div>
    );
  };


  renderField2 = (fieldData, i) => {
    const upindexName = `${i}-up-index`;
    const upclauseName = `${i}-up-clause_no`;
    const upaction = `${i}-up-action`;
    const upreason = `${i}-up-reason`;
    const upkeep = `${i}-up-keep`;

    return (
      <div className="container-fluid" key={i}>
        <div className="row pt-2">
          <div className="col-md-2">
            <input
              name={upindexName}
              value={this.state[upindexName]}
              onChange={this.handleChange}
              readOnly="readonly"
              className="pl-2"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              name={upclauseName}
              value={this.state[upclauseName]}
              onChange={this.handleChange}
              readOnly="readonly"
              className="pl-2"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              name={upaction}
              value={this.state[upaction]}
              onChange={this.handleChange}
              className="pl-2"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              name={upreason}
              value={this.state[upreason]}
              onChange={this.handleChange}
              className="pl-2"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              name={upkeep}
              value={this.state[upkeep]}
              onChange={this.handleChange}
              className="pl-2"
              required
            />
          </div>
        </div>
      </div>
    );
  };





  render() {
    return (
      <Card className="my-4" style={{ maxWidth: "1000px" }}>
        <Form
          style={{ maxWidth: "100%" }}
          onSubmit={this.submitForm}          
        >
          <H3 className="pt-3">Form</H3>
          <h3 className="text-center">Classified Clauses</h3>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 text-center">
                <label>Index</label>
              </div>
              <div className="col-md-2 text-center">
                <label>Clause_No</label>
              </div>
              <div className="col-md-2 text-center">
                <label>Action</label>
              </div>
              <div className="col-md-2 text-center">
                <label>Reason</label>
              </div>
              <div className="col-md-2 text-center">
                <label>Keep</label>
              </div>
            </div>
          </div>
          {this.props.formData.map(this.renderField)}
          <br/>
          <br/>
          <h3 className="text-center">Unclassified Clauses</h3>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 text-center">
                <label>Index</label>
              </div>
              <div className="col-md-2 text-center">
                <label>Clause_No</label>
              </div>
              <div className="col-md-2 text-center">
                <label>Action</label>
              </div>
              <div className="col-md-2 text-center">
                <label>Reason</label>
              </div>
              <div className="col-md-2 text-center">
                <label>Keep</label>
              </div>
            </div>
          </div>
          {this.props.updata.map(this.renderField2)}
          <div className="text-center">
            <button className="btn btn-primary mt-4" type="submit">
              Export
            </button>
          </div>
        </Form>
      </Card>
    );
  }
}

export default SecondForm;
