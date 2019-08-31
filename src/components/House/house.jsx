import React, { Component } from 'react';
class House extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h3>Add House</h3>
                <form onSubmit={}>
                <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                onChange={event => this.handleOnChange(event)}
                value={this.state.firstName}
              />
            </div>
                </form>
            </div>
         );
    }
}
 
export default House;