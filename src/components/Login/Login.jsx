import React, { Component } from 'react';

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
    return (
      <React.Fragment>
        <h2>Login</h2>
        <div className="container">
          <div className="row">
            <div className="col">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    value={this.state.credentials.username}
                    onChange={this.handleChange}
                    autoFocus
                    type="text"
                    className="form-control"
                    id="username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    value={this.state.credentials.password}
                    onChange={this.handleChange}
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
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
