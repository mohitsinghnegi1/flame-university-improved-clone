import React from "react";
import logo from "../images/logo.PNG";
import "./style.css";
import { Link, withRouter } from "react-router-dom";
import CanUserLogin from "./CanUserLogin";
import $ from "jquery";
const formValid = (state) => {
	let valid = true;
	// validate form errors being empty

	return valid;
};
class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			LoginText: <i className='fa fa-arrow-right' />,
			password1: null,
			email1: null,
			formErrors: {
				password1: "",
				email1: "",
				other1: ""
			}
		};
		this.changeState = this.changeState.bind(this);
	}
	Login = (e) => {
		e.preventDefault();
		var email = $("#email1");
		var password = $("#password1");
		if (email.val() === "") {
			this.setState({
				formErrors: {
					password1: "",
					email1: "required",
					other: ""
				}
			});
			email.focus();
		} else if (password.val() === "") {
			this.setState({
				formErrors: {
					password1: "required",
					email1: "",
					other: ""
				}
			});
			password.focus();
		} else {
			if (formValid(this.state)) {
				$("#login-content :input").prop("disabled", true);
				CanUserLogin(this.props, e, {
					changeState: this.changeState
				});
			}
		}
	};
	changeState(stateInfo) {
		console.log("value changed");
		this.setState(stateInfo);
		console.log(this.state);
		$("#login-content :input").prop("disabled", false);
	}
	render() {
		return (
			<div className='container  mt-4'>
				<div className='row w-75 Header pl-0'>
					<div className=' col-lg-4 pl-0 grey-background overflow-hidden '>
						<img
							src={logo}
							className='loading ml-0 mt-sm-3'
							alt='FLAME_UNIVERSITY'
						/>
					</div>
					<div className=' col-lg-8 p-3 pb-0'>
						<div className=' text-left  blue1 '>REGISTERED ALREADY?</div>
						<div className='errorMessage text-left mt-2 '>
							{this.state.formErrors.other}
							<span style={{ visibility: "hidden" }}>.</span>
						</div>
						<form
							className='row'
							autoComplete='off'
							noValidate
							id='login-content'
							onSubmit={this.Login}
						>
							<input
								autoComplete='false'
								name='hidden'
								type='text'
								style={{ display: "none" }}
							/>
							<div className='form-group col-11 col-lg-4 col pr-0 d-block '>
								<input
									id='email1'
									autoComplete='off'
									noValidate
									name='email1'
									type='email'
									placeholder='Email'
									className='form-control validate  email'
								/>
								<span className='errorMessage float-left mt-2 '>
									{this.state.formErrors.email1}
									<span style={{ visibility: "hidden" }}>.</span>
								</span>
							</div>
							<div className='form-group col-11 col-lg-4  pr-0 pb-0 mb-0 d-block '>
								<input
									id='password1'
									autoComplete='new-password'
									noValidate
									name='password1'
									type='password'
									placeholder='Password'
									className='form-control validate  password'
								/>
								<span className='errorMessage float-left mt-2 '>
									{this.state.formErrors.password1}
									<span style={{ visibility: "hidden" }}>.</span>
								</span>
							</div>
							<div className='col-lg-1' />
							<div className='form-group col-11 col-lg-2 row pb-0 mb-0  d-block '>
								<button
									type='submit'
									id='submitarrowButton'
									className=' form-control forward-button submitarrowButton   cursor-pointer align-self-center justify-content-center mb-0 ml-3   '
								>
									{this.state.LoginText}
								</button>
							</div>
						</form>
						<span
							className='errorMessage float-left  uline '
							style={{ marginTop: "-15px" }}
						>
							<Link
								to='/ForgotPasswordPage'
								className=' text-white cursor-pointer'
								style={{ color: "#de713b!important" }}
							>
								Forgot Password ?
							</Link>
						</span>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(Header);
