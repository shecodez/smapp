const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
	const password = await bcrypt.hash(args.password, 10);

	const user = await context.db.mutation.createUser(
		{
			data: { ...args, password }
		},
		`{ id }`
	);

	const token = jwt.sign({ userId: user.id }, APP_SECRET);

	return {
		token,
		user
	};
}

async function login(parent, args, context, info) {
	const user = await context.db.query.user(
		{ where: { email: args.email } },
		` { id password } `
	);
	if (!user) {
		throw new Error('Invalid email or password');
	}

	const valid = await bcrypt.compare(args.password, user.password);
	if (!valid) {
		throw new Error('Invalid email or password');
	}

	const token = jwt.sign({ userId: user.id }, APP_SECRET);

	return {
		token,
		user
	};
}

function post(parent, args, context, info) {
	const userId = getUserId(context);
	return context.db.mutation.createLink(
		{
			data: {
				url: args.url,
				description: args.description,
				postedBy: { connect: { id: userId } }
			}
		},
		info
	);
}

function createCourse(parent, args, context, info) {
	const userId = getUserId(context);
	return context.db.mutation.createCourse(
		{
			data: {
				name: args.name,
				description: args.description
				//instructor: { connect: { id: args.id } }
			}
		},
		info
	);
	// createAudit(id, userId, 'NEW', 'Course');
}

function updateCourse(parent, args, context, info) {
	const userId = getUserId(context);
	return context.db.mutation.updateCourse(
		{
			data: {
				name: args.name,
				description: args.description
				//instructor: { connect: { id: args.id } }
			}
		},
		info
	);
	// createAudit(args.id, userId, 'EDIT', 'Course');
}

function deleteCourse(parent, args, context, info) {
	const userId = getUserId(context);
	return context.db.mutation.deleteCourse(
		{
			data: {
				id: args.id
			}
		},
		info
	);
	// createAudit(args.id, userId, 'DELETE', 'Course');
}

module.exports = {
	signup,
	login,
	post,
	createCourse
};
