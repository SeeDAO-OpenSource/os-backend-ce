// 4XX status code related to client side error
// 5XX status code related to server side error

const getErrorStatus = require('../constant/ErrorData');

function findErrorMessage(status) {
	return getErrorStatus.ERROR_STATUS_ARRAY.find(v => v.status === status) || { error: 'There must be an error' };
}

const successResponse = (status, succMessage, data) => {
	return {
		status,
		message: succMessage,
		data
	};
};

const errorDataResponse = (status, errMessage, data) => {
	return {
		status,
		message: errMessage,
		data
	};
};

const errorResponse = (statusCode) => {
	return findErrorMessage(statusCode);
};


module.exports = {
	errorResponse,
	errorDataResponse,
	successResponse,
};