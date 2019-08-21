import React,{useState, useEffect} from 'react';
import Ticket from './Ticket';
import axios from 'axios';

function TicketList(props){
    const [tickets, setTickets] = useState([{}]);
  
    const [needRefresh, setNeedRefresh] = useState(0);
    const setNeedRefreshTable = (value) => setNeedRefresh(value);
  
    
    useEffect(() =>{
      
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
      
        })
      }
      (localStorage.getItem('rol') == 1) ? getUserTickets() : getTickets()
      setNeedRefreshTable(0)
      },[needRefresh, props]);
  
  
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
  


export default TicketList;



