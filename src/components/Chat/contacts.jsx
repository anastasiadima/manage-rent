import React, { Component } from 'react';
import Conversation from "./conversation";

class Contacts extends Component {
    constructor(props){
        super(props);
        this.state = {
            contacts: props.contacts,
            loadConversation: false,
            conversationWith: "",
            conversation: {}
        }
       // this.openConversation = this.openConversation.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            contacts: nextProps.contacts,
            loadConversation: nextProps.loadConversation,
            conversationWith: nextProps.conversationWith,
            conversation: nextProps.conversation,
            conversationWithName: nextProps.conversationWithName
        });
    }

    openConversationWith = (e) => {
        e.preventDefault();
        var uid = e.target.id; 
        var name = "";
        if(!!document.getElementById(uid) && !!document.getElementById(uid).attributes 
        && !!document.getElementById(uid).attributes.name){
            name = document.getElementById(uid).attributes.name.value;
        }
        this.props.conversationWith(uid).then(response => {
            console.log(response);
            this.setState({
                loadConversation: true,
                conversationWith: uid,
                conversation: response,
                conversationWithName: name
            });
        });
    }

    render() { 
        const items = this.state.contacts.map(c => ( 
                <button className="btn" onClick={(e)=>{
                    this.openConversationWith(e)
                }} key={c.uid} >
                    <li className="list-group-item" id={c.uid} name={c.name}>{c.name}</li>
                </button>
        ));
        return ( 
        <div>
           {this.state.loadConversation ? (<Conversation convUid={this.state.conversationWith} name={this.state.conversationWithName} conversation={this.state.conversation} sendMessage={this.props.sendMessage}/>): (<div><h4>Contacts</h4><ul className="list-group">{items}</ul> </div>)}
        </div> );
    }
}
 
export default Contacts;