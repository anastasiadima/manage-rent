import React, { Component } from 'react';
import TenantList from './tenantsList';
import Tenant from './tenant';

 class Tenants extends Component {
     state = { 
         isCreateTenant: false
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

     addTenannt = () => {
         this.setState({
            isCreateTenant: true
         });
     }

     backToListOftenants = () => {
        this.setState({
            isCreateTenant: false
         });
     }

     render() { 
         return ( 
             <div className="col-10 col-md-8 vh-100 m-auto">
                        { (this.state.isCreateTenant) ? <Tenant onTenantsBack={this.backToListOftenants}></Tenant> 
                            : <TenantList 
                            tenants={this.tenants} 
                            onAddTenant={this.addTenannt}
                            />
                        }
             </div>
          );
     }
 }
  
 export default Tenants;