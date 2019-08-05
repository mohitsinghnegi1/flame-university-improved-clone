import React from 'react'; 
import logo from '../images/logo2.png'
import user from '../images/user.png'
import question from '../images/question.png'
import swal from '@sweetalert/with-react'
import './style.css';
import {Redirect,Link} from 'react-router-dom'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:<p>hello</p>,
            username:localStorage.getItem("username")||"User",
            popoverOpen: false
            
        }
        console.log("navbar props",props)
        this.showSupportDialog=this.showSupportDialog.bind(this)
        this.showLogoutDialog=this.showLogoutDialog.bind(this)
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
          popoverOpen: !this.state.popoverOpen
        });
      }
    showSupportDialog(){
        swal({
            content:<div>
            <h5 className="text-uppercase text-primary text-left pl-3">Flame Student Application Support</h5>
            <hr/>
            <p className="text-left p-3 text-capitalize" style={{fontSize:"13px"}}>
            <strong>Dear {localStorage.getItem("username")},</strong><br/><br/>

            You may email or call us using contact details provided below.<br/>

            Admissions inquiries: admission@flame.edu.in<br/>

            Technical support: techsupport@flame.edu.in<br/>

            Toll free number: 1800-209-4567<br/>

            Sincerely,<br/><br/>

            FLAME Admissions Support Team
            
            </p>
          </div>,
            button: "Close",
          });
    }
    showLogoutDialog(){
        swal({
            title: "Are you sure?",
            content: <span>You want to <strong> Logout</strong></span>,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {

            if (willDelete) {
                localStorage.removeItem("username");
                this.setState({
                    logout:true
                })
              swal( {
                  title:"Logout Successfully",
                  icon: "success",
              }
              );
            
              
            
            
            } 
          });
    }
    render(){
        console.log(localStorage.getItem("username"),"username")
        if(localStorage.getItem("username")!==this.state.username){
            this.setState({
                username:localStorage.getItem("username")
                
            })
            console.log("usernameupdated")
        }
        console.log("navbar props",this.props)
        if(this.state.logout){
            return <Redirect to="/" ></Redirect>
        }
        return(
            <div className="container-fluid  centerize pb-2 mt-0 pt-0 sticky-top "style={{background:"#fff",borderBottom:"1px solid #f7f4a2",zIndex:"1000"}} >
                <div className="container p-0">
                    <div className="row w-75   align-self-center" >
                        <div className=" col-6 col-lg-3 p-0 pl-1   overflow-hidden " style={{height:"75px",display:"flex",justifyContent:"left",alignSelf:"center"}}>
                            <img src={logo} className=" img-fluid ml-2 " style={{maxHeight:"50px",marginTop:"0px",display:"flex",alignSelf:"center"}} alt="FLAME_UNIVERSITY"/>
                        </div>
                        <div className="col-6  col-lg-4 offset-lg-5 p-0 pl-2 mt-3 "  >
                            <div className="float-right text-right pr-3  " style={{color:"#215f95"}}>
                                <strong className=" " style={{fontSize:"14px"}}>Welcome </strong> <span className="" id="Name "><strong style={{fontSize:"14px"}} className="text-capitalize">{this.state.username}</strong>&nbsp;&nbsp;</span>
                                <span>
                                <img alt="" id="Popover1"  onClick={this.toggle} className="loading" src={user} /> &nbsp;&nbsp;
                                <Popover trigger="legacy"  className="p-2 text-center d-flex " style={{width:"180px"}} placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                                
                                <PopoverBody><Link to="/" style={{display:"flex",justifyContent:"center"}}><strong>Logout</strong></Link></PopoverBody>
                               
                                </Popover>
                                <img alt="" onClick={()=>{this.showSupportDialog()}} className="loading" src={question} />
                                </span>
                                </div>
                            <br/>
                            <div className="d-none d-lg-block pr-3 text-left">
                                <div className=" pb-1 mt-2" style={{fontWeight:"bold",fontSize:"11px"}}>You have completed <span id="percent-completed">{this.props.progress}</span> % of your application</div>
                                <div className="">
                                <div className="progress " style={{background: "#EFEFEF",border:" 1px solid rgb(226, 222, 222)",height:"6px"}}>
                                    <div className="progress-bar" role="progressbar" style={{width:this.props.progress+"%"}} aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100"></div>
                                </div> 
                                </div>
                            </div>
                        </div>
                        <div className="col-12 d-lg-none row m-0 p-0">
                            <div className="col-12 col-lg-4 offset-lg-8 pb-1">You have completed <span id="percent-completed">{this.props.progress}</span> % of your application</div>
                            <div className="col-12 col-lg-4 offset-lg-8">
                            <div className="progress " style={{background: "#EFEFEF",border:" 1px solid rgb(226, 222, 222)",height:"6px"}}>
                                 <div className="progress-bar" role="progressbar" style={{width:this.props.progress+"%" }} aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100"></div>
                            </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Navbar;