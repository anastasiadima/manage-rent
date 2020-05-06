import React, { Component } from "react";

const myStyle =
  "background-color: rgb(245, 245, 245); padding-left: 15px; padding-right: 15px; text-align: end; height: 50px; border-radius: 25px; border: 1px solid green; display: flex; align-items: center; justify-content: flex-end;";
var myAvatar = "https://data-eu.cometchat.io/assets/images/avatars/ironman.png";
var withAvatar = "https://data-eu.cometchat.io/assets/images/avatars/ironman.png";
class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendMessage = e => {
    e.preventDefault();
    var element = document.getElementById("messageText");
    var conversationDiv = document.getElementById("conversation-div");
    var message = element.value;
    var receiverUid = this.props.convUid;

    this.props.sendMessage(receiverUid, message).then(
      res => {
        console.log(res);
        element.value = "";
        var child = `
            <div
                style="background-color: #5294ff; color: #fff; margin-top: 15px; padding-left: 15px; padding-right: 15px; text-align: end; height: 50px; border-radius: 25px; border: 1px solid #5294ff; display: flex; align-items: center; justify-content: flex-end;"
              >
                <div>${message}</div>
                <img
                  src=${myAvatar} 
                  width='40px'
                />
                
              </div>`;

        var childNode = document.createElement("div");
        childNode.innerHTML = child;
        conversationDiv.appendChild(childNode);
      },
      error => {
        console.log(error);
      }
    );
  };

 
  render() {
    if (!!this.props.conversation && this.props.conversation.length > 0) {
      const { conversationWith, lastMessage } = this.props.conversation[0];
      console.log(conversationWith);
      if (conversationWith) {
        var { name } = conversationWith;
        var { sender, data, receiver } = lastMessage;
        if(sender.uid === conversationWith.uid){
            withAvatar = sender.avatar;
            myAvatar = receiver.avatar;
        } else {
            myAvatar = sender.avatar;
            withAvatar = receiver.avatar;
        }
      }
    }
    return (
      <div className="">
        <h4 className="mt-3">{this.props.name}</h4>
        <div>
        <div id="conversation-div">
        {!!this.props.conversation && this.props.conversation.length > 0 ? (
            <div>
              {sender.uid === this.props.convUid ? (
                <div
                  className=""
                  style={{
                    backgroundColor: "#f5f5f5",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    textAlign: "",
                    height: "50px",
                    borderRadius: "25px",
                    border: "1px solid #f5f5f5",
                    marginTop: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img src={withAvatar} width={"40px"} />
                  <div>{data.text}</div>
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: " #5294ff",
                    color: "#fff",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    textAlign: "end",
                    height: "50px",
                    borderRadius: "25px",
                    border: "1px solid  #5294ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <div>{data.text}</div>
                  <img src={myAvatar} width={"40px"} />
                </div>
              )}
          </div>
        ) : (
          <div></div>
        )}
            </div>

        </div>
        <div className="form-group" style={{ marginTop: "10px", display:"flex", justifyItems: "center", alignItems: "flex-end"  }}>
            <input
              type="text"
              id="messageText"
              style={{ width: "95%", height: "40px", border : "1px solid #dedede" }}
            ></input>
            <span className="material-icons" onClick={e => this.sendMessage(e)} style={{ width: "5%", color: " #5294ff", fontSize: "40px" }}>
              send
            </span>
          </div>
      </div>
    );
  }
}

export default Conversation;
