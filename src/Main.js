import React, { Component } from "react";
import { Box, Button, Heading, Grommet } from "grommet";
import { Notification } from 'grommet-icons';


import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import Friends from "./Friends";
import Login from "./Login";

const theme = {
	  global: {
		  colors: {
			  mainBrand: '#00c853',
			  whiteText: '#000000',
},
		      font: {
			            family: 'Roboto',
			            size: '18px',
			            height: '20px',
			          },
		    },
};

const AppBar = (props) => (
	  <Box
	    tag='header'
	    direction='row'
	    align='center'
	    justify='between'
	    background='mainBrand'
	    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
	    elevation='medium'
	    style={{ zIndex: '1' }}
	    {...props}
	  />
	);


class Main extends Component {

  render() {
    return (

	   <HashRouter>


        <Grommet theme={theme}>
	  <AppBar>
	    <Heading level='3' margin='none' color='white'>libresocialnetwork</Heading>
	    <Button icon={<Notification />} onClick={() => {}} />
	    </AppBar>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/posts">Posts</NavLink></li>
            <li><NavLink to="/friends">Friends</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>
          <div className="content">
	    <Route exact path="/" component={Home}/>
	    <Route path="/posts" component={Posts}/>
	    <Route path="/friends" component={Friends}/>
      <Route path="/login" component={Login}/>

          </div>
        </Grommet>
	    </HashRouter>
    );
  }
}

export default Main;
