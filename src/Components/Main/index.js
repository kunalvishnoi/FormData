import React, { Component } from "react";
import superagent from "superagent";
import { Redirect } from "react-router-dom";
import SecondForm from "../SecondForm";
import LegalAction from "../LegalAction";

import { Card, Form, H3, H4 } from "../../Shared/styles";
import "../../App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      jurisdiction: "",
      representing: "",
      grammarclause: "",
      badlanguage: "",
      grammarreason: "",
      grammaraction: "",
      clausename: "",
      clausewant: "",
      clausedontwant: "",
      clausereason: "",
      clauseaction: "",
      file: "",
      success: "",
      failed: "",
      selectedFile: null,
      logout: "",
      upload: "Save",
      disabled: false,
      expand: false,
      export: "Export",
      nextform: [],
      upform: [],
      legal: true,
      legalData: []
    };
  }
  handleJuridisction = event => {
    this.setState({
      jurisdiction: event.target.value
    });
  };
  handleRepresenting = event => {
    this.setState({
      representing: event.target.value
    });
  };
  handleGrammarclause = event => {
    this.setState({
      grammarclause: event.target.value
    });
  };
  handleLanguage = event => {
    this.setState({
      badlanguage: event.target.value
    });
  };
  handleGrammarreason = event => {
    this.setState({
      grammarreason: event.target.value
    });
  };
  handleGrammaraction = event => {
    this.setState({
      grammaraction: event.target.value
    });
  };
  handleClausename = event => {
    this.setState({
      clausename: event.target.value
    });
  };
  handleClausewant = event => {
    this.setState({
      clausewant: event.target.value
    });
  };
  handleClausedontwant = event => {
    this.setState({
      clausedontwant: event.target.value
    });
  };
  handleClausreason = event => {
    this.setState({
      clausereason: event.target.value
    });
  };
  handleClauseaction = event => {
    this.setState({
      clauseaction: event.target.value
    });
  };
  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  handleaction1 = event => {
    this.setState({
      action1: event.target.value
    });
  };
  handlekeep1 = event => {
    this.setState({
      keep1: event.target.value
    });
  };
  handleaction2 = event => {
    this.setState({
      action2: event.target.value
    });
  };
  handlekeep2 = event => {
    this.setState({
      keep2: event.target.value
    });
  };
  handlereason2 = event => {
    this.setState({
      reason2: event.target.value
    });
  };
  handlereason1 = event => {
    this.setState({
      reason1: event.target.value
    });
  };
  submitForm = event => {
    event.preventDefault();
    this.setState({
      disabled: true,
      upload: "Saving"
    });
    let form = new FormData();
    form.append("jurisdiction", this.state.jurisdiction);
    form.append("representing", this.state.representing);
    form.append("grammarclause", this.state.grammarclause);
    form.append("badlanguage", this.state.badlanguage);
    form.append("grammarreason", this.state.grammarreason);
    form.append("grammaraction", this.state.grammaraction);
    form.append("clausename", this.state.clausename);
    form.append("clausewant", this.state.clausewant);
    form.append("clausedontwant", this.state.clausedontwant);
    form.append("clausereason", this.state.clausereason);
    form.append("clauseaction", this.state.clauseaction);
    form.append("selectedFile", this.state.selectedFile);
    form.append("email", localStorage.getItem("email"));

    console.log(form);
    superagent
      .post("http://35.196.112.28:8081/submit")
      .send(form)
      .then(res => {
        console.log(res);
        const next = res.body.link;
        const up =res.body.ulink;
        this.setState({
          nextform: next,
          expand: true,
          disabled: false,
          upload: "Saved",
          upform: up
        });
      })
      .catch(err => {
        console.log("err", err);
        this.setState({
          failed: "Update Failed",
          upload: "Save"
        });
      });
  };
  getAuthenticationToken() {
    return localStorage.getItem("token");
  }
  handleLogout() {
    localStorage.removeItem("token");
    this.setState({
      logout: "yes"
    });
  }
  eventHandler = () => {
    const payload = {
      email: localStorage.getItem("email")
    }
    console.log(payload);
    superagent
      .post("http://35.196.112.28:8081/legal")
      .send(payload)
      .then(res => {
        console.log(res);
        this.setState({
          legalData: res.body.link,
          legal:false
        })
        console.log(this.state.legalData)
      })
      .catch(err => {
        console.log("err", err);
      });

  }
  handleSuccess = () => {
    this.setState({
      legal: true
    })
  }
  isAuthenticated() {
    const token = localStorage.getItem("token");
    return token && token.length > 10;
  }
  render() {
    const isAlreadyAuthenticated = this.isAuthenticated();
    const isExpand = this.state.expand;
    const isLegal = this.state.legal;
    return (
      <div>
        {!isAlreadyAuthenticated ? (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        ) : (
          <div>
          <button className="btn btn-primary logout"
            onClick={this.eventHandler}
            >
            Legal Position
            </button>
            <button
              className="btn btn-danger logout"
              onClick={this.handleLogout.bind(this)}
            >
              Logout
            </button>
            {isLegal ? (
              <div>
            {!isExpand ? (
              <Card className="my-4">
                <Form onSubmit={this.submitForm} className="pt-4">
                  <H3>Details Upload</H3>
                  <H4>Form</H4>
                  <label>Jurisdiction</label>
                  <select
                    className="form-control"
                    value={this.state.jurisdiction}
                    onChange={this.handleJuridisction}
                  >
                    <option>AUS</option>
                    <option>US</option>
                    <option>UK</option>
                    <option>NZ</option>
                    <option>CAN</option>
                    <option>CNA</option>
                  </select>
                  <label>Representing</label>
                  <select
                    className="form-control"
                    value={this.state.representing}
                    onChange={this.handleRepresenting}
                  >
                    <option>Tenant</option>
                    <option>Landlord</option>
                  </select>
                  <H4>Grammar</H4>
                  <label>Clause Name(s)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.grammarclause}
                    onChange={this.handleGrammarclause}
                  />
                  <label>Bad Language</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.badlanguage}
                    onChange={this.handleLanguage}
                  />
                  <label>Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.grammarreason}
                    onChange={this.handleGrammarreason}
                  />
                  <label>Action</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.grammaraction}
                    onChange={this.handleGrammaraction}
                  />
                  <H4>Clauses</H4>
                  <label>Clause Name(s)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.clausename}
                    onChange={this.handleClausename}
                  />
                  <label>Clauses you want</label>
                  <input
                    type="text"
                    className="form-control"
                    name="clausewant"
                    value={this.state.clausewant}
                    onChange={this.handleClausewant}
                    multiple="multiple"
                  />
                  <label>Clauses you dont want</label>
                  <input
                    type="text"
                    className="form-control"
                    name="clausedontwant"
                    value={this.state.clausedontwant}
                    onChange={this.handleClausedontwant}
                  />
                  <label>Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.clausereason}
                    onChange={this.handleClausreason}
                  />
                  <label>Action</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    value={this.state.clauseaction}
                    onChange={this.handleClauseaction}
                  />
                  <span className="btn btn-success btn-file float-left">
                    Upload Document
                    <input
                      type="file"
                      className="form-control-file border"
                      onChange={this.fileChangedHandler}
                      id="upload"
                    />
                  </span>
                  <button
                    disabled={this.state.disabled}
                    className="btn btn-primary float-right"
                    type="submit"
                  >
                    {this.state.upload}
                  </button>
                </Form>
                <p className="text-center" style={{ color: "green" }}>
                  {this.state.success}
                </p>
                <p className="text-center" style={{ color: "red" }}>
                  {this.state.failed}
                </p>
              </Card>
            ) : (
              <SecondForm formData={this.state.nextform} updata={this.state.upform} />
            )}
            </div>
            ) : (
            <LegalAction formValue={this.state.legalData} onSuccessfull={this.handleSuccess}/>
            ) }
          </div>
        )}
      </div>
    );
  }
}

export default App;
