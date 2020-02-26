import React, { Component } from "react";
import { withCookies} from 'react-cookie';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import './Sidebar.css';


class Sidebar extends Component {


  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    //this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    //this.props.model.removeObserver(this);
  }


  render() {


    return (
      <div className="col-lg-2 Sidebar">
        <Navbar variant="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/search">Find Movies</Nav.Link>
            <Nav.Link href="/myMovies">My Movies</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withCookies(Sidebar);
