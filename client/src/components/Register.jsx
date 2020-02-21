import React, { Component } from "react";
import { Mutation } from "react-apollo";
import mutations from "../graphql/mutations";
import { withRouter } from 'react-router-dom';

const { REGISTER_USER } = mutations;


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { 
        isLoggedIn: data.register.loggedIn,
        currentUser: data.register._id 
      }
    });
  }

  render() {
    let errors;
    let errorMessage; 
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                registerUser({
                  variables: {
                    username: this.state.username,
                    password: this.state.password
                  }
                }).catch(err => {
                  errorMessage = err.message.split(":");
                  errors = <p className="login-errors">{errorMessage[errorMessage.length - 1]}</p>;
                  console.log(err);
                });
              }}
            >
              <input
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Register</button>
            </form>
            {errors}
          </div>
        )}
      </Mutation>
    );
  }

}

export default withRouter(Register);