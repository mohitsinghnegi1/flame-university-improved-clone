import React from "react";
import $ from "jquery";
import config from "./config";
import constants from "./constants/index";
import { emailRegex } from "./Regex";
function CanUserLogin(props, e, stateUpdate) {
	e.preventDefault();
	console.log("inside CanUserLogin function ");
	var ref = document.forms["login-content"];
	var email = ref["email1"].value;
	var password = ref["password1"].value;
	let data = {
		EmailAddress: email,
		Password: password
	};
	if (emailRegex.test(email)) {
		stateUpdate.changeState({
			LoginText: (
				<i className='fa fa-refresh fa-spin' style={{ fontSize: "14px" }} />
			),
			formErrors: {
				password1: "",
				email1: "",
				other: ""
			}
		});
		fetch(constants.PortalAPI.baseURL + constants.PortalAPI.endPoints.Signin, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Authorization: config.Authorization
			}
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json, "Can user login");
				if (json.hasOwnProperty("Status") && json.Status === "Error") {
					let er = json.ExceptionMessage;
					stateUpdate.changeState({
						LoginText: <i className='fa fa-arrow-right' />,
						formErrors: {
							password1: "",
							email1: "",
							other: er
						}
					});
					$("#email1").focus();
				} else if (json.hasOwnProperty("LeadId")) {
					console.log("login successful", json);
					stateUpdate.changeState({
						LoginText: <i className='fa fa-arrow-right' />,
						formErrors: {
							password1: "",
							email1: "",
							other: (
								<span style={{ color: "#fff" }}>
									Successfully login . Redirecting to home page...
								</span>
							)
						}
					});
					props.history.push({
						pathname: "/HomePage",
						search: "", // search: '?query=abc',
						state: { detail: json }
					});
				} else {
					stateUpdate.changeState({
						LoginText: <i className='fa fa-arrow-right' />,
						formErrors: {
							password1: "",
							email1: "",
							other: "Please Check your Internet Connection"
						}
					});
					$("#email1").focus();
				}
			})
			.catch(function(error) {
				stateUpdate.changeState({
					LoginText: <i className='fa fa-arrow-right' />,
					formErrors: {
						password1: "",
						email1: "",
						other: "Please Check your Internet Connection"
					}
				});
				$("#email1").focus();
				console.error(error);
			});
	} else {
		stateUpdate.changeState({
			LoginText: <i className='fa fa-arrow-right' />,
			formErrors: {
				password1: "",
				email1: "Invalid email address",
				other: ""
			}
		});
		$("#email1").focus();
	}
}
export default CanUserLogin;
