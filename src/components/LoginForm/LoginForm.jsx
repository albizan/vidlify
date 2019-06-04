import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/Form';

class LoginForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: '', password: '' },
      errors: {},
    };
  }

  // Define validation Schema with Joi apis
  schema = {
    username: Joi.string()
      .email()
      .min(5)
      .max(64)
      .required()
      .label('Username'),
    password: Joi.string()
      .min(5)
      .max(64)
      .required()
      .label('Password'),
  };

  doSubmit = () => {
    // Call the server
    console.log('Submitted');
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        {/* handleSubmit method is defined in the parent component */}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
