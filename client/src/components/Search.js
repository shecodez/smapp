import React from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Input } from 'semantic-ui-react';
import Link from './Link';

class Search extends React.Component {
	state = {
		filter: '',
		loading: false,
		links: [] // results
	};

	_executeSearch = async () => {
		const { filter } = this.state;
		this.setState({ loading: true });
		const result = await this.props.client.query({
			query: FEED_SEARCH_QUERY,
			variables: { filter }
		});
		const links = result.data.feed.links;
		this.setState({ loading: false, links });
	};

	render() {
		const { loading } = this.state;
		return (
			<div>
				<Input
					type="text"
					placeholder="Search..."
					onChange={e => this.setState({ filter: e.target.value })}
					action={
						<Button
							loading={loading}
							icon="search"
							onClick={() => this._executeSearch()}
						/>
					}
				/>

				{this.state.links.map((link, index) => (
					<Link key={link.id} link={link} index={index} />
				))}
			</div>
		);
	}
}

const FEED_SEARCH_QUERY = gql`
	query FeedSearchQuery($filter: String!) {
		feed(filter: $filter) {
			links {
				id
				url
				description
				createdAt
				postedBy {
					id
					name
				}
				votes {
					id
					user {
						id
					}
				}
			}
		}
	}
`;

export default withApollo(Search);
