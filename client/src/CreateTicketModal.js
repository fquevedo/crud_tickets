import React, { Component } from 'react'
import { Modal, Icon, Button, Form } from 'semantic-ui-react'
import axios from 'axios'

class CreateTicketModal extends Component {
    
  state = { open: false }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  handleSubmit(e){

    const ticketInfo = {
        name: e.target[0].value,
        ticket_requested: false,
        email: e.target[1].value
      }
      this.fetchApi(ticketInfo)
      this.close()
  }

  fetchApi(ticketInfo){

      axios
      .post('http://localhost:8000/api/createticket?api_token='+localStorage.getItem('token'),ticketInfo,{headers: { 'content-type': 'application/json' }})
      .then(res => {
        this.props.handleSetNeedRefresh(1);
      })
      .catch(err => {
        this.props.onSetData({auth:true, warning: 'imposible to create the ticket, email doesnt exist'});
      })
    
  }
  render() {

  
    const { open, size } = this.state

    return (
      <div>
        <Button onClick={this.show('mini')} floated='right' icon labelPosition='left' primary size='small'>
            <Icon name='plus' /> Create Ticket
        </Button>
        <Modal onSubmit={this.handleSubmit.bind(this)} size={size} open={open} onClose={this.close} style={{"marginTop": "-150px"}}>
          <Modal.Header>Create Ticket</Modal.Header>

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
                <Button  type='submit'>Create</Button>
            </Form>
          </Modal.Content>

        </Modal>
      </div>
    )
  }
}

export default CreateTicketModal