import React, { Component } from 'react';
import TenantList from './tenantsList';
import Tenant from './tenant';
import { tenantService } from '../../services/tenant.service';

 class Tenants extends Component {
     state = { 
         isCreateTenant: false,
         isEditTenant: false,
         tenantId: null
      }
     tenants = [
         {
             firstName: "Anastasia",
             lastName: "Dima",
             email: "",
             id: 0,
             houseId: 0

         },
         {
            firstName: "Anastasi",
            lastName: "",
            email: "",
            id: 1,
            houseId: 0

        },
        {
            firstName: "Ana",
            lastName: "",
            email: "",
            id: 2,
            houseId: 0

        }
     ]

     addTenant = () => {
         this.setState({
            isCreateTenant: true
         });
     }

     backToListOftenants = () => {
        this.setState({
            isCreateTenant: false
         });
     }

     editTenant = (e) => {
        const id = e.target.id;
        this.setState({
            isCreateTenant: true,
            isEditTenant: true,
            tenantId: id
         });
     }

     render() { 
         return ( 
             <div className="col-10 col-md-8 vh-100 m-auto">
                        { (this.state.isCreateTenant) ? <Tenant isEdit={this.state.isEditTenant} tenantId={this.state.tenantId} onTenantsBack={this.backToListOftenants}></Tenant> 
                            : <TenantList 
                            tenants={this.tenants} 
                            onAddTenant={this.addTenant}
                            onEditTenant={this.editTenant}
                            />
                        }
             </div>
          );
     }
 }
  
 export default Tenants;