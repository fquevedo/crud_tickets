import React, {useState, useEffect} from 'react';
import { Segment, Grid, Button, Divider, Checkbox, Icon, Table, Label} from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import axios from 'axios';
import Signup from './Sign_up';
import Login from './Login';
import TicketModal from './TicketModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ConfirmRequestedModal from './ConfirmRequestedModal';
import CreateTicketModal from './CreateTicketModal';
import EditTicketModal from './EditTicketModal';
import Warning from './Warning';

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
   

function SignUp(props) {
  return  (
    <div>
      {(props.warning === '') ? '' : <Warning warning={props.warning}/>}
      <Segment placeholder>
      <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Signup onSetData={props.onSetData}/>
          </Grid.Column>
          <Grid.Column verticalAlign='middle' textAlign="center">
          <Link to='/signin'><Button content='Login' icon='signup' size='big'/></Link>
          </Grid.Column>
        </Grid>
        <Divider vertical>Or</Divider>
      </Segment> 
    </div>

  );
}

function SignIn(props) {

  return (
    <div>
      {(props.warning === '') ? '' : <Warning warning={props.warning}/>}
      <Segment placeholder>
      <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Login  onSetData={props.onSetData}/>
          </Grid.Column>
          <Grid.Column verticalAlign='middle' textAlign="center">
          <Link to='/signup'><Button content='Sign up' icon='signup' size='big'/></Link>
          </Grid.Column>
        </Grid>
        <Divider vertical>Or</Divider>
      </Segment>
    </div>

    );
}

function User(props){
  const userRol = localStorage.getItem('rol');
  return (
     <Table celled compact definition>
     <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan='4'>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>Requested</Table.HeaderCell>
          <Table.HeaderCell>Ticket</Table.HeaderCell>
          <Table.HeaderCell>Registration Date</Table.HeaderCell>
          {(userRol == 2) ? <Table.HeaderCell>Asigned to</Table.HeaderCell> : ''}
          {(userRol == 2) ? <Table.HeaderCell>Options</Table.HeaderCell> : ''}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <TicketList onSetData={props.onSetData}/> 
      </Table.Body>
    </Table> 
  );
}


function Admin(props) {
  const [needRefresh, setNeedRefresh] = useState(0);
  const handleSetNeedRefresh = (value) => setNeedRefresh(value);

  useEffect(() =>{
    handleSetNeedRefresh(0);

  }, [needRefresh])

  return (
         <Table celled compact definition>
         <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                <CreateTicketModal onSetData={props.onSetData} handleSetNeedRefresh={handleSetNeedRefresh}/>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>Requested</Table.HeaderCell>
              <Table.HeaderCell>Ticket</Table.HeaderCell>
              <Table.HeaderCell>Registration Date</Table.HeaderCell>
              <Table.HeaderCell>Asigned to</Table.HeaderCell>
              <Table.HeaderCell>Options</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          <TicketList refreshFromAdmin={needRefresh}  onSetData={props.onSetData}/>  
          </Table.Body>
        </Table> 
     
    );
}

function TicketList(props){
  const [tickets, setTickets] = useState([{}]);

  const [needRefresh, setNeedRefresh] = useState(0);
  const setNeedRefreshTable = (value) => setNeedRefresh(value);

  useEffect(() =>{
    (localStorage.getItem('rol') == 1) ? 
      getUserTickets()
    :
      getTickets()
    setNeedRefreshTable(0)
    },[needRefresh, props.refreshFromAdmin]);

  const getTickets = () => {
    axios
    .get('http://localhost:8000/api/gettickets?api_token='+localStorage.getItem('token'))
    .then(res => {
        setTickets(res.data)
      })
    .catch(err => {
      props.onSetData({auth:true, warning: 'imposible to get tickets'});
    })
  }
  const getUserTickets = () => {
    const data = {user_id : localStorage.getItem('user_id')}
    axios
    .post('http://localhost:8000/api/getusertickets?api_token='+localStorage.getItem('token'), data,{headers: { 'content-type': 'application/json' }})
    .then(res => {
        setTickets(res.data)
      })
    .catch(err => {
      props.onSetData({auth:true, warning: 'imposible to get tickets'});
    })
  }

  const renderRows = () => {
        return tickets.map(function(elem, key){
          return <Ticket  
                  key={key}
                  id={elem.id}
                  name={elem.name} 
                  users_id={elem.users_id} 
                  ticket_requested={elem.ticket_requested} 
                  created_at={elem.created_at}
                  username={elem.username}
                  onSetData={props.onSetData}
                  setNeedRefreshTable = {setNeedRefreshTable}
                 />
        })  
  }

  return (renderRows());
}


function Ticket(props){
  const userRol = localStorage.getItem('rol');
  const checked = (props.ticket_requested === 1) ? true : false;
  return <Table.Row>
          <Table.Cell collapsing>
          {
            (userRol == 2) ? 
            <Checkbox disabled slider checked={checked}/> :  
            <ConfirmRequestedModal checked={checked}  id={props.id} setNeedRefreshTable={props.setNeedRefreshTable} onSetData={props.onSetData}/>
          }
            </Table.Cell>
          <Table.Cell>{props.name}</Table.Cell>
          <Table.Cell>{props.created_at}</Table.Cell>
          {(userRol == 2) ? <Table.Cell>{props.username}</Table.Cell> : ''}
          {(userRol == 2) ? <Table.Cell style={{'minWith': '70px'}}>
            <TicketModal ticket={props} />
            <EditTicketModal setNeedRefreshTable={props.setNeedRefreshTable} id={props.id} onSetData={props.onSetData}/>
            <ConfirmDeleteModal  setNeedRefreshTable={props.setNeedRefreshTable} id={props.id} onSetData={props.onSetData}/>
          </Table.Cell>
          : 
          ''}
        </Table.Row>
}




export default App;



