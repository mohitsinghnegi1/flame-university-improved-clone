import React from 'react'
function Tabs(){
    return(
        
        <ul className="nav row nav-tabs w-100 text-uppercase " style={{marginLeft:"0.1px",fontSize:"11px",fontWeight:"bold"}}>
            <li className="active col-1 col-sm-3 col-lg-1 nav-item text-center"  id="Index1">
            <a data-toggle="tab" href="#home" className="nav-link justify-content-center d-block ">
                <span className="text-center vertical-align-center " ><i className="fa fa-2x  fa-lg-2x  fa-home"></i>
                </span> 
            </a>
                    
            </li> 
                    
            <li id="ProgramForm3" className="nav-item col-2 col-sm-3 col-lg-2 disabled" >
            <a data-toggle="tab" href="#menu1" className="nav-link" style={{color:"green" ,background:"#d4e8cc"}}>
                <span className="pull-left"><i className="fa fa-2x fa-file-code-o" aria-hidden="true"  ></i></span>
                <div className="media-body text-left ml-4 d-none d-sm-block">Program &amp;&nbsp; test</div>
            </a>   
            </li>
            <li id="PersonalDetails3" className="nav-item col-2 col-sm-3 col-lg-2 disabled" >
            <a data-toggle="tab" href="#menu2" className="nav-link" style={{color:"green" ,background:"#d4e8cc"}}>
                <span className="pull-left"><i className="fa fa-2x fa-address-book-o" aria-hidden="true"></i></span>
                <div className="media-body text-left ml-4 d-none d-sm-block ">Personal Details</div>
            </a>
                
            </li>
            <li id="EducationAndWork3" className="nav-item col-2 col-sm-3 col-lg-2 disabled">
                <a data-toggle="tab" href="#menu3" className="nav-link">
                    <span className="pull-left"><i className="fa fa-2x fa-graduation-cap" aria-hidden="true"></i></span>
                    <div className="media-body text-left ml-4 pl-1 d-none d-sm-block">Education &amp; Work &nbsp;Details</div>
                </a>
            </li>
            
            
            <li id="ReviewAndApply"  className="nav-item col-2 col-sm-4 col-lg-2 disabled">
                <a data-toggle="tab" href="#menu4" className="nav-link">
                    <span className="pull-left"><i className="fa fa-2x fa-id-card-o" aria-hidden="true"></i></span>
                    <div className="media-body text-left ml-4 pl-1 d-none d-sm-block text-sm-center"> Review &amp; Apply</div>
                </a>
            </li>
            <li id="PaymentGateway" disabled className="nav-item col-2 col-sm-4 col-lg-2 disabled">
                <a data-toggle="tab" href="#menu5" className="nav-link">
                    <span className="pull-left"><i className="fa fa-2x fa-money" aria-hidden="true"></i></span>
                    <div className="media-body text-left pl-1 ml-4 d-none d-sm-block text-sm-center">Application Fees</div>
                </a>
            </li>
            <li id="ThankyouPage3"  className="nav-item col-1 col-sm-4 col-lg-1 disabled">
                <a data-toggle="tab" href="#menu6" className="nav-link ">
                    <span className="pull-left"><i className="fa fa-2x fa-thumbs-o-up " aria-hidden="true"></i></span>
                    <div className="media-body text-left ml-4 pl-1 d-none d-sm-block text-sm-center " >Thank &nbsp; You</div> 
                </a>
            </li>
        </ul>

            
    )
}
export default Tabs;