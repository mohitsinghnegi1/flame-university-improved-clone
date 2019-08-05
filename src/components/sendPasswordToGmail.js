import React from "react";
import $ from "jquery";
import config from "./config";
import constants from "./constants/index";
function sendPasswordToGmail(props, e, states, email) {
	e.preventDefault();
	states.changeState({
		LoginText: (
			<i className='fa fa-refresh fa-spin' style={{ fontSize: "14px" }} />
		),
		formErrors: {
			email: "",
			other: ""
		}
	});
	var useremail = {
		UserName: email
	};

	fetch(
		constants.PortalAPI.baseURL + constants.PortalAPI.endPoints.ForgotPassword,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: config.Authorization
			},
			method: "POST",
			body: JSON.stringify(useremail)
		}
	)
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			if (json.hasOwnProperty("Status") & (json.Status === "Error")) {
				let er = json.ExceptionMessage;
				states.changeState({
					LoginText: <i className='fa fa-arrow-right' />,
					formErrors: {
						other: er
					}
				});
			} else {
				states.changeState({
					LoginText: <i className='fa fa-arrow-right' />,
					formErrors: {
						other: (
							<span style={{ color: "#fff" }}>
								kindly check your registered email for your password.
							</span>
						)
					}
				});
			}
		})
		.catch(function(error) {
			console.log("exception");
			states.changeState({
				LoginText: <i className='fa fa-arrow-right' />,
				formErrors: {
					other: "Please Check your Internet Connection"
				}
			});

			console.error(error);
		});

	$("#email1").focus();
}
export default sendPasswordToGmail;
