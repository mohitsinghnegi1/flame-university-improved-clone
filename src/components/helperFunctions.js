import config from "./config";
import constants from "./constants/index";
//some variables
const fieldValues = {
	country: null,
	state: null,
	city: null,
	countrycode: null,
	campusinterest: null,
	programinterest: null,
	source: null
};

export const fetchFieldData = () => {
	//Do something with the input'
	fetch(
		constants.LSQAPI.baseURL +
			constants.LSQAPI.endPoints.MetaData +
			"?accessKey=" +
			config.AccessKey +
			"&secretKey=" +
			config.AccessKey,
		{ method: "GET" }
	)
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			fieldValues.country = json[53].Options;
		})
		.catch(function(error) {
			console.error("failed to load data from the server max request exceeded");
		});
};

export const justAnAlert = () => {
	alert("hello");
};

//this is how we import
//import {doSomethingWithInput, justAnAlert} from './path/to/utils.js/file'

//this is how we use it
//<p>{doSomethingWithInput('hello')}</p>
