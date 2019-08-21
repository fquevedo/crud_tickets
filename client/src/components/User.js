import React from 'react';
import TicketList from './TicketList';
import { Table} from 'semantic-ui-react'

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



export default User;



