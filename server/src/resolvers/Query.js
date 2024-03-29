async function feed(parent, args, context, info) {
	const where = args.filter
		? {
				OR: [
					{ url_contains: args.filter },
					{ description_contains: args.filter }
				]
			}
		: {};

	const queriedLinks = await context.db.query.links(
		{ where, skip: args.skip, first: args.first, orderBy: args.orderBy },
		`{ id }`
	);

	const countSelectionSet = `
	    {
	      aggregate {
	        count
	      }
	    }
	  `;
	const linksConnection = await context.db.query.linksConnection(
		{},
		countSelectionSet
	);

	return {
		count: linksConnection.aggregate.count,
		linkIds: queriedLinks.map(link => link.id)
	};
}

function courses(parent, args, context, info) {
	return context.db.query.courses({}, info);
}

module.exports = {
	feed,
	courses
};
