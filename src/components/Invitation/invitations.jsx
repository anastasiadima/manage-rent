import React, { Component } from "react";
import { invitationService } from "../../services/invitations.service";
import "./invitation.css";

class Invitations extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      invitations: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    invitationService.getAll().then(invitations => {
      if (this._isMounted) {
        this.setState({
          invitations
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  approveInvitation = e => {
    e.preventDefault();
    var id = this.getId(e);
    invitationService.approveInvitation(id);
    const newInvitations = this.state.invitations.map(i => 
      i.id == id? {...i, status: "APPROVED"} : i);
      this.setState({
        invitations: newInvitations
      });
  };
  deleteInvitation = e => {
    e.preventDefault();
    var id = this.getId(e);
    console.log(this.state.invitations);
    const newInvitations = this.state.invitations.filter(i =>
      i.id != id
      );
      this.setState({
        invitations: newInvitations
      });
    invitationService.delete(id);
  };
  cancelInvitation = e => {
    e.preventDefault();
    var id = this.getId(e);
    invitationService.cancelInvitation(id);
    const newInvitations = this.state.invitations.map(i => 
      i.id == id? {...i, status: "CANCELED"} : i);
      this.setState({
        invitations: newInvitations
      });
  };

  getId = e => {
    var id = e.target.attributes.id.nodeValue;
    return id;
  };
  render() {
    const { invitations } = this.state;
    const listItems = invitations.map(invitation => {
      var cancelColor = "#b3b3b3";
      var approveColor = "#b3b3b3";
      var isApproved = false;
      var isCanceled = false;
      switch (invitation.status) {
        case "APPROVED":
          approveColor = "#65c78e";
          isApproved = true;
          break;
        case "CANCELED":
          cancelColor = "#f2664e";
          isCanceled = true;
          break;
        default:
          break;
      }

      const colorA = approveColor;
      const colorC = cancelColor;
      console.log(approveColor);
      if (isApproved) {
        return (
          <li
            key={invitation.id}
            className="list-group-item"
            data-id={invitation.id}
          >
            {invitation.senderEmail}

            <i
              className="material-icons float-right ml-2"
              style={{ color: "#616161", cursor: "pointer" }}
              aria-label="delete"
              id={invitation.id}
              onClick={e => {
                this.deleteInvitation(e);
              }}
            >
              delete
            </i>
            <i
              className="material-icons float-right ml-2"
              style={{ color: colorA, cursor: "pointer" }}
              aria-label="cancel"
              id={invitation.id}
            >
              check_box
            </i>
          </li>
        );
      } else if (isCanceled) {
        return (
          <li
            key={invitation.id}
            className="list-group-item"
            data-id={invitation.id}
          >
            {invitation.senderEmail}

            <i
              className="material-icons float-right ml-2"
              style={{ color: "#616161", cursor: "pointer" }}
              aria-label="delete"
              id={invitation.id}
              onClick={e => {
                this.deleteInvitation(e);
              }}
            >
              delete
            </i>
            <i
              className="material-icons float-right ml-2"
              style={{ color: colorC, cursor: "pointer" }}
              aria-label="cancel"
              id={invitation.id}
            >
              cancel
            </i>
          </li>
        );
      }
      return (
        <li
          key={invitation.id}
          className="list-group-item"
          data-id={invitation.id}
        >
          {invitation.senderEmail}

          <i
            className="material-icons float-right ml-2"
            style={{ color: "#616161", cursor: "pointer" }}
            aria-label="delete"
            id={invitation.id}
            onClick={e => {
              this.deleteInvitation(e);
            }}
          >
            delete
          </i>
          <i
            className="material-icons float-right ml-2"
            style={{ color: colorC, cursor: "pointer" }}
            aria-label="cancel"
            id={invitation.id}
            onClick={e => {
              this.cancelInvitation(e);
            }}
          >
            cancel
          </i>
          <i
            className="material-icons float-right ml-2"
            style={{ color: colorA, cursor: "pointer" }}
            aria-label="cancel"
            id={invitation.id}
            onClick={e => {
              this.approveInvitation(e);
            }}
          >
            check_box
          </i>
        </li>
      );
    });

    return (
      <div className="col-10 col-md-8 vh-100 m-auto">
        <h3>Invitations</h3>
        <ul className="list-group ">{listItems}</ul>
      </div>
    );
  }
}

export default Invitations;
