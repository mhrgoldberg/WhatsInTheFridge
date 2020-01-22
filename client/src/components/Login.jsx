import React, { Component } from "react";
import { Mutation } from "react-apollo";
import mutations from "../graphql/mutations";
import { withRouter } from 'react-router-dom';

const { LOGIN_USER } = mutations;

class Login extends Component {
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
        isLoggedIn: data.login.loggedIn,
        currentUser: data.login._id
      }
    });
  }

  render() {
    return (
      <div>
        <Mutation
          mutation={LOGIN_USER}
          onCompleted={data => {
            const { token } = data.login;
            localStorage.setItem("auth-token", token);
            this.props.history.push("/");
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {loginUser => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  loginUser({
                    variables: {
                      username: this.state.username,
                      password: this.state.password
                    }
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
                <button type="submit">Log In</button>
              </form>
            </div>
          )}
        </Mutation>
        <br/>
        <Mutation
          mutation={LOGIN_USER}
          onCompleted={data => {
            const { token } = data.login;
            localStorage.setItem("auth-token", token);
            this.props.history.push("/");
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {loginUser => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  loginUser({
                    variables: {
                      username: "test",
                      password: "123456"
                    }
                  });
                }}
              >
                <input
                  type="hidden"
                  value="test"
                  onChange={this.update("username")}
                />
                <input
                  value="123456"
                  onChange={this.update("password")}
                  type="hidden"
                />
                <button type="submit">Demo</button>
              </form>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Login);