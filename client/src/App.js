import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AuthContainer from './components/AuthContainer';


function App() {
  const [Data, setData] = useState({auth: false, warning: ''});
  const onSetData = (value) => setData(value);
  const user_rol = localStorage.getItem('rol') | 0;

  return (
    <Router>
      <Route path="/" render={() => (
        (Data.auth && user_rol === 2)  ? (<Redirect to="/admin" />) :
         ((Data.auth && user_rol === 1)  ? (<Redirect to="/user" />) : (<Redirect to="/signin"/>)))}/>
      <Route path="/signin" render={() => <SignIn onSetData={onSetData}  warning={Data.warning}/>} />
      <Route  path="/signup" render={() => <SignUp onSetData={onSetData} warning={Data.warning}/>} />
      <Route  path="/admin" render={() => (Data.auth ? (<AuthContainer onSetData={onSetData} user_rol={user_rol}  warning={Data.warning}/> ) : (<Redirect to="/signin"/>))}/>
      <Route  path="/user" render={() => (<AuthContainer onSetData={onSetData} user_rol={user_rol}  warning={Data.warning}/>)}/>
    </Router>
  );
}
 

export default App;



