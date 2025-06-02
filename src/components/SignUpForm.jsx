// Build this component as a Class to show the difference (may encounter this in the wild)
// However, React is moving towards the newer function based components these days.
import { Component } from "react";
import { signUp } from "../utilities/users-service";
// Import withRouter Higher Order Component (HOC) to get access to the navigate function:
import { withRouter } from "../utilities/withRouter";

class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: ''
    });
  };
  
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // We don't want to send 'error' or 'confirm' properties,
      // so make a copy of the state object and delete them:
      const formData = {...this.state};
      delete formData.confirm;
      delete formData.error;
      
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JWT
      const user = await signUp(formData);
      this.props.setUser(user);

      // Redirect to the home page after successful sign-up:
      this.props.navigate('/');
    } catch {
      this.setState({ error: 'Sign-up failed - try again.' });
    }
  };
  
  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm</label>
            <input className="form-control" type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit" disabled={disable}>Sign Up</button>
          </div>
        </form>
        <p className="mt-3 text-danger">&nbsp;{this.state.error}</p>
      </>
    );
  }  
}

const SignUpFormWithRouter = withRouter(SignUpForm);
export default SignUpFormWithRouter;
// Note: The withRouter HOC is used to inject the navigate function into the component's props.