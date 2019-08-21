import React from 'react';
import {  Button, Form} from 'semantic-ui-react'
import axios from 'axios';


function Login({onSetData}) {

  function handleOnSubmit(e) {
    const loginInfo = {
      email: e.target[0].value,
      password: e.target[1].value
    }

    fetchApi(loginInfo)
  }

  function fetchApi(loginInfo){

      axios
      .post('http://localhost:8000/api/login',loginInfo,{headers: { 'content-type': 'application/json' }})
      .then(res => {
        localStorage.setItem('token', res.data.user.api_token)
        localStorage.setItem('name', res.data.user.name)
        localStorage.setItem('email', res.data.user.email)
        localStorage.setItem('rol', res.data.user.user_type_id)
        localStorage.setItem('user_id', res.data.user.id)
        onSetData({auth: true, warning: ''});
      })
      .catch(err => {
        onSetData({auth:false, warning:'the username/email or password are incorrent'})
      })
    
  }

  return (
    <div>
        
        <Form onSubmit={(event) => handleOnSubmit(event)}> 
            <Form.Input icon='mail' iconPosition='left' label='Email' placeholder='Email' name='mail'/>
            <Form.Input icon='lock' iconPosition='left' label='Password' type='password' name='password'/>
            <Button content='Login' type="submit" primary />
        </Form>
    </div>
  );
}

export default Login;
