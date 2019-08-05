var Constants = {
	PortalAPI: {
		baseURL: "https://portalapi-in21.leadsquared.com/",
		endPoints: {
			Signin: "api/Authentication/Signin",
			Register: "api/Authentication/Register",
			ForgotPassword: "api/Authentication/ForgotPassword",
			ChangePassword: "api/Settings/ChangePassword",
			Signout: "api/Authentication/Signout",
			ResetPassword: "api/Authentication/ResetPassword"
		}
	},

	LSQAPI: {
		baseURL: "https://api-in21.leadsquared.com/v2/",
		endPoints: {
			LeadCreate: "LeadManagement.svc/Lead.Create",
			MetaData: "LeadManagement.svc/LeadsMetaData.Get",
            GetLeadsByEmailAddress: "LeadManagement.svc/Leads.GetByEmailaddress",
            GetLeadsByLeadId:"LeadManagement.svc/Leads.GetById",
			SendPassword: "EmailMarketing.svc/SendEmailToLead"
		}
	}
};

export default Constants;
