import React, {useState, useEffect} from 'react';
import TicketList from './TicketList';
import CreateTicketModal from './modals/CreateTicketModal';
import { Table} from 'semantic-ui-react'

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


export default Admin;



