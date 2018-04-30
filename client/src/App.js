import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Login from './components/Login';
import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';
import Search from './components/Search';

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<div>
					<Switch>
						<Route exact path="/" render={() => <Redirect to="/new/1" />} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/create" component={CreateLink} />
						<Route exact path="/search" component={Search} />
						<Route exact path="/top" component={LinkList} />
						<Route exact path="/new/:page" component={LinkList} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
