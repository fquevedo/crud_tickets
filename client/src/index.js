import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Grid} from 'semantic-ui-react'
/*
|--------------------------------------------------------------------------
| Author: Fernando Quevedo A.
|--------------------------------------------------------------------------
*/
ReactDOM.render(
    <Grid columns='equal'>
    <Grid.Column></Grid.Column>
    <Grid.Column width={10}>
        <App />
    </Grid.Column>
    <Grid.Column></Grid.Column>
    </Grid>
, document.getElementById('root'));

serviceWorker.unregister();
