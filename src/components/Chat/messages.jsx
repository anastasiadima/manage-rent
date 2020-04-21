import React, { Component } from 'react';

class Messages extends Component {
    state = {  }
    renderMessage(message){
        const {text, member} = message;

        return (
            <li>
                <span
                    className=""
                    style={{background: member.clientData.color}}
                />
                <div>
                    {member.clientData.username}
                </div>
                <div className="text">
                    {text}
                </div>
            </li>
        );
    }
    render() { 
        const {messages} = this.props;
        return ( <div>
            <ul>
                {messages.map(m => this.renderMessage(m))}
            </ul>
        </div> );
    }
}
 
export default Messages;