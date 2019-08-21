import React, { Component } from 'react'
import { Modal, Icon, Button, Form } from 'semantic-ui-react'
import axios from 'axios'

class EditTicketModal extends Component {
    
  state = { open: false }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  handleSubmit(e){

    const ticketInfo = {
        id: this.props.id,
        name: e.target[0].value,
        ticket_requested: false,
        email: e.target[1].value
      }
      this.fetchApi(ticketInfo)
      this.close()
  }

  fetchApi(ticketInfo){

      axios
      .post('http://localhost:8000/api/editticket?api_token='+localStorage.getItem('token'),ticketInfo,{headers: { 'content-type': 'application/json' }})
      .then(res => {
        this.props.setNeedRefreshTable(1);
      })
      .catch(err => {
        this.props.onSetData({auth:true, warning: 'imposible to edit the ticket, must be a existing email user'});
      })
    
  }
  render() {
    
    const { open, size } = this.state

    return (
      <div>
        <Icon name='edit'  onClick={this.show('mini')} size='large' style={{float: "left", cursor:"pointer"}}/>
        <Modal onSubmit={this.handleSubmit.bind(this)} size={size} open={open} onClose={this.close} style={{"marginTop": "-150px"}}>
          <Modal.Header>Edit Ticket</Modal.Header>
          <Modal.Content>
            <Form>
                <Form.Field>
                    <label>Ticket Description</label>
                    <input placeholder='Must be specific please' />
                </Form.Field>
                <Form.Field>
                    <label>Asigned to</label>
                    <input placeholder='example@email.com'/>
                </Form.Field>
                <Button  type='submit'>Apply Edit</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default EditTicketModal