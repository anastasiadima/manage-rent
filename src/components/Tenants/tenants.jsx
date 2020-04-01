import React, { Component } from "react";
import TenantList from "./tenantsList";
import Tenant from "./tenant";
import { tenantService } from "../../services/tenant.service";
import { userService } from "../../services/user.service";
import EditTenant from "./editTenant";

class Tenants extends Component {
  state = {
    isCreateTenant: false,
    isEditTenant: false,
    tenantId: null,
    editTenant: {},
    tenants: []
  };

  addTenant = () => {
    this.setState({
      isCreateTenant: true
    });
  };

  backToListOftenants = () => {
    this.setState({
      isCreateTenant: false,
      isEditTenant: false
    });
  };

  editTenant = (e, tenant)=> {
    const id = e.target.id;
    this.setState({
      isCreateTenant: false,
      isEditTenant: true,
      editTenant: tenant,
      tenantId: id
    });
  };

  handleCreateTenant(e, tenant){
    e.preventDefault();
    console.log(tenant);
    tenantService.create(tenant);
    this.setState({
      isCreateTenant: false,
      isEditTenant: false
    });
  }

  getTenants() {
    return tenantService.getAll();
  }
  inviteTenant(email){
    console.log(email);
    userService.invite(email);
  }
  componentDidMount() {
    this.getTenants().then(response =>
      this.setState({
        tenants: response
      })
    );
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
        ) :  this.state.isEditTenant ?
          <EditTenant tenant={this.state.editTenant} onTenantsBack={this.backToListOftenants}></EditTenant>
          : (<TenantList
            tenants={this.state.tenants}
            onAddTenant={this.addTenant}
            onEditTenant={this.editTenant}
            onInviteTenant={this.inviteTenant}
          />)
        }
      </div>
    );
  }
}

export default Tenants;
