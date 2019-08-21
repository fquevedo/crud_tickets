import React from 'react';
import { Segment, Icon,Label} from 'semantic-ui-react'
import axios from 'axios';
import Warning from './Warning';
import User from './User';
import Admin from './Admin';


function AuthContainer(props){


  function handleLogoutClick(){
    logoutApi();
  }

  function logoutApi(){
      axios
      .post('http://localhost:8000/api/logout?api_token='+localStorage.getItem('token'))
      .then(res => {
        props.onSetData({auth: false, warning: ''})
      })
      .catch(err => {
        alert('existen errores')
      })
  }


  return (
  <div>
  {(props.warning === '') ? '' : <Warning warning={props.warning}/>}
  <Segment placeholder>
    <Label>{props.user_rol==1 ? "User" : "Admin"}</Label>
    <Label as='a' image>
      <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' alt=""/>
      {localStorage.getItem('name')} | {localStorage.getItem('email')}
    </Label>
    <Icon onClick={() => handleLogoutClick()} name='log out'  size='large' style={{float: "right", cursor:"pointer"}}/>
    {props.user_rol==1 ? <User onSetData={props.onSetData}/> : <Admin onSetData={props.onSetData}/>}
  </Segment>
  </div>
);

}

export default AuthContainer;



