import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
//import modelInstance from "../data/DinnerModel";
import "./MovieLists.css";
import ListGroup from "react-bootstrap/ListGroup";
//import { Link } from 'react-router-dom'
import { withCookies} from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import {Button, Modal, Form, Alert} from "react-bootstrap";


class MovieLists extends Component {
    constructor(props) {
        super(props);
        // We create the state to store the various statuses
        // e.g. API data loading or error
        this.state = {
            status: "LOADING",
            change: null,
            show: false,
            alert: false
        };
        let tmpListName = "";

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount(){
        this.props.model.addObserver(this);
        //console.log("observer added");
    }

    componentWillUnmount(){
        this.props.model.removeObserver(this);
    }

    update(changeDetails) {
        //console.log("CHANGHE");
        if(changeDetails==="add") {
            //console.log("add");
            this.setState({
                change: "inList"
            });
        } else if(changeDetails==="remove") {
            this.setState({
                change:"notInList"
            });
        }
    }


    handleClick(value){
        console.log(value + " clicked");
        // this.props.model.addToMenu(this.state.dish);
        if(value === "newList"){
            console.log("make a new List");
            this.setState({
                show: true
            });
        } else if(this.props.model.isInList(this.props.movieId, value) && value !== undefined) {
            //remove movie from list with name e.target.value
            this.props.model.removeFromList(value, this.props.movieId, this);
        } else if(value !== undefined){
            this.props.model.addToList(value, this.props.movieId, this.props.genres, this);
            console.log("add to list " + value);
        } else {
            console.log("UNDEFINED");
        }
    }

    handleChange(e) {
        this.tmpListName = e.target.value;

    }

    handleClose() {
        this.setState({
            show: false,
            alert: false});
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleCreate(e) {
        e.preventDefault();
        console.log(this.tmpListName === undefined);
        if(this.tmpListName === undefined){
            console.log("no name");
            this.setState({alert : true});
        }else {
            this.props.model.createMovieList(this.tmpListName);
            this.props.model.addToList(this.tmpListName, this.props.movieId, this.props.genres, this);
            this.setState(
                {show: false,
                alert: false});
        }
    }


    truncate(string, pos, character){
        if(typeof (character) === undefined){
            character = '...';
        }

        if(typeof (pos) === undefined){
            pos = 0;
        }
        if(string.length < pos){
            return string;
        }

        return(string.substr(0, pos) + character);

    }


    fetchLists() {
        let lists = this.props.model.getAllMovieLists();;
        let inList;

        return lists.map(item => (
            inList = this.props.model.isInList(this.props.movieId, item.name),
            <ListGroup.Item onClick={this.handleClick.bind(this, item.name)}
                            className = "CLICKME"
                            key={item.name}
                            value={item.name}
                            variant={inList?"danger":"success"}
                            id="listItem"
                            action>
                <b>{inList?"Remove from" :
                    "Add to"} {this.truncate(item.name, 10, '...')} <FontAwesomeIcon icon={inList?(faMinusSquare):(faPlusSquare)}
                                                                                     size="lg"
                                                                                     pull="right"
                                                                                     onClick={this.handleClick.bind(this, item.name)}/></b>
            </ListGroup.Item>
        ));
    }

    render() {
        let myLists = this.fetchLists();
        return (
           <div>
               <h3>Manage Lists</h3>
               <div id="listGroup">
                   <ListGroup
                       id="listItem"
                       variant="flush">
                       {myLists}
                       <ListGroup.Item action onClick={this.handleClick.bind(this, "newList")}
                                       value="newList"
                                       id="listItem"
                                       variant="success">
                           <b>Add to a new list  <FontAwesomeIcon icon={faPlusSquare}
                                                                  size="lg"
                                                                  pull="right"/></b>
                       </ListGroup.Item>
                   </ListGroup>
               </div>
               <Modal show={this.state.show} onHide={this.handleClose}>
                   <Modal.Header closeButton>
                       <Modal.Title>Create a new list</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       <Alert show={this.state.alert} variant={"danger"}>List must have a name.</Alert>
                       <Form.Label>Name of list</Form.Label>
                       <Form.Control type="input" onChange={this.handleChange} placeholder="List name" ref="formControl"/>
                   </Modal.Body>
                   <Modal.Footer>
                       <Button variant="secondary" onClick={this.handleClose}>
                           Cancel
                       </Button>
                       <Button variant="primary" onClick={this.handleCreate}>
                           Create List
                       </Button>
                   </Modal.Footer>
               </Modal>
           </div>
        );
    }
}

export default withCookies(MovieLists);
