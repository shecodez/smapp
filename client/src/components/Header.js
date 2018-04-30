import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../constants';
import { Menu, Header as Heading, Button, Icon } from 'semantic-ui-react';

class Header extends React.Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN);

		return (
			<Menu pointing secondary>
				<Menu.Item>
					<Heading as="h3">
						<Link to="/">Student Manager</Link>
					</Heading>
				</Menu.Item>
				<Menu.Item>
					<Link to="/top">Top</Link>
				</Menu.Item>
				<Menu.Item>
					<Link to="/search">
						<Icon name="search" />
					</Link>
				</Menu.Item>
				<Menu.Item>{authToken && <Link to="/create">create</Link>}</Menu.Item>

				<Menu.Menu position="right">
					<Menu.Item>
						{authToken ? (
							<Button
								onClick={() => {
									localStorage.removeItem(AUTH_TOKEN);
									this.props.history.push(`/`);
								}}
							>
								logout
							</Button>
						) : (
							<Link to="/login">login</Link>
						)}
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
	}
}

export default withRouter(Header);
