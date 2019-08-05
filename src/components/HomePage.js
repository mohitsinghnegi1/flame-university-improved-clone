import React from "react";
import Navbar from "./Navbar";
import HomePageContent from "./HomePageContent";
import constants from './constants/index'
import config from './config'
import { AppPreLoader } from '../utility/index';
//import RenderForm from './RenderForm'
import { withRouter } from "react-router-dom";

function UpdateUserName(leadId,updateStateRef){

    console.log("Inside Home page UpdateUsername Function")
    fetch(constants.LSQAPI.baseURL+constants.LSQAPI.endPoints.GetLeadsByLeadId+"?accessKey="+config.AccessKey+"&secretKey="+config.SecretKey+"&id="+leadId,{method: 'GET'})
        .then(response => response.json())
        .then(json=>{
            
           console.log("Inside Home page UpdateUsername Function ",json);
           updateStateRef.updateState({username:json[0].FirstName+" "+json[0].LastName})
            

        } ).catch(function(error) {
        
            console.error("failed to load data from the server max request exceeded / failed to fetch username from leadId");
        });
        

}


class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            progressPercentage:0,
            leadId:"",
            username:"",
            showPreLoader:true

        }
        //localStorage.setItem("username","User")
        this.UpdateProgressPercentage=this.UpdateProgressPercentage.bind(this)
        this.updateState=this.updateState.bind(this)
    }
    updateState(stateInfo){
        console.log("updateState called")
        this.setState(stateInfo)
        localStorage.setItem("username",this.state.username);
        console.log("localstorage username :",localStorage.getItem("username"))
        this.setState({
            showPreLoader:false
        })
    }

    componentDidMount(){
        console.log("home page cdm 1 props received", this.props.location.state.detail.LeadId)
        var leadIdentityNumber=this.props.location.state.detail.LeadId;
        console.log("lead id",leadIdentityNumber)
       
        UpdateUserName(leadIdentityNumber,{updateState:this.updateState});
        

    }




    UpdateProgressPercentage(stateInfo){
        console.log("UpdateProgressPercentage funtion is called",stateInfo);
        this.setState(stateInfo)
    }
	render() {
        
		if (typeof this.props.location.state === "undefined") {
			console.log("Please login first to Visit Home Page");

			setTimeout((window.location.href = "/"), 3500);
			return <p>Please Login first</p>;
        }
        if(this.state.showPreLoader){
               return <AppPreLoader show={this.state.showPreLoader} />
                
        }
		return (
			<div>
                {console.log("home page 1 props received", this.props)}
                

				<Navbar progress={this.state.progressPercentage} />

				<HomePageContent userData={this.props.location.state.detail} progress={{"progressUpdate":this.UpdateProgressPercentage}}/>

			</div>
		);
	}
}
export default withRouter(HomePage);
