
import React, { Component } from 'react'
import { Button, Modal, Checkbox } from 'semantic-ui-react'
import axios from 'axios'

class ConfirmRequestedModal extends Component {

  state = { open: false }
  

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  close = () => this.setState({ open: false })

  UpdateApi(){
    console.log(this.props)
    const data = {id : this.props.id};
    axios
    .post('http://localhost:8000/api/requestticketticket?api_token='+localStorage.getItem('token'),data,{headers: { 'content-type': 'application/json' }})
    .then(res => {
        this.props.setNeedRefreshTable(1);
      })
    .catch(err => {
      this.props.onSetData({auth:true, warning: 'imposible to request the ticket'});
    })
  }

  handleUpdate(){
    this.UpdateApi()
    this.close()
  }
  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state

    return (
      <div>
        <Checkbox onClick={this.closeConfigShow(true, false)} slider checked={this.props.checked}/>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          style={{"marginTop": "-150px"}}
        >
          <Modal.Header>Delete Ticket</Modal.Header>
          <Modal.Content>
            <p>would you like to request this ticket?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={this.handleUpdate.bind(this)}
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

export default ConfirmRequestedModal