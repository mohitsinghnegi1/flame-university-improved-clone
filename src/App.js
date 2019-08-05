import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import HomePage from './components/HomePage';
import ResetPassword from './components/ResetPasswordPage'



function loginPage(){
  return (<div><Header/><br/>
    <SignUpForm/></div>);
}

class  App extends React.Component {
  render()
  {return (
      <BrowserRouter> 

      <div className="App" >
        
        <Route exact path="/ForgotPasswordPage" component={ForgotPasswordPage} />
        <Route exact path="/" component={loginPage} />  
        <Route exact path="/HomePage" component={HomePage} />  
        <Route exact path="/ResetPasswordPage" component={ResetPassword} />
       
      </div>
      </BrowserRouter> 
    );

  }
  
}

export default App;
