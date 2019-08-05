import React from 'react'
import constants from './constants/index'
import config from './config'
import logo from '../images/logo.PNG';
import {Link,withRouter} from 'react-router-dom';
import './style.css';
import $ from 'jquery'

class ResetPassword extends React.Component{
    constructor(props){
    super(props);
        this.state={
            ResetText:<i className="fa fa-arrow-right"></i>,
            password:null,
            repassword:null, 
            formErrors:{
                password:"",
                repassword:"",
                other1:""
             }
            }
            this.changeState=this.changeState.bind(this);
        }
    
  
    resetPassword = e => {
        e.preventDefault();
        var ref = document.forms["reset-content"]; 
        var password=ref["password"].value;
        var confirmpassword=ref["repassword"].value;
        if(password==="" || confirmpassword===""){
            if(password==="" && confirmpassword===""){
                this.setState({
                    formErrors:{
                        repassword:"Required",
                        password:"Required",
                        
                        other1:""
                    }
                })
                $("#password").focus();
            }
        
            else if(confirmpassword===""){
                this.setState({
                    formErrors:{
                        repassword:"Required",
                        other1:""
                    }
                })  
                $("#repassword").focus();
            }
            else{
                this.setState({
                    formErrors:{
                        repassword:"",
                        password:"Required",
                        other1:""
                    }
                })
                $("#password").focus();
            }
        }
        else if(password===confirmpassword) {

            $("#reset-content :input").prop("disabled", true);
            console.log("print reset password page props",this.props);
           // var LeadId= "ae60e67f-97b0-40bd-9e83-dc75e2d0758e" //response from forgot password API 
           // var TemporaryPassword= "9d7af0f510d2e7af4eaca3d48ae45b582f4f12001d044716ce7dd5df0fe38284"
           var uRLSearchParams = new URLSearchParams(window.location.search);
           var LeadId =uRLSearchParams.get("LeadId")
           var TemporaryPassword=uRLSearchParams.get("TemporaryPassword")
            var data ={

                "Password": password,
                "LeadId": LeadId, 
                "TemporaryPassword":TemporaryPassword
            };
            this.setState({
                ResetText:<i className="fa fa-refresh fa-spin" style={{fontSize:"14px"}}></i>
            })
            //take argument from query string and make api call
            fetch(constants.PortalAPI.baseURL+constants.PortalAPI.endPoints.ResetPassword,
                {method: 'POST',
                body:JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json",
                  "Authorization":config.Authorization
                    }
                 })
                    .then(response => response.json())
                    .then(json=>{
                        console.log(json);
                        if(json.hasOwnProperty('Status') && json.Status==="Error"){
                            this.setState({ResetText:<i className="fa fa-arrow-right"></i>,
                            formErrors:{
                                repassword:"",
                                password:"",
                                other1:"Sorry ,This link has been expired."
                            }
                        
                        })
                        $("#reset-content :input").prop("disabled", false);
                        $("#password").focus();

                        }
                        else if( json.hasOwnProperty('IsSuccessful') && json.IsSuccessful){

                            this.setState({ResetText:<i className="fa fa-arrow-right"></i>,
                            formErrors:{
                                repassword:"",
                                password:"",
                                other1:<span style={{color:"#fff"}}>Password changed successfully.Redirecting to login page...</span>
                            }
                            });
                            console.log("props received inforgot password page 1",this.props)
                            this.props.history.push("/");
                            var p=this.props
                            
                            ref.reset();
                            setTimeout(()=>p.history.push("/"),2000)
                           
                            $("#reset-content :input").prop("disabled", false);
                        }
                        else{
                            this.setState({ResetText:<i className="fa fa-arrow-right"></i>,
                            formErrors:{
                                repassword:"",
                                password:"",
                                other1:"Sorry for Incovinence .Please Try again later"
                            }
                        
                            })
                            $("#reset-content :input").prop("disabled", false);
                            $("#password").focus();
                        }
                    } ).catch(function(error) {
                        this.setState({ResetText:<i className="fa fa-arrow-right"></i>,
                        formErrors:{
                            repassword:"",
                            password:"",
                            other1:"Sorry for Incovinence .Please Try again later"
                        }
                    
                        })
                        $("#reset-content :input").prop("disabled", false);
                        $("#password").focus();
                    })
         }
         else{
             this.setState({
                formErrors:{
                    password:"",
                    repassword:"",
                    other1:"Password and Confirm Password do not match"
                 }

             })
             $("#password").focus();
         }
         
    
       };
       changeState(stateInfo) {
        console.log("value changed");
        this.setState(stateInfo);
        console.log(this.state);
        
        
    }
    render(){
        console.log("forgot password props ",this.props);
        return(

            <div className="container  mt-4">
                <div className="row w-75 Header pl-0">
                <div className=" col-lg-4 pl-0 grey-background overflow-hidden " >
                    <img src={logo} className="loading ml-0 mt-sm-3"  alt="FLAME_UNIVERSITY"/>
                </div> 
                <div className=" col-lg-8 p-3 pb-0">
                    
                    <div className=" text-left  blue1 " >
                        RESET PASSWORD
                    </div> 
                    <div className="errorMessage text-left mt-2 ">{this.state.formErrors.other1}<span style={{visibility:"hidden"}}>.</span></div>
                    <form className="row" autoComplete="off" noValidate id="reset-content" onSubmit={this.resetPassword}>
                    
                    <input autocomplete="false" name="hidden" type="text" style={{display:"none"}}/>
                        <div className="form-group col-11 col-lg-4 col pr-0 d-block mt-2" >
                            
                            <input  id="password" autoComplete="off" noValidate name="password" type="password" placeholder="Password"  className="form-control validate  password"/>
                            <span className="errorMessage float-left  ">{this.state.formErrors.password}<span style={{visibility:"hidden"}}>.</span></span>
                        </div>
                        <div className="form-group col-11 col-lg-4  pr-0 pb-0 mb-0 d-block mt-2" >
                           
                            <input id="repassword" autoComplete="new-password" noValidate  name="repassword" type="password" placeholder="Confirm Password" className="form-control validate  password"/>
                            <span className="errorMessage float-left  ">{this.state.formErrors.repassword}<span style={{visibility:"hidden"}}>.</span></span>
                        </div>
                        
                        <div className="form-group col-11 col-lg-2 row pb-0 mb-0 pt-2 d-block " >
                            <button type="submit" id="submitarrowButton" className=" form-control forward-button submitarrowButton   cursor-pointer align-self-center justify-content-center mb-0 ml-3 pb-2 pt-2  ">
                                {this.state.ResetText}
                            </button>   
                            
                        </div> 
                        <div className="form-group col-11 col-lg-2 row pb-0 mb-0 pt-2 d-block " >
                            <button type="submit" id="submitarrowButton" className=" form-control forward-button submitarrowButton   cursor-pointer align-self-center justify-content-center mb-0 ml-3 pb-2 pt-1">
                
                                <Link to="/" className="primary-color cursor-pointer  p-lg-0 m-lg-0 ml-0 mr-0  " id="back-to-login-btn " style={{color:"#fff"}} >Sign In</Link>
                            </button>   
                        </div>  
                        
                    </form>
                    
                </div>        
            </div>
            </div>
        )

    }
        
    

}
export default withRouter(ResetPassword);