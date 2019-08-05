import React from "react";
import Tabs from "./Tabs";
import $ from 'jquery';
import RenderForm from "./RenderForm";
class  HomePageContent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showApplicationForm:false
        }
        this.PoceedToApplication=this.PoceedToApplication.bind(this)
    }
      PoceedToApplication=()=>{
        console.log("ProceedToApplication Clicked");
        this.setState({
            showApplicationForm:true
        })

        
    }
    
    render(){
    
    console.log("home page props", this.props);
    return this.state.showApplicationForm ?<RenderForm  userData={this.props}/>:
	
		<div className='outer mb-5 mt-2 d-block' id="HomePage">
			<div className='container '>
				<div
					className='row form-container w-75 text-left '
					style={{ overflow: "hidden" }}
				>
					{/* HOME CONTENT */}
					<Tabs />
					<div className='m-3'>
						<p>
							Dear <strong className="text-capitalize">&nbsp;{localStorage.getItem("username")}</strong>,
						</p>
						<div className='tab-content active home-content' id='tab2'>
							Welcome to the FLAME Online Application Portal! We thank you for
							your interest in <strong>FLAME University.</strong>
							<br />
							<br />
							This portal is designed to guide you through the application
							process step by step. You do not need to complete the application
							in one sitting. You can track your application by logging in the
							portal anytime.
							<br />
							<br />
							<strong>A few reminders before you start:</strong>
							<br />
							<br />
							<ul style={{ listStyleType: "disc", paddingLeft: "15px" }}>
								<li>
									You will be required to enter test results, personal details,
									education and work details tab by tab. Before you submit your
									application, please ensure the information is accurate. You
									will not be allowed to make changes after your declaration and
									signature.
								</li>
								<br />
								<li>
									Your application will be ready for review by the Admissions
									Committee upon receipt of the application fee, and submission
									of application details, photo, and statement of purpose. We
									encourage you to complete and submit the application as soon
									as possible.
								</li>
								<br />
								<li>
									Please check your email to make sure you receive a
									registration confirmation from the FLAME Online Application
									portal. We recommend you add{" "}
									<a
										style={{ textDecoration: "none", color: "#F58634" }}
										href='mailto:admission@flame.edu.in'
									>
										admission@flame.edu.in
									</a>{" "}
									to your contact list to ensure you receive all future
									correspondence from the FLAME Admissions Committee.
								</li>
								<br />
								<li>
									We believe the portal is user-friendly and is easy to
									navigate. But to ensure you have a smooth experience
									throughout the application, we are here to support you. If you
									have any question or need help anytime, you can contact us via
									various channels listed below.
									<br />
									<br />
									<ul style={{ listStyleType: "disc", paddingLeft: "15px" }}>
										<li>
											{" "}
											Submit your inquiries by clicking 'Contact Us' on bottom
											left corner of the page.
										</li>
										<li>
											Call us toll free at{" "}
											<a href='callto://1800-209-4567'>1800-209-4567</a>
										</li>
										<li>
											Email us at{" "}
											<a
												style={{ textDecoration: "none", color: "#F58634" }}
												href='mailto:admission@flame.edu.in'
											>
												admission@flame.edu.in
											</a>{" "}
											for admission inquires, or at{" "}
											<a
												style={{ textDecoration: "none", color: "#F58634" }}
												href='mailto:techsupport@flame.edu.in'
											>
												techsupport@flame.edu.in
											</a>{" "}
											for technical support.
										</li>
									</ul>
								</li>
							</ul>
							<br />
							<p>Look forward to receiving your application.</p>
							<strong>FLAME University Admissions Committee</strong>
							<div className='form-buttons float-lg-right pb-2 mt-3 '>
								<input
                                    type='button' 
                                    onClick={()=>{this.PoceedToApplication()}}
									name='j_id0:j_id13:j_id58'
									value='PROCEED TO APPLICATION'
									className='btn col-12 save-btn primary-color text-white p-2'
								/>
							</div>
						</div>
					</div>

					{/*HOME CONTENT END*/}
				</div>
			</div>
			<div className='container  mt-2'>
				<div className='row w-75 '>
					<div className='col col-6 text-left pl-0 pr-0  copyright'>
						Contact us
					</div>
					<div className='col col-6 text-right pr-0  copyright'>
						© FLAME University 2017. All Rights Reserved.
					</div>
				</div>
			</div>
		</div>

    }
}
export default HomePageContent;
