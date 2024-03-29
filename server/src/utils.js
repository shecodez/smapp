const jwt = require('jsonwebtoken');
// TODO: change to process.env.SMAPP_SECRET
const APP_SECRET = 'smapp-is-aw3some';

function getUserId(context) {
	const Authorization = context.request.get('Authorization');
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '');
		const { userId } = jwt.verify(token, APP_SECRET);
		return userId;
	}

	throw new Error('Not authenticated');
}

module.exports = {
	APP_SECRET,
	getUserId
};
