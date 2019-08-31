import React, { Component } from 'react';
import {House}  from './house';
import {HouseList} from './houseList';

class Houses extends Component {
    state = { 
        isCreateHouse: false
     }

     houses=[
         {
             id: 2,
             address: 'bd Moscovei 3, or Chisinau',
             name: 'Locuita 1',
             description: '',
             numberOfRooms: 1,
             owner: {
                 id: 2,
                 firstName: 'ana'
             }
         },
         {
            id: 1,
            address: 'bd Moscovei 12, or Chisinau',
            name: 'Locuita 2',
            description: '',
            numberOfRooms: 1,
            owner: {
                id: 2,
                firstName: 'ana'
            }
        }
     ]

     handleAddHouse (e) {

     }

     handleEditHouse (e) {

     }
     
     handleListOfHouses(){

     }

    render() { 
        return (  
            <div className="col-10 col-md-8 vh-100 m-auto">
                { (this.state.isCreateHouse) ? <House onHouseList={this.handleListOfHouses}></House> 
                            : <HouseList 
                            houses={this.houses} 
                            onAddHouse={this.handleAddHouse}
                            onEditHouse={this.handleEditHouse}
                            />
                        }
            </div>
        );
    }
}
 
export default Houses;