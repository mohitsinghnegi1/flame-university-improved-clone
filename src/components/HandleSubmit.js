import formUtilityFunctions from "./UtilityFunctions";
function handleSubmit(props, e, stateUpdate) {
	e.preventDefault();
	console.log("inside ");
	var ref = document.forms["RegForm"];
	console.log("propeties :");
	console.log(props);
	var firstname = ref["firstname"].value;
	var lastname = ref["lastname"].value;
	var country = ref["country"].value;
	var state = ref["state"].value;
	var city = ref["city"].value;
	var othercity;
	if (city === "Other") {
		othercity = ref["othercity"].value;
	} else {
		othercity = "";
	}
	var countrycode = ref["countrycode"].value;
	var mobile = ref["mobile"].value;
	var campusIntrest = ref["campusinterest"].value;
	var programinterest = ref["programintrest"].value;
	var source = ref["source"].value;
	var email = ref["email"].value;
	var password = ref["password"].value;
	var repassword = ref["repassword"].value;
	console.log(
		firstname,
		lastname,
		country,
		state,
		city,
		othercity,
		countrycode,
		mobile,
		campusIntrest,
		programinterest,
		source,
		email,
		password,
		repassword
	);
	let reqBody =
		'{"LeadFields":[{"Attribute":"FirstName","Value":"' +
		firstname +
		'"},' +
		'{"Attribute":"LastName","Value":"' +
		lastname +
		'"},{"Attribute":"EmailAddress","Value":"' +
		email +
		'"}' +
		',{"Attribute":"Mobile","Value":"' +
		mobile +
		'"},{"Attribute":"mx_Country","Value":"' +
		country +
		'"},' +
		'{"Attribute":"mx_Program_interested_in","Value":"' +
		programinterest +
		'"},{"Attribute":"mx_Campus_Interested_In","Value":"' +
		campusIntrest +
		'"},' +
		'{"Attribute":"mx_Region","Value":"' +
		state +
		'"},{"Attribute":"mx_City_Name","Value":"' +
		city +
		'"},' +
		'{"Attribute":"mx_Other_City","Value":"' +
		othercity +
		'"},{"Attribute":"mx_How_did_you_hear_about_Botho_University","Value":"' +
		source +
		'"},' +
		'{"Attribute":"mx_Portal_Password","Value":"' +
		password +
		'"},{"Attribute":"mx_Portal_Confirm_Password","Value":"' +
		repassword +
		'"}]}';
	console.log(reqBody);
	formUtilityFunctions(props, reqBody, stateUpdate, ref);
}
//this form validation function that will show error on form
export default handleSubmit;
