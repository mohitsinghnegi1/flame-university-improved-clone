import React from 'react';
import $ from 'jquery'

import { AppPreLoader } from '../utility/index';
import {utilityFunction,getAuthKey } from './data-access-layer/utility';
import {withRouter} from 'react-router-dom';

/* global lsq_setupForm */
class RenderForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showPreLoader: true,
            progressPercentage:0
        }
        var auth=this.props.location.state.detail.AuthKey;
        getAuthKey.authKey=auth;
        this.loadOverrideCSS = this.loadOverrideCSS.bind(this);
        this.onLSQFormSubmissionSuccessAtEachStep = this.onLSQFormSubmissionSuccessAtEachStep.bind(this);
    }
    onLSQFormSubmissionSuccessAtEachStep(e) {
       
        /*TODO YOU CAN CHANGE THIS LOGIC TO DEFINE THE PROGESS PERCENTANGE UPDATE FUNCTION */
        var progressPCent=  this.state.progressPercentage+Math.round(100/13)
        if(progressPCent>100){
            progressPCent=100;
        }
        this.setState({
            progressPercentage:progressPCent
        })
        console.log("render form progress percentage",progressPCent)
        console.log("this.props",this.props.userData.progress.progressUpdate({
            progressPercentage:progressPCent
        }));
    }
    
    loadOverrideCSS() {
        //custom form css is now fully loaded
        //set the loader false to display form and hide preloader
        console.log("loadOverrideCss executed");
        //Inserting icon inside tabs
        var parentClass=".lsq-form-custom-tab-tabs.lsq-form-tabs-list-item";
        $(parentClass+" a[data-old-value='PROGRAM & TEST']").prepend('<i class="fa fa-2x fa-file-code-o " aria-hidden="true"></i>');
        $(parentClass+" a[data-old-value='PERSONAL DETAILS']").prepend('<i class="fa fa-2x fa-address-book-o" aria-hidden="true"></i>');
        $(parentClass+" a[data-old-value='REVIEW AND APPLY']").prepend('<i class="fa fa-2x fa-graduation-cap " aria-hidden="true"></i>');
        $(parentClass+" a[data-old-value='EDUCATION AND WORK DETAILS']").prepend('<i class="fa fa-2x fa-id-card-o" aria-hidden="true"></i>');
        $(parentClass+" a[data-old-value='APPLICATION FEES']").prepend('<i class="fa fa-2x fa-money " aria-hidden="true"></i>');
        $(parentClass+" a[data-old-value='THANK YOU']").prepend('<i class="fa fa-2x fa-thumbs-o-up " aria-hidden="true"></i>');
        $(parentClass+" a[data-old-value='PHOTOGRAPH UPLOAD']").prepend('<i class="fa fa-2x fa-file-image-o " aria-hidden="true"></i>');
        $(parentClass+" a[data-old-value='STATEMENT OF PURPOSE']").prepend('<i class="fa fa-2x fa-file-text-o " aria-hidden="true"></i>');
        $(parentClass+" a[data-old-value='APPLICATION PDF']").prepend('<i class="fa fa-2x fa-file-pdf-o" aria-hidden="true"></i>');
        $(parentClass+" a[data-old-value='ADMIT CARD']").prepend('<i class="fa fa-2x fa-credit-card " aria-hidden="true"></i>');
        $(parentClass+" a[data-old-value='UPLOAD DOCUMENTS']").prepend('<i class="fa fa-2x fa-cloud-upload " aria-hidden="true"></i>');
        $(parentClass+" a[data-old-value='ADMISSION STATUS']").prepend('<i class="fa fa-2x fa-check-circle-o " aria-hidden="true"></i>');
        
        $('head').append('<link rel="stylesheet" type="text/css" href="/css/lsqFormStyle.css">');
        this.setState({showPreLoader:false});
    }
    
    GetAuthKey=()=>{
        var authKey=this.props.location.state.detail.AuthKey;
        //console.log("Authkey in GetAuthKey",authKey);
        return authKey;
    }
    onLSQFormLoadError(e) {
        //Expire cookie
        //utilityFunction.ExpireAuthSessionInfoCookie();
        //log out
        console.log("There is some error while loading form");
        window.location.href = "/";
    }
    componentDidMount() {
        $('.net-con-error').hide();
        var devFormurl = "https://dhx9mmhpfsala.cloudfront.net/cdn/externalforms/js/lsq.form.js?v=57.0.3";
        $.getScript(devFormurl) //getting the script
            .done(function (data) {
                $('.net-con-error').hide();
                lsq_setupForm(
                    {
                        id: '4239f849-ad0c-11e9-a066-0a9b54eb1494',
                        authKeyProvider: utilityFunction.GetAuthKey
                    });
            })
            .fail(function (error) {
                console.log("error"+error);
                console.log("There is some error while loading form");
                window.location.href = "/";
                $('.net-con-error').show();
            })
            this.lsqFormContainer.addEventListener('lsqformloadcomplete', this.loadOverrideCSS);
            this.lsqFormContainer.addEventListener('LSQFormLoadError', this.onLSQFormLoadError);
            this.lsqFormContainer.addEventListener('lsqformsubmissionsuccessateachstep', this.onLSQFormSubmissionSuccessAtEachStep);
            this.lsqFormContainer.addEventListener('lsqformsubmissionsuccess', this.onLSQFormSubmissionSuccess);
    }
    render(){
        if(this.state.AppPreLoader)this.loadOverrideCSS();
        console.log("render Form props ",this.props);
        //if(this.state.showPreLoader) return <h1>Loading</h1>;
        var actualAuthKey = "Z3gzRVI5eXdydGtONGpWeWlEb0cxY3VvZzdZV3A1eHlZbENWcVZ0c1FDT0FCSDJqb2RyN2lOZDdDWmszdWdOZmVLZ3JSN0ZoUVBuN0w1Q0lVMElibS9kR1FVeUZyYzN3K1hROWhmZkdPVVdLSG0reFVETi9kaHRWcjlTd09VUmMwZEV0THREVWUzYjhzeDV4WEFFNEVXNG9vRmUyU2YrdDF2K1h3dHZ6Ry9mMHVUVU8wdDFETGlEU2czUFdJcmlKR0NTYW0yeFBWbUxHOGoreVNNZFB0dz09";
        var actualFormId = "4239f849-ad0c-11e9-a066-0a9b54eb1494";
        return (
            <>
            <AppPreLoader show={this.state.showPreLoader} />
            {console.log(this.state.showPreLoader)}
            <div className="container  mt-5 mb-5" >  
                <div className="row w-75 " >
                    <div className="text-danger net-con-error alert alert-danger" role="alert" >Please Check your Internet Connection and try again.</div>    
                    <div id="lsq-form-modal" ref={elem => this.lsqFormContainer = elem} data-form-id={actualFormId
                    } className="modal-v4 fullscreen external lsq-external-form-container">
                        <div className="lsq-form-container-wrapper">
                        </div>
                        <div className="lsq-form-hidden-fields">
                            <input id="lsq-authKey" name="lsq-authKey" type="hidden" value={actualAuthKey} />
                            <input id="lsq-api-service-url" name="lsq-api-service-url" type="hidden" value="https://portalapi-in21.leadsquared.com/api/Form" />
                            <input id="lsq-app-url" name="lsq-app-url" type="hidden" value="http://in21.leadsquared.com/v2/" />
                        </div>
                    </div>
                </div>    
            </div>
            </>
        )

    }
}


export default withRouter(RenderForm) ;