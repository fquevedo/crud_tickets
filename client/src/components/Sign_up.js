import React from 'react';
import { Button, Form} from 'semantic-ui-react'
import axios from 'axios';



const options = [
  { key: '1', text: 'Usuario', value: '1' },
  { key: '2', text: 'Admin', value: '2' },
]

class Sign_up extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: '',
      mail: '',
      rol: '',
      password: ''
    };
  }

  handleChange(event) {
    const state_name = event.target.name;
    this.setState({[state_name]: event.target.value});
  }
  handleChangeDropdown = (e, { value }) => this.setState({ rol: value })
  

  signup(e){
    
    const state = this.state;

    const data = {
      "name": state.user,
      "email": state.mail,
      "user_type_id": state.rol,
      "password": state.password,
      "password_confirmation":state.password

    };

    axios
    .post('http://localhost:8000/api/register',data,{headers: { 'content-type': 'application/json' }})
    .then(res => {

      localStorage.setItem('token', res.data.user.api_token)
      localStorage.setItem('name', res.data.user.name)
      localStorage.setItem('email', res.data.user.email)
      localStorage.setItem('rol', res.data.user.user_type_id)
      localStorage.setItem('user_id', res.data.user.id)
      this.props.onSetData({auth: true, warning: ''});
    
    })
    .catch(err => {
      this.props.onSetData({auth:false, warning:'the email required is already taken or password have less than 8 characters'})
    })
    
  }
  render() {
    const { currentValue } = this.state
    return (
      <div>
        <Form > 
          <Form.Input name='user' icon='user' iconPosition='left' label='Username' placeholder='Username' onChange={this.handleChange.bind(this)}/>
          <Form.Input name='mail' iconPosition='left' icon='mail' label='Email' placeholder='joe@schmoe.com'  onChange={this.handleChange.bind(this)}/> 
          <Form.Field>
            <label>User Rol</label>
            <Form.Select  options={options} placeholder='Select a user rol' value={currentValue}  onChange={this.handleChangeDropdown.bind(this)}/>
          </Form.Field>
          <Form.Input name='password' icon='lock' iconPosition='left' label='Password' type='password'  onChange={this.handleChange.bind(this)}/>
          <Button onClick={this.signup.bind(this)} content='Sign up' type="submit" primary />
        </Form>
      </div>
    );
  }
};

export default Sign_up;




