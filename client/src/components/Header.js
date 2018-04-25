import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends React.Component {
	render() {
		return (
			<div>
				<h1>Student Manager</h1>
				<Link to="/">new</Link>
				<Link to="/create">submit</Link>
			</div>
		);
	}
}

export default withRouter(Header);
