import config from "../config";

var getAuthKey = {
	authKey: ""
};

var utilityFunction = {
	GetAuthKey: function() {
		var auth = getAuthKey.authKey;
		console.log("utility function auth key ", auth);
		return auth;
	},
	GetAccessKey: function() {
		return config.AccessKey;
	},
	GetSecretKey: function() {
		return config.SecretKey;
	},
	GetErrorMessage: function(errorObj) {
		return errorObj.response
			? errorObj.response.data.ExceptionMessage
			: "There was an error processing the request";
	},
	GetConfiguredAuthKey: function() {
		return config.AuthKey;
	}
};

export { utilityFunction, getAuthKey };
