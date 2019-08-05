import React from 'react';
import eductionImg from '../images/education.PNG';
import SubmitForm from './HandleSubmit';
import {emailRegex} from './Regex'
import {withRouter} from 'react-router-dom';
import $ from 'jquery';
import config from './config'
import constants from './constants/index'


const fieldValues = {
    country:[],
    state:[],
    city:[],
    countrycode:[],
    campusinterest:[],
    programinterest:[],
    source:[],
};
function mapValues(obj){
    const resultset=obj.map((ar) => {
        return ar.Value;
    });
    return resultset;
}




//this function will make all the element focus
const makeFocused=({ formErrors,states,formFill,submitText, ...rest })=>{

    console.log("Inside make Focus");
    var flag=false;
    $.each(formErrors, function(field, val) {
        
        if(val.length>0){
            console.log(field);
            console.log(val);
            flag=true;
            $("#"+field+"").focus();
            return false;
        }
        
      });
      if(!flag){
        $.each(rest, function(field, val) {
        
            if(val==null || val===""){
                $("#"+field+"").focus();
                
            }
      });
    }

  };
  const formValid = ({ formErrors,states,formFill, ...rest }) => {
    let valid = true;
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
    // validate the form was filled out
    console.log(rest);
    Object.values(rest).forEach(val => {
    val === null && (valid = false);
    console.log(val);
     });
  console.log(valid);
    return valid;
  };
  function getIndex(json){
    var data = {country:-1,programinterest:-1,source:-1,campusinterest:-1,countrycode:-1};
    var i=0;
    console.log(json)
    for (var d in json){
        var item=json[d].SchemaName;
        switch(item){
            case "mx_Country":data.country = i;
                return data;
                
            case "mx_country_code": data.countrycode = i;
                break;
            case "mx_How_did_you_hear_about_Botho_University": data.source=i;
                break;
            case "mx_Campus_Interested_In":  data.campusinterest=i;
                break;
            case "mx_Program_interested_in":data.programinterest=i;
                break;
            default:;

        }
        i+=1
    }
    console.log(data);
    return data;

  }

class SignUpForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            submitText:"SIGN UP",
            states:[],
            repassword:null,
            password:null,
            email:null, 
            source:null,
            programintrest:null,
            campusinterest:null,
            mobile:null,
            othercity:null,
            city:null,
            state:null,
            country:null,
            lastname: null,
            firstname:null,
            formFill:null,
            formErrors: {

                repassword:"",
                password:"",
                email:"", 
                source:"",
                
                programintrest:"",
                campusinterest:"",                
                mobile:"",
                othercity:"",
                city:"",
                state:"",
                country:"",
                lastname: "",
                firstname:"",

            }
        }
        this.changeState = this.changeState.bind(this);
    }
    HandleSubmit = e => {
       e.preventDefault();
        if (formValid(this.state)) {
            this.setState({
                formFill:"Submiting form"
            }); 
            console.log("valid form");
            $("#myForm :input").prop("disabled", true);
            this.setState({
                submitText:"LOADING..."
                
            })
           var er= SubmitForm(this.props,e, {
            changeState: this.changeState 
        });

           console.log(er);
           
        } else {
            this.setState({
                formFill:"Please Fill out the form correctly"
            });
            makeFocused(this.state);
            $('.errorM').show().fadeIn(1000);
            setTimeout(()=>{
                $('.errorM').fadeOut(1000);
            },3000)
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
    
    // it will onlu call once
     componentDidMount(){  
        $('.errorM').hide();   //to hide the error message initially
        console.log("inside mound");
        fetch(constants.LSQAPI.baseURL+constants.LSQAPI.endPoints.MetaData+"?accessKey="+config.AccessKey+"&secretKey="+config.SecretKey,{method: 'GET'})
        .then(response => response.json())
        .then(json=>{
            console.log(json);
            console.log("meta data api");
            var indexArray=getIndex(json);
            console.log("index array");
            console.log(indexArray)
            fieldValues.country=mapValues(json[indexArray.country].Options);
            fieldValues.programinterest=mapValues(json[indexArray.programinterest].Options);
            fieldValues.source=mapValues(json[indexArray.source].Options);
            fieldValues.campusinterest=mapValues(json[indexArray.campusinterest].Options);
            fieldValues.countrycode=mapValues(json[indexArray.countrycode].Options);
           
            

        } ).catch(function(error) {
        
            console.error("failed to load data from the server max request exceeded");
        });
        

        console.log(this.props);
        // fetch("https://cors-anywhere.herokuapp.com/https://geodata.solutions/restapi?country=india",{method: 'GET'})
        // .then(response => response.json())
        // .then(json=>{
        //     console.log(json);
        //     const names=json.details.regionalBlocs.map(items=>{
        //         return items.state_name
        //     });
        //     const b=names.map(item=>{
        //         return item;})
        //     this.setState({
        //         states:b  
        //     })
        //     console.log(b);
        // } ).catch(function(error) {
        
        //     console.log("failed to load data from the server max request exceeded");
        // });        
    }
    handleChange =(e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
          case "firstname":
            formErrors.firstname =
              value.length <3 ? "Invalid firstname." : "";
            break;
          case "lastname":
            formErrors.lastname =
              value.length <3 ? "Invalid lastname." : "";
            break;
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "Invalid email address";
            break;
          case "password":
            var repassword = document.getElementById("repassword").value;
            formErrors.repassword=
                repassword===value?"":"Incorrect Confirm password";
            formErrors.password =
              value.length ===0 ? "Password is required." : "";
            break;
            case "repassword":
                var password = document.getElementById("password").value;   
                formErrors.repassword =
                  value!==password ? "Incorrect Confirm password ." : "";
                break;
            case "country":
                formErrors.country =
                value.length ===0 ? "Country is required." : "";
                break;
            case "city":
                var otherCty = document.getElementById("othercity");
                if(value===("Other")){  
                    otherCty.disabled=false;
                }
                else{
                    otherCty.disabled=true;
                    this.setState({othercity:value})
                }
                formErrors.city = value.length!==0
                  ? ""
                  : "City is required";
                break;
            case "othercity":
                    var x = document.getElementById("city").value;   
                formErrors.othercity =
                  x ===("Other")&&value.length===0 ? "Othercity is required." : "";
                break;
            case "programintrest":
                formErrors.programintrest =
                value.length ===0 ? "Program interested is required." : "";
                break;
            case "campusinterest":
                formErrors.campusinterest = value.length!==0
                    ? ""
                    : "Campus intrest is required.";
                break;
            case "source":
                formErrors.source =
                value.length ===0 ? "source required." : "";
                break;
            case "mobile":
                formErrors.mobile =
                value.length>6 && value.length<16 ? "" : "Invalid mobile no";
                break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value});
      };
    
    changeState(stateInfo) {
        console.log("value changed");
        this.setState(stateInfo);
        console.log(this.state);
        $('.errorM').show().fadeIn(1000);
            setTimeout(()=>{
                $('.errorM').fadeOut(1000);
        },3000)
        $("#myForm :input").prop("disabled", false);
        
    }

    render(){
       
        // const populateStates=this.state.states.map(item=>{
        //     return <option value={item} key={item}>{item}</option>;
        // })
        
        const populateCountries=fieldValues.country.map(item=>{
            
            return <option value={item} key={item}>{item}</option>;
        });
        
        const populateCountryCode=fieldValues.countrycode.map(item=>{
            return <option value={item} key={item}>{item}</option>;
        });
        const populateCampusInterest=fieldValues.campusinterest.map(item=>{
            return <option value={item} key={item}>{item}</option>;
        });
        const populateProgramInterest=fieldValues.programinterest.map(item=>{
            return <option value={item} key={item}>{item}</option>;
        })
        const populateSource=fieldValues.source.map(item=>{
            return <option value={item} key={item}>{item}</option>;
        })
        
        
        
    
    const { formErrors } = this.state;    
    return(
        <div className="outer mb-5">
        <div className="container " >
            <div className="row form-container w-75" >
                <div className=" col-lg-4 p-2 d-none d-lg-block">  
                    <img className="loading educationImg img-fluid" src={eductionImg} alt="educationImg" />
                </div>
                <div className=" col-lg-8 pt-3 pd40" >
                    <div className="row primary-text-color" >
                    Don't have an account? <span  className=" pl-lg-2 text-xs-center text-lg-left mb-2 blue1" >
                     REGISTER TO APPLY
                    </span>
                    </div>
                    
                    <form className="row mt-2 form-half pb-2 " autoComplete="off" id="myForm"  name="RegForm" onSubmit={this.HandleSubmit}>
                        <div className=" errorM  float-left   w-80">{this.state.formFill}</div>
                        <div className=" col-lg-6 row border-r left-half py-0 pr-lg-2">
                            <div className="form-group col-lg-6  pr-lg-1 pl-0 pr-0 d-block " >
                                <label htmlFor="firstname">First Name <span className="star-color pl-lg-1"> *</span></label>
                                <input type="text"  name="firstname"   onChange={this.handleChange} className="form-control" style={{background:"red!important"}} id="firstname" />
                                {formErrors.firstname.length > 0 && (
                                <span className="errorMessage float-left">{formErrors.firstname}</span>
                                 )}
                                
                                
                            </div>
                            <div className="form-group col-lg-6 pl-lg-1 pr-0 pl-0">
                                <label htmlFor="lastname">Last Name <span className="star-color pl-lg-1"> *</span></label>
                                <input type="text" noValidate onChange={this.handleChange} className="form-control" id="lastname" name="lastname"/>
                                {formErrors.lastname.length > 0 && (
                                    <span className="errorMessage float-left">{formErrors.lastname}</span>
                                )}
                                                
                            </div>
                            <div className="form-group col-lg-6 pr-lg-1 pl-0 pr-0">
                                <label htmlFor="country">Country <span className="star-color pl-lg-1"> *</span></label>
                                <select className="form-control opt"  noValidate onChange={this.handleChange} id="country" name="country">
                                    {populateCountries}
                                    {console.log(populateCountries)}
                                </select>
                                {formErrors.country.length > 0 && (
                                    <span className="errorMessage float-left">{formErrors.country}</span>
                                )}
                            </div>
                            <div className="form-group  col-lg-6 pl-lg-1 pr-0 pl-0">
                                <label htmlFor="state">State <span className="star-color pl-lg-1"> *</span></label>
                                <select className="form-control opt" noValidate onChange={this.handleChange} id="state" name="state">
                                    <option hidden value=""></option>
                                    <option  value="Punjab">Punjab</option>
                                    <option  value="UttarPradesh">UttarPradesh</option>
                                    <option  value="TamilNadu">TamilNadu</option>
                                    <option  value="Karnataka">Karnataka</option>
                                    <option  value="Bihar">Bihar</option>
                                    {/* {populateStates} */}
                                </select>
                                {formErrors.state.length > 0 && (
                                    <span className="errorMessage float-left">{formErrors.state}</span>
                                )}
                            </div>
                            <div className="form-group  col-12 pl-0 pr-0 ">
                            <label htmlFor="city">City <span className="star-color pl-lg-1"> *</span></label>
                            <select className="form-control opt" noValidate onChange={this.handleChange} id="city" name="city">
                                <option value="" hidden></option>
                                <option value="paris" >paris</option>
                                <option value="dubai">dubai</option>
                                <option value="bangaluru">bangaluru</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Other">Other</option>
                            </select>
                            {formErrors.city.length > 0 && (
                                    <span className="errorMessage float-left">{formErrors.city}</span>
                                )}
                            </div>
                            <div className="form-group  col-12  pl-0 pr-0">
                                <label htmlFor="othercity">Other City <span className="star-color pl-lg-1"> *</span></label>
                                <input type="text" noValidate onChange={this.handleChange}  disabled className="form-control" id="othercity" name="othercity"/>
                                {formErrors.othercity.length > 0 && (
                                    <span className="errorMessage float-left">{formErrors.othercity}</span>
                                )}
                            </div>
                            <div className="form-group  col-lg-6 pr-lg-1 pl-0 pr-0">
                            <label htmlFor="countrycode">Country Code <span className="star-color pl-lg-1"> *</span></label>
                            <select className="form-control opt " noValidate onChange={this.handleChange} id="countrycode" name="countrycode">
                                {populateCountryCode}
                            </select>
                            
                            </div>
                            <div className="form-group  col-lg-6 pl-lg-1 pr-0 pl-0">
                                <label htmlFor="mobile" >Mobile Number <span className="star-color pl-lg-1"> *</span></label>
                                <input type="number" noValidate onChange={this.handleChange} min="1000000" max="1000000000000000" className="form-control" id="mobile" name="mobile"/>
                                {formErrors.mobile.length > 0 && (
                                    <span className="errorMessage float-left">{formErrors.mobile}</span>
                                )}
                            </div>
                            <div className="form-group  col-12 pl-0 pr-0 ">
                            <label htmlFor="CampusInterestedIn">Campus Interested In <span className="star-color pl-lg-1"> *</span></label>
                            <select className="form-control opt" noValidate onChange={this.handleChange} id="campusinterest" name="campusinterest">
                                {populateCampusInterest}
                            </select>
                            {formErrors.campusinterest.length > 0 && (
                                <span className="errorMessage float-left">{formErrors.campusinterest}</span>
                            )}
                            </div>
                        </div>
                        <div className="col-lg-6 right-half pl-lg-3   ml-lg-4 pl-0">
                            <div className="form-group  col-12 pl-0 ">
                            <label htmlFor="intrestedIn">Program Interested In <span className="star-color pl-lg-1"> *</span></label>
                            <select className="form-control opt" noValidate onChange={this.handleChange} id="programintrest" name="programintrest">
                               {populateProgramInterest}
                            </select>
                            {formErrors.programintrest.length > 0 && (
                                <span className="errorMessage float-left">{formErrors.programintrest}</span>
                            )}
                            </div>
                            <div className="form-group  col-12 pl-0 ">
                            <label htmlFor="source">How did you hear about Botho University? <span className="star-color pl-lg-1"> *</span></label>
                            <select className="form-control opt" noValidate onChange={this.handleChange} id="source" name="source">
                                {populateSource}
                            </select>
                            {formErrors.source.length > 0 && (
                                <span className="errorMessage float-left">{formErrors.source}</span>
                            )}
                            </div>
                            
                            <div className="form-group  col-12 pl-0  ">
                                <label htmlFor="email" >Email <span className="star-color pl-lg-1"> *</span></label>
                                <input type="email" autoComplete="off" noValidate data-toggle="tooltip" title="We recommend your password to be at least 8 character long along with number"  onChange={this.handleChange} className="form-control" id="email" name="email" />
                                {formErrors.email.length > 0 && (
                                    <span className="errorMessage float-left">{formErrors.email}</span>
                                )}
                            </div>
                            <div className="form-group  col-12 pl-0">
                                <label htmlFor="password">Password <span className="star-color pl-lg-1"> *</span></label>
                                <input type="password" autoComplete="new-password" noValidate onChange={this.handleChange} className="form-control" id="password" name="password"/>
                                {formErrors.password.length > 0 && (
                                    <span className="errorMessage float-left">{formErrors.password}</span>
                                )}
                            </div>
                            <div className="form-group  col-12 pl-0">
                                <label htmlFor="re-password">Re-enter Password <span className="star-color pl-lg-1"> *</span></label>
                                <input type="password" noValidate onChange={this.handleChange} className="form-control" id="repassword" name="repassword" />
                                {formErrors.repassword.length > 0 && (
                                     <span className="errorMessage float-left">{formErrors.repassword}</span>
                                )}
                            </div>
                            <div className="form-group  col-lg-5 float-right pl-0">
                                <input type="submit"  className="submit-btn form-control primary-color cursor-pointer mt-3" style={{color:"white"}} id="submit" value={this.state.submitText}/>
                            </div>
                        </div>
                    </form>
                    
                </div>                   
            </div>            
        </div>
        <div className="container  mt-2">
            <div className="row w-75 ">
                <div className="col col-12 text-right pr-0  copyright">
                © FLAME University 2017. All Rights Reserved.
                </div>
            </div>    
        </div>
        </div>    
    );
    }
}





export default withRouter(SignUpForm);