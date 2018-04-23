const { GraphQLServer } = require('graphql-yoga');

let links = [
	{
		id: 'link-0',
		url: 'www.student-manager-app.com',
		description: 'A web app to manage studens, and keep track of their progress'
	}
];

let courses = [
	{
		id: 'course-0',
		name: 'MATH-1101',
		description: 'Introductory Mathematics'
	},
	{
		id: 'course-1',
		name: 'ENGL-1101',
		description: 'Introductory English'
	},
	{
		id: 'course-2',
		name: 'CSCI-1101',
		description: 'Introductory Computer Science'
	}
];

let idCount = courses.length;
const resolvers = {
	Query: {
		info: () => `This is the API of Student Manager`,
		courses: () => courses,
		feed: () => links
	},
	Mutation: {
		post: (root, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url
			};
			links.push(link);
			return link;
		},

		createCourse: (root, args) => {
			const course = {
				id: `course-${idCount++}`,
				name: args.name,
				description: args.description
			};
			courses.push(course);
			return course;
		},
		updateCourse: (root, args) => {
			const course = {
				id: args.id,
				name: args.name,
				description: args.description
			};
			courses.forEach(function(item, i) {
				if (item.id === args.id) {
					courses[i] = course;
					return course[i];
				}
			});
		},
		deleteCourse: (root, args) => {
			const courseId = args.id.split('-');
			const index = courseId.pop();
			if (index > -1) {
				courses.splice(index, 1);
				return 'Course successfully deleted!';
			}
		}
	}
};

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
