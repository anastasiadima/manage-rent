import React, { Component } from "react";
import { invitationService } from "../services/invitations.service";

class Invitations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitations: []
    };
  }

  componentDidMount() {
    invitationService.getAll().then(invitations => {
      this.setState({
        invitations
      });
    });
  }

  approveInvitation = e => {};
  render() {
    const { invitations } = this.state;
    const listItems = invitations.map(invitation => (
      <li key={invitation.id} className="list-group-item">
        {invitation.senderEmail}
        <i
          className="material-icons float-right ml-2"
          style={{ color: "#f2664e", cursor: "pointer" }}
          aria-label="cancel"
          id={invitation.id}
          onClick={e => {
            approveInvitation(e);
          }}
        >
          check_box
        </i>
      </li>
    ));
    return (
      <div className="col-10 col-md-8 vh-100 m-auto">
        <h3>Invitations</h3>
        <ul className="list-group ">{listItems}</ul>
      </div>
    );
  }
}

export default Invitations;
