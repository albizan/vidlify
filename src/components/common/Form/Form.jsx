import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from '../Input';
import Select from '../Select';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {},
    };

    this.validate = this.validate.bind(this);
    this.validateProperty = this.validateProperty.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Validate the entire form with joi
  validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  // Validate just the given input, inputs get destructured in name and value
  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  // This method gets called when the form submit button is clicked
  handleSubmit(e) {
    // This prevent the default behaviour of a submit action
    // This is used to avoid network roundtrips to fetch data from the server
    e.preventDefault();

    // Validate entire form and set errors in the state
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    // If errors object is truthy (errors found) do not call backend api
    if (errors) return;

    // Else, call backend api
    this.doSubmit();
  }

  // This method is called when something is inserted in a input field
  // currentTarget is the input field
  handleChange({ currentTarget: input }) {
    // get current errors object
    const errors = { ...this.state.errors };

    // validate just the input I am writing into, not the entire form
    const errorMessage = this.validateProperty(input);

    // If errors are found, populate the errors object dinamically
    if (errorMessage) errors[input.name] = errorMessage;
    // Else, remove the key dinamically, the key is the input name
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
