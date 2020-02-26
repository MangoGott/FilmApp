import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { withCookies  } from 'react-cookie';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            userName: "",
            status: "LOADED"
        };
        this.tmpUserName = "";
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


    handleChange(e){
        //this.tmpQuery = e.target.value;
        this.setState({
            userName: e.target.value
        });
        //this.setState({query: e.target.value});
    }

    handleLogin(){
        if(this.state.userName !== ""){
            this.setState({status: "LOADING"});
            this.props.model.login(this.state.userName).
            then(res => this.setState({status: "REDIRECT"}));
        }
    }


//className="form-inline"
    render() {
        if(this.state.status === "LOADING"){
            console.log(this.state.status);
            return <p>Loading...</p>
        }
        else if (this.state.status === "REDIRECT"){
            console.log("redirect getUser: ", this.props.model.getUser());
            console.log(this.state.status);
            return <Redirect to="/home"/>;
        }
        return (
            <div className="Login">
                <h2>Login</h2>
                <Form>
                    <Form.Group as={Row}>
                        <Col md={{ span: 2, offset: 5 }}>
                        <Form.Control type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter username"/>
                        </Col>
                    </Form.Group>
                        <Button id="loginBtn" variant="primary" type="button" onClick={this.handleLogin}>
                            Login
                        </Button>
                </Form>
            </div>
        );
    }
}

export default withCookies(Login);