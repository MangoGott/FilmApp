import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Redirect } from "react-router-dom";
import FavouriteGenre from "../FavouriteGenre/FavouriteGenre";
import { withCookies  } from 'react-cookie';

import "./Home.css";

class Home extends Component {

  
  constructor(props){
    super(props);
    this.state = {
    };
  }
  
  render() {
      console.log("Home getUser: ", this.props.model.getUser());
      if(this.props.model.getUser() === null){
          return <Redirect to="/"/>
      }
    return (
      <div className="row Home">
        {/* We pass the model as property to the Sidebar component */}
        <div className="col-lg-2 Sidebar">
        <Sidebar model={this.props.model} />
        </div>
        <div id="genreDiv" className="col-md-10">
            <FavouriteGenre state={this.state} model={this.props.model}/>
        </div>
      </div>
    );
  }
}
 
export default withCookies(Home);


