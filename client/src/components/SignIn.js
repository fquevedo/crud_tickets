import React from 'react';
import Login from './Login';
import { Segment, Grid, Divider, Button} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import Warning from './Warning'

function SignIn(props) {

    return (
      <div>
        {(props.warning === '') ? '' : <Warning warning={props.warning}/>}
        <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Login  onSetData={props.onSetData}/>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' textAlign="center">
            <Link to='/signup'><Button content='Sign up' icon='signup' size='big'/></Link>
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
      </div>
  
      );
  }
  

export default SignIn;



