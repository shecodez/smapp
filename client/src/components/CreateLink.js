import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const POST_MUTATION = gql`
	mutation PostMutation($description: String!, $url: String!) {
		post(description: $description, url: $url) {
			id
			createdAt
			url
			description
		}
	}
`;

class CreateLink extends React.Component {
	state = {
		description: '',
		url: ''
	};

	_createLink = async () => {
		const { description, url } = this.state;
		await this.props.postMutation({
			variables: {
				description,
				url
			}
		});
		this.props.history.push('/');
	};

	render() {
		return (
			<div>
				<div className="">
					<input
						className=""
						value={this.state.description}
						onChange={e => this.setState({ description: e.target.value })}
						type="text"
						placeholder="A description for the link"
					/>
					<input
						className=""
						value={this.state.url}
						onChange={e => this.setState({ url: e.target.value })}
						type="text"
						placeholder="The URL for the link"
					/>
				</div>
				<button onClick={() => this._createLink()}>Submit</button>
			</div>
		);
	}
}

export default graphql(POST_MUTATION, { name: 'postMutation' })(CreateLink);
