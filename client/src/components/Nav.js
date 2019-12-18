import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import { ApolloConsumer } from "react-apollo";
import  { withRouter } from "react-router-dom";

import Modal from './Modal.js';
import Backdrop from './Backdrop.js';
import Login from './Login.js';
import Register from './Register.js';


const { IS_LOGGED_IN } = Queries;

class Nav extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    loggingIn: false
  };

  startLoginHandler = () => {
    this.setState({ loggingIn: true});
  }

  modalLoginHandler = () => {
    this.setState({ loggingIn: false})
  };

  modalCancelHandler = () => {
    this.setState({ loggingIn: false})
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                return (
                  <button
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem("auth-token");
                      client.writeData({ data: { isLoggedIn: false } });
                      this.props.history.push("/");
                    }}
                  >
                    Logout
                  </button>
                );
              } else {
                return (
                  <div>
                    <React.Fragment>
                      {this.state.loggingIn && <Backdrop />}
                      {this.state.loggingIn && <Modal title="Log In" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalLoginHandler} children={Login} submit="Log In">
                        <Login />
                      </Modal>}
                      <div className="modal-control">
                        <button className="btn" onClick={this.startLoginHandler}>Log In</button>
                      </div>
                    </React.Fragment>
                    <React.Fragment>
                      {this.state.loggingIn && <Backdrop />}
                      {this.state.loggingIn && <Modal title="Register" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalLoginHandler} children={Register} submit="Register">
                        <Register />
                      </Modal>}
                      <div className="modal-control">
                        <button className="btn" onClick={this.startLoginHandler}>Register</button>
                      </div>
                    </React.Fragment>
                  </div>
                );
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
};

export default withRouter(Nav);
