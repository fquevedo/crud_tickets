import React, { Component } from 'react'
import { Modal, Icon, Table } from 'semantic-ui-react'

class TicketModal extends Component {
    
  state = { open: false }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, size } = this.state

    return (
      <div>
        <Icon  onClick={this.show('mini')} name='search'  size='large' style={{ cursor:"pointer",float:"left"}}/>
        
        <Modal size={size} open={open} onClose={this.close} style={{"marginTop": "-150px"}}>
          <Modal.Header>Ticket Details</Modal.Header>
          <Modal.Content>
            
          <Table celled compact definition>
            <Table.Body  style={{"textAlign":'center'}}>
            
                <Table.Row><Table.Cell>{this.props.ticket.name}</Table.Cell></Table.Row>
                <Table.Row><Table.Cell>Asigned to: {this.props.ticket.username}</Table.Cell></Table.Row>
                <Table.Row><Table.Cell>{this.props.ticket.ticket_requested ? 'Requested' : 'Not Requested'}</Table.Cell></Table.Row>
                <Table.Row><Table.Cell>Created at: {this.props.ticket.created_at}</Table.Cell></Table.Row>
                <Table.Row><Table.Cell> {this.props.ticket.updated_at ? 'Updated at:'+this.props.ticket.updated_at : 'Not updated'}</Table.Cell></Table.Row>
                    
            </Table.Body>


            </Table> 
          </Modal.Content>

        </Modal>
      </div>
    )
  }
}

export default TicketModal