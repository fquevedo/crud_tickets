import React, { Component } from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios'

class ConfirmDeleteModal extends Component {

  state = { open: false }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  close = () => this.setState({ open: false })

  DeleteApi(){
    const data = {id : this.props.id};
    axios
    .post('http://localhost:8000/api/deleteticket?api_token='+localStorage.getItem('token'),data,{headers: { 'content-type': 'application/json' }})
    .then(res => {
        this.props.setNeedRefreshTable(1);
      })
    .catch(err => {
      this.props.onSetData({auth:true, warning: 'imposible to delete the ticket'});
    })
  }

  handleDelete(){
    this.DeleteApi()
    this.close()
  }
  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state

    return (
      <div>

        <Icon onClick={this.closeConfigShow(true, false)} name='delete'  size='large' style={{float: "left", cursor:"pointer"}}/>

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          style={{"marginTop": "-150px"}}
        >
          <Modal.Header>Delete Ticket</Modal.Header>
          <Modal.Content>
            <p>would you like to delete this ticket?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={this.handleDelete.bind(this)}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ConfirmDeleteModal