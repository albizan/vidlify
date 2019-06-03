import React, { Component } from 'react';

import Input from './Input';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: '',
        password: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const credentials = { ...this.state.credentials };
    credentials[event.currentTarget.id] = event.currentTarget.value;
    this.setState({ credentials });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    const { username, password } = this.state.credentials;
    return (
      <React.Fragment>
        <h2>Login</h2>
        <div className="container">
          <div className="row">
            <div className="col">
              <form onSubmit={this.handleSubmit}>
                <Input
                  name="username"
                  label="Username"
                  type="text"
                  value={username}
                  onChange={this.handleChange}
                />
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <button className="btn btn-primary" type="submit">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
