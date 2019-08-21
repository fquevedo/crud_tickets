import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class Warning extends Component {
  state = { visible: true }

  handleDismiss = () => {
    this.setState({ visible: false })
  }



  render() {
    console.log(this.props)
    if (this.state.visible) {
      return (
        <Message error
          onDismiss={this.handleDismiss}
          header='Error'
          content={this.props.warning}
        />
      )
    }

    return (
      ''
    )
  }
}

export default Warning