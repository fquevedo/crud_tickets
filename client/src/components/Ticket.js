import React from 'react';
import ConfirmRequestedModal from './modals/ConfirmRequestedModal';
import EditTicketModal from './modals/EditTicketModal';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import TicketModal from './modals/TicketModal';
import { Table, Checkbox} from 'semantic-ui-react'


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
  

export default Ticket;



