import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
						<Route exact path="/" component={LinkList} />
						<Route exact path="/create" component={CreateLink} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/search" component={Search} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
