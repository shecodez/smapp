function feed(parent, args, context, info) {
	return context.db.query.links({}, info);
}

function courses(parent, args, context, info) {
	return context.db.query.courses({}, info);
}

module.exports = {
	feed,
	courses
};
