import React from 'react';
import Signup from './Sign_up';
import Warning from './Warning';
import { Grid, Segment, Divider, Button} from 'semantic-ui-react'
import {Link} from "react-router-dom";

function SignUp(props) {
    return  (
      <div>
        {(props.warning === '') ? '' : <Warning warning={props.warning}/>}
        <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Signup onSetData={props.onSetData}/>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' textAlign="center">
            <Link to='/signin'><Button content='Login' icon='signup' size='big'/></Link>
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment> 
      </div>
  
    );
  }
  


export default SignUp;



