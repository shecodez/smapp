import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../constants';

class Header extends React.Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN);

		return (
			<div>
				<h2>
					<Link to="/">Student Manager</Link>
				</h2>
				<div>{authToken && <Link to="/create">create</Link>}</div>

				<div>
					{authToken ? (
						<button
							onClick={() => {
								localStorage.removeItem(AUTH_TOKEN);
								this.props.history.push(`/`);
							}}
						>
							logout
						</button>
					) : (
						<Link to="/login">login</Link>
					)}
				</div>
			</div>
		);
	}
}

export default withRouter(Header);
