import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
import ChatService from "../../services/chat.service";
import Contacts from "./contacts";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: []
    };
  }

  login(uid) { 
    var apiKey = "4621045b400761d30d6c292bbe9f51121e37fb66";

    ChatService.login(uid, apiKey).then(
      user => {
        console.log("Login Successful:", { user });
        //this.sendMessage();
      },
      error => {
        console.log("Login failed with exception:", { error });
      }
    );
  }

  getLoggedUser() {
    ChatService.getLoggedinUser().then(
      user => {
        console.log("user details:", { user });
        this.setState({
          user
        });
      },
      error => {
        console.log("error getting details:", { error });
      }
    );
  }
  conversationWith = (uid) => {
    return ChatService.conversationWith(uid);
  }

  componentDidMount() {
    ChatService.init();
    if (this.props.currentUser.username == "admin"){
      this.login("SUPERHERO1"); 
    } else {
      this.login("SUPERHERO4");
    }
    ChatService.listOfContacts().then(contacts => {
      this.setState({
        contacts: contacts
      });
    });

    
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      currentUser: nextProps.currentUser
    });
  }
  sendMessage = (receiverUid, message)=>{
    return ChatService.sendMessage(receiverUid, message);
  }
  render() {
    
    return (
      <div className="col-10 col-md-8 vh-100 m-auto "> 
        <Contacts contacts={this.state.contacts} conversationWith={this.conversationWith} sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default Chat;
