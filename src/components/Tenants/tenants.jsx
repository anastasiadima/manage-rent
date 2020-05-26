import React, { Component } from "react";
import TenantList from "./tenantsList";
import Tenant from "./tenant";
import { tenantService } from "../../services/tenant.service";
import { invitationService } from "../../services/invitations.service";
import EditTenant from "./editTenant";

class Tenants extends Component {
  _isMounted = false;
  state = {
    isCreateTenant: false,
    isEditTenant: false,
    tenantId: null,
    editTenant: {},
    tenants: [],
    emailErrorMessage: ""
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  addTenant = () => {
    this.setState({
      isCreateTenant: true
    });
  };

  backToListOftenants = () => {
    this.getTenants().then(res =>
      this.setState({
        isCreateTenant: false,
        isEditTenant: false,
        tenants: res
      })
    );
  };

  editTenant = (e, tenant) => {
    const id = e.target.id;
    tenantService.update(tenant);
    this.setState({
      isCreateTenant: false,
      isEditTenant: true,
      editTenant: tenant,
      tenantId: id
    });
  };

  handleCreateTenant(e, tenant) {
    e.preventDefault();
    tenantService.create(tenant);
    this.setState({
      isCreateTenant: false,
      isEditTenant: false
    });
  }

  handleUpdateTenant = (e, tenant) => {
    console.log("edit");
    const id = e.target.id;
    tenantService.update(tenant);
    this.setState({
      isCreateTenant: false,
      isEditTenant: true,
      editTenant: tenant,
      tenantId: id
    });
  };

  getTenants() {
    return tenantService.getAll();
  }

  inviteTenant = email => {
    //verify email
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      //userService.invite(email);
      console.log(email);
      invitationService.create({
        receiverEmail: email
      });
      let emailErrorMessage = "";
      this.setState({
        emailErrorMessage
      });
    } else {
      let emailErrorMessage = "Email is not valid";
      this.setState({
        emailErrorMessage
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.getTenants().then(response => {
      if (this._isMounted) {
        this.setState({
          tenants: response
        });
      }
    });
  }

  render() {
    return (
      <div className="col-10 col-md-8 vh-100 m-auto">
        {this.state.isCreateTenant ? (
          <Tenant
            tenantId={this.state.tenantId}
            onTenantsBack={this.backToListOftenants}
            onCreateTenant={this.handleCreateTenant}
          ></Tenant>
        ) : this.state.isEditTenant ? (
          <EditTenant
            tenant={this.state.editTenant}
            onUpdateTenant={this.editTenant}
            onTenantsBack={this.backToListOftenants}
          ></EditTenant>
        ) : (
          <TenantList
            tenants={this.state.tenants}
            emailErrorMessage={this.state.emailErrorMessage}
            onAddTenant={this.addTenant}
            onEditTenant={this.editTenant}
            onInviteTenant={this.inviteTenant}
          />
        )}
      </div>
    );
  }
}

export default Tenants;
