import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat"; 

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  initChat() {
    var appId = "16126c6e1c121eb";
    var region = "eu";
    var appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();

    CometChat.init(appId, appSetting).then(
      () => {
        console.log("Chat initialized");
      },
      error => {
        console.log("Error ${error}", error);
      }
    );
  }

  createChatUser() {
    let apiKey = "4621045b400761d30d6c292bbe9f51121e37fb66";
    var uid = "admin";
    var name = "Anastasia Dima";

    var user = new CometChat.User(uid);

    user.setName(name);

    CometChat.createUser(user, apiKey).then(
      user => {
        console.log("user created", user);
      },
      error => {
        console.log("error", error);
      }
    );
  }

  login(){
    var UID = "SUPERHERO1";
    var apiKey = "4621045b400761d30d6c292bbe9f51121e37fb66";
    
    CometChat.login(UID, apiKey).then(
      user => {
        console.log("Login Successful:", { user });   
        //this.sendMessage();
      },
      error => {
        console.log("Login failed with exception:", { error });    
      }
    );
  }

  sendMessage() {
    var receiverID = "SUPERHERO2";
    var messageText = "Hello";
    var receiverType = CometChat.RECEIVER_TYPE.USER;

    var textMessage = new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType
    );

    CometChat.sendMessage(textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
        // Do something with message
      },
      error => {
        console.log("Message sending failed with error:", error);
        // Handle any error
      }
    );
  }

  render() {
    this.initChat();
    //this.createChatUser();
    this.login();
    return (<div>chat</div>);
  }
}

export default Chat;
