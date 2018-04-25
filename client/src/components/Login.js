import React from 'react';
import { AUTH_TOKEN } from './../constants';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends React.Component {
	state = {
		login: true, // switch between login and signup
		email: '',
		password: '',
		name: ''
	};

	_confirm = async () => {
		const { name, email, password } = this.state;
		if (this.state.login) {
			const result = await this.props.loginMutation({
				variables: {
					email,
					password
				}
			});
			const { token } = result.data.login;
			this._saveUserData(token);
		} else {
			const result = await this.props.signupMutation({
				variables: {
					name,
					email,
					password
				}
			});
			const { token } = result.data.signup;
			this._saveUserData(token);
		}
		this.props.history.push(`/`);
	};

	// Storing JWTs in localStorage is not a safe approach to implement authentication on the frontend.
	// https://www.rdegges.com/2018/please-stop-using-local-storage
	_saveUserData = token => {
		// TODO: create a user session using cookies
		localStorage.setItem(AUTH_TOKEN, token);
	};

	render() {
		return (
			<div>
				<h4>{this.state.login ? 'Login' : 'Sign Up'}</h4>
				{!this.state.login && (
					<input
						value={this.state.name}
						onChange={e => this.setState({ name: e.target.value })}
						type="text"
						placeholder="Your name"
					/>
				)}

				<input
					value={this.state.email}
					onChange={e => this.setState({ email: e.target.value })}
					type="text"
					placeholder="Your email address"
				/>

				<input
					value={this.state.password}
					onChange={e => this.setState({ password: e.target.value })}
					type="password"
					placeholder="Choose a safe password"
				/>
				<br />
				<button className="button" onClick={() => this._confirm()}>
					{this.state.login ? 'login' : 'create account'}
				</button>

				<button
					className="button"
					onClick={() => this.setState({ login: !this.state.login })}
				>
					{this.state.login
						? 'need to create an account?'
						: 'already have an account?'}
				</button>
			</div>
		);
	}
}

const SIGNUP_MUTATION = gql`
	mutation SignupMutation($email: String!, $password: String!, $name: String!) {
		signup(email: $email, password: $password, name: $name) {
			token
		}
	}
`;

const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;

export default compose(
	graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
	graphql(LOGIN_MUTATION, { name: 'loginMutation' })
)(Login);
