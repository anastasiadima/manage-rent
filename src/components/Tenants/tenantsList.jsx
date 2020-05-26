import React from "react";
import { tenantService } from '../../services/tenant.service'; 

function onCancel(e){
  tenantService.delete(e.target.id);
}

function TenantList(props) {
  const {tenants, onAddTenant, onEditTenant, onInviteTenant, emailErrorMessage} = props;
  
  const listItems = tenants.map(tenant => (
    <li key={tenant.id.toString()} className="list-group-item">
      {tenant.email}
      <i
        className="material-icons float-right ml-2"
        style={{ color: "#f2664e", cursor: "pointer" }}
        aria-label="archive"
        id={tenant.id} 
        onClick={(e) => { if (window.confirm('Are you sure you wish to archive this item?')) onCancel(e) } }
      >
        archive
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
    </li>
  ));

  return (
    <div className="col-md-8 m-auto">
      <div>
        <h3>Invitations</h3>
        <div className="d-flex flex-row">
        <input type="text" className="form-control" placeholder="Email" id="invitationEmail" />
        <button className="btn btn-primary ml-2" onClick={(e) => { var input = document.getElementById("invitationEmail"); console.log(input); onInviteTenant(input.value); input.value = ""}}>Invite</button>
        </div>
        <div className="text-error">{emailErrorMessage}</div>
      </div>
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
