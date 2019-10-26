import React, { Component } from 'react';

class Popup extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div>
                    <h1>{this.props.text}</h1>
                    <button onClick={this.props.closePopup}>Close me</button>
                </div>
            </div>
         );
    }
}
 
export default Popup;