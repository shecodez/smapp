const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
	Query: {
		info: () => `This is the API of Student Manager`,
		courses: (root, args, context, info) => {
			return context.db.query.courses({}, info);
		},
		feed: (root, args, context, info) => {
			return context.db.query.links({}, info);
		}
	},
	Mutation: {
		post: (root, args, context, info) => {
			return context.db.mutation.createLink(
				{
					data: {
						url: args.url,
						description: args.description
					}
				},
				info
			);
		},

		createCourse: (root, args, context, info) => {
			return context.db.mutation.createCourse(
				{
					data: {
						name: args.name,
						description: args.description
					}
				},
				info
			);
		},
		updateCourse: (root, args, context, info) => {
			return context.db.mutation.updateCourse(
				{
					data: {
						name: args.name,
						description: args.description
					}
				},
				info
			);
		},
		deleteCourse: (root, args, context, info) => {
			return context.db.mutation.deleteCourse(
				{
					data: {
						id: args.id
					}
				},
				info
			);
		}
	}
};

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: req => ({
		...req,
		db: new Prisma({
			typeDefs: 'src/generated/prisma.graphql',
			endpoint:
				'https://us1.prisma.sh/public-glazebee-710/student-manager-api/dev',
			secret: 'mysecret123',
			debug: true
		})
	})
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
