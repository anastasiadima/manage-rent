import React from "react";

function onCancel(e){
  console.log(e);
}

function TenantList(props) {
  const {tenants, onAddTenant} = props;
  
  const listItems = tenants.map(tenant => (
    <li key={tenant.id.toString()} className="list-group-item">
      {tenant.firstName}
      <i
        className="material-icons float-right ml-2"
        style={{ color: "#f2664e", cursor: "pointer" }}
        aria-label="cancel"
        onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?'))  onCancel(e) } }
      >
        cancel
      </i>
      <i
        className="material-icons float-right"
        style={{ color: "#2956ab", cursor: "pointer" }}
        aria-label="edit"
      >
        edit
      </i>
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
