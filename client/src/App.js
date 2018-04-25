import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<div>
					<Switch>
						<Route exact path="/" component={LinkList} />
						<Route exact path="/create" component={CreateLink} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
