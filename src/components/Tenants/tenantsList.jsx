import React from "react";
import { tenantService } from '../../services/tenant.service'; 

function onCancel(e){
  tenantService.delete(e.target.id);
}

function TenantList(props) {
  const {tenants, onAddTenant, onEditTenant, onInviteTenant} = props;
  
  const listItems = tenants.map(tenant => (
    <li key={tenant.id.toString()} className="list-group-item">
      {tenant.email}
      <i
        className="material-icons float-right ml-2"
        style={{ color: "#f2664e", cursor: "pointer" }}
        aria-label="cancel"
        id={tenant.id} 
        onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) onCancel(e) } }
      >
        cancel
      </i>
      <i
        className="material-icons float-right"
        style={{ color: "#2956ab", cursor: "pointer" }}
        aria-label="edit"
        id={tenant.id}
        onClick={(e) => onEditTenant(e, tenant) }
      >
        edit
      </i>
      <button type="button" className="btn btn-primary float-right ml-4 " onClick={(e) => onInviteTenant(tenant.email)}>Invite</button>
    </li>
  ));

  return (
    <div className="col-md-8 m-auto">
      <h3 className="mb-3 mt-5 ">Tenants</h3>

      <ul className="list-group ">{listItems}</ul>
      <button
        className="btn mt-3"
        aria-label="Add tenant"
        style={{ backgroundColor: "#29ab97", color: "#fff" }}
        onClick={() => onAddTenant()}
      >
        Add Tenant
      </button> 
    </div>
  );
}

export default TenantList;
