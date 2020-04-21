import { CometChat } from "@cometchat-pro/chat";
import * as config from "../helpers/api-config";

class ChatService {
  static APP_ID = config.cometChatApiId();
  static APP_KEY = config.cometChatApiKey();
  static region = "eu";

  static init() {
    var appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(this.region)
      .build();

    CometChat.init(this.APP_ID, appSetting).then(
      () => {
        console.log("Chat initialized");
      },
      error => {
        console.log("Error ${error}", error);
      }
    );
  }

  static getMessage(uid, text, messageType) {
    if (messageType === "user") {
      return new CometChat.TextMessage(
        uid,
        text,
        CometChat.RECEIVER_TYPE.USER
      );
    } else return new CometChat.TextMessage(uid, text, CometChat.MESSAGE_TYPE.TEXT, CometChat.RECEIVER_TYPE.GROUP);
  }

  static getLoggedinUser(){
      return CometChat.getLoggedinUser();
  }

  static login(uid){
    return CometChat.login(uid, this.APP_KEY);
  }

  static getGroupMessage(guid, callback, limit = 30){
    const messageRequest = new CometChat.MessagesRequestBuilder()
        .setGUID(guid)
        .setLimit(limit)
        .build();
    callback();
    return messageRequest.fetchPrevious();
  }

  static sendGroupMessage(uid, message){
      const textMessage = this.getMessage(uid, message, "group");
      return CometChat.sendMessage(textMessage);
  }

  static sendMessage(receiverUid, text){
    const textMessage = this.getMessage(receiverUid, text, "user");
    console.log(textMessage);
      return CometChat.sendMessage(textMessage);
  }

  static addMessageListener(callback) {
    CometChat.addMessageListener(
      this.LISTENER_KEY_MESSAGE,
      new CometChat.MessageListener({
        onTextMessageReceived: textMessage => {
          callback(textMessage);
        }
      })
    );
  }

  static registerChatUser(user) {
    const {firstName, lastName, username} = user;
    const fullName = firstName + " " + lastName;
    
    var user = new CometChat.User(username);
    user.setName(fullName);

    CometChat.createUser(user, this.APP_KEY).then(
      user => {
        console.log("user created", user);
      },
      error => {
        console.log("error", error);
      }
    );
  }

  static listOfContacts(){
    var req = new CometChat.UsersRequestBuilder().setLimit(20).build();

    return req.fetchNext();
  }

  static conversation() {
    var conversationsRequest = new CometChat.ConversationsRequestBuilder()
    .setLimit(50)
    .setConversationType("user") 
    .build();

    return conversationsRequest.fetchNext();
  }

  static conversationWith(withUid){
    //debugger;
     var selectedConversation = this.conversation().then(conversations => {
       console.log(conversations);
      var filteredConversation  = conversations.filter(conv => !!conv.conversationWith && conv.conversationWith.uid === withUid )
      return filteredConversation;
    });
     
    return selectedConversation;
  }
}

export default ChatService;