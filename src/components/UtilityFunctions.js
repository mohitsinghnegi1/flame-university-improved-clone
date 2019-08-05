import config from './config'
import constant from './constants/index'

function formUtilityFunctions(props,data,stateUpdate,formRef){
    console.log(data,"data")
    var er = {};
    fetch(constant.PortalAPI.baseURL+constant.PortalAPI.endPoints.Register, {
        method: "POST",
        body:data,
        headers: {
            "Content-Type": "application/json",
            "Authorization":config.Authorization
        },
        
        }).then(response => 
            response.json())           
        .then(json=>{
                if(json.hasOwnProperty('Status') && json.Status==="Error"){
                    console.log(json.ExceptionMessage);  
                // alert(json.ExceptionMessage);
                    er=json.ExceptionMessage;
                    console.log("using form ref",formRef["firstname"].value);
                    formRef.reset();
                    stateUpdate.changeState({formFill:er,submitText:"SIGN UP"});
                    console.log(er);
                }
                else if(json.hasOwnProperty('Message')){

                // alert("Registered Successfully");
                    console.log("Signup Successfully .Please login to Continue ",json);
                    formRef.reset();
                    props.history.push("/");
                    //er=json.Message;
                    er="Signup Successfully .Please login to Continue"
                    stateUpdate.changeState({formFill:er,submitText:"SIGN UP"});
                    console.log(er);  
                }
                else{
                    er="Please try again Later.Sorry for Inconvinence";
                    stateUpdate.changeState({formFill:er,submitText:"SIGN UP"});
                    console.log(er); 
                }
        }).catch(function(error) {
        console.log("some exception occured");
        console.log(error);
        er="some exception occured";
        stateUpdate.changeState({formFill:er,submitText:"SIGN UP"});
        console.log(er);
    });  
}
export default formUtilityFunctions;