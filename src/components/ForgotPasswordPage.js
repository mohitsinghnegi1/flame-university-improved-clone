import React from "react";
import logo from "../images/logo.PNG";
import "./style.css";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import { emailRegex } from "./Regex";
import sendPasswordToGmail from "./sendPasswordToGmail";

class ForgotPasswordPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			LoginText: <i className='fa fa-arrow-right ' />,
			formErrors: {
				email: "",
				other: ""
			}
		};
		this.changeState = this.changeState.bind(this);
	}
	varifySendPassword = (e) => {
		e.preventDefault();

		$("#email1").prop("disabled", true);
		var email = $("#email1").val();
		if (email === "") {
			this.setState({ formErrors: { email: "required" } });
		} else {
			emailRegex.test(email)
				? sendPasswordToGmail(
						this.props,
						e,
						{
							changeState: this.changeState
						},
						email
				  )
				: this.setState({ formErrors: { email: "Invalid Email Adress" } });
			$("#email1").focus();
		}

		$("#email1").val("");

		$("#email1").prop("disabled", false);
		$("#email1").focus();
	};

	changeState(stateInfo) {
		console.log("value changed");
		console.log(stateInfo);

		this.setState(stateInfo);
		console.log(this.state);
	}
	render() {
		return (
			<div className='container  mt-5 mb-5'>
				<div className='row w-75 Header pl-0'>
					<div className=' col-lg-4 pl-0 grey-background overflow-hidden '>
						<img src={logo} className='ml-0 mt-sm-3' alt='FLAME_UNIVERSITY' />
					</div>
					<div className=' col-lg-8 p-4'>
						<div className=' text-left mb-2 blue1 '>FORGOT PASSWORD</div>
						<div className='errorMessage text-left mt-2 '>
							{this.state.formErrors.other}
							<span style={{ visibility: "hidden" }}>.</span>
						</div>

						<div className='row '>
							<div className='form-group col-11 col-lg-6 col pr-0 d-block '>
								<input
									id='email1'
									noValidate
									autoComplete='off'
									name='email1'
									type='email'
									placeholder='Email'
									className='form-control validate  email'
								/>
								<span className='errorMessage float-left  mb-2'>
									{this.state.formErrors.email}
									<span style={{ visibility: "hidden" }}>.</span>
								</span>
							</div>
							<div className='form-group col-11 col-lg-2 row pb-0 mb-0  d-block '>
								<button
									type='submit'
									id='submitarrowButton'
									onClick={this.varifySendPassword}
									className=' form-control forward-button submitarrowButton    cursor-pointer align-self-center justify-content-center mb-0 ml-3   '
								>
									{this.state.LoginText}
								</button>
							</div>
							<div className='col-lg-1' />
							<div className='form-group col-11 col-lg-2 row pb-0 mb-0  d-block '>
								<button
									type='submit'
									id='submitarrowButton'
									className=' form-control forward-button submitarrowButton   cursor-pointer align-self-center justify-content-center mb-0 ml-3 pb-2 pt-1'
								>
									<Link
										to='/'
										className='primary-color cursor-pointer  p-lg-0 m-lg-0 ml-0 mr-0  '
										id='back-to-login-btn '
										style={{ color: "#fff" }}
									>
										Sign In
									</Link>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(ForgotPasswordPage);
