import React from 'react';
import { AUTH_TOKEN } from './../constants';
import { timeDifferenceForDate } from './../utils';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Link extends React.Component {
	_voteForLink = async () => {
		const linkId = this.props.link.id;
		await this.props.voteMutation({
			variables: {
				linkId
			},
			update: (store, { data: { vote } }) => {
				this.props.updateStoreAfterVote(store, vote, linkId);
			}
		});
	};

	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN);

		return (
			<div className="link">
				<div className="float-left">
					<span className="grey">{this.props.index + 1}.</span>
					{authToken && (
						<div
							className="upvote-button grey"
							onClick={() => this._voteForLink()}
						>
							▲
						</div>
					)}
				</div>

				<div className="display-inb">
					<div className="link-text">
						{this.props.link.description} ({this.props.link.url})
					</div>

					<div className="grey">
						{this.props.link.votes.length} votes | by{' '}
						{this.props.link.postedBy
							? this.props.link.postedBy.name
							: 'Unknown'}{' '}
						{timeDifferenceForDate(this.props.link.createdAt)}
					</div>
				</div>
			</div>
		);
	}
}

const VOTE_MUTATION = gql`
	mutation VoteMutation($linkId: ID!) {
		vote(linkId: $linkId) {
			id
			link {
				votes {
					id
					user {
						id
					}
				}
			}
			user {
				id
			}
		}
	}
`;

export default graphql(VOTE_MUTATION, {
	name: 'voteMutation'
})(Link);
