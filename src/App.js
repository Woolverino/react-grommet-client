import React, { Component } from "react";
import { Box, Button, Heading, Grommet } from "grommet";
import { Notification, Menu } from 'grommet-icons';

import 'bootstrap/dist/css/bootstrap.min.css'
import LoginWindow from './components/LoginWindow';
import Feed from './components/Feed';
import Tester from './components/Tester';
import Poster from './components/Poster';
import Home from "./components/Home";
import Posts from "./components/Posts";
import Friends from "./components/Friends";

import {setupFrontendListener} from 'eiphop';// listen to ipc responses
import {
	Route,
	NavLink,
	HashRouter
  } from "react-router-dom";
  
  
const electron = window.electron;
setupFrontendListener(electron);



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


class App extends Component {


	state = {
        id: 1,
        posts: [],
        connected: false
    };

    setConnected(status){
        this.setState({connected: status});
    }

    updatePosts(posts){
        if(posts!=null){
            var numposts = posts.length
            var i
            for(i = 0;i<numposts;i++){
                if(this.state.posts.some( post => post.id == posts[i].id)){
                    console.log("already in array")
                }else{
                    this.state.posts.push(posts[i])
                }
                
            }
            console.log(this.state)
        }
    }










  render() {
    return (

	   <HashRouter>


    <Grommet theme={theme} full>
	<Box fill>
	  <AppBar>
	    <Heading level='3' margin='none' color='white'>libresocialnetwork</Heading>
		<NavLink to="/Home" align='right'>Home</NavLink>
		<NavLink to="/posts">Posts</NavLink>
		<NavLink to="/friends">Friends</NavLink>
	    <Button icon={<Menu/>} onClick={() => {}} />
	    </AppBar>

	    <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
	    
			<Box width='25%'
			align='left'
			justify='left'
			background='white'
			border= '1px'
			>
			

			</Box>

			<Box width='50%'
			align='left'
			justify='left'
			background='white'
			border= '1px'
			>
			
			

			<Route exact path="/Home" component={Home}/>
			<Route path="/Posts" component={Posts}/>
			<Route path="/Friends" component={Friends}/>
				
			</Box>




			<Box width='25%'
			align='right'
			justify='right'
			background='white'
			border= '1px'
			>
			<div id="topFocused">{(this.state.connected) ? <Poster updatePosts={this.updatePosts.bind(this)} /> : <LoginWindow updatePosts={this.updatePosts.bind(this)} setConnected={this.setConnected.bind(this)}/>}</div>
					{(this.state.connected) ? <Feed  updatePosts={this.updatePosts.bind(this)} posts={this.state.posts}/> : <div></div>}
			
			
			</Box>
  
		</Box>
	
	    
	</Box>





        </Grommet>
	    </HashRouter>
    );
  }
}

export default App;
