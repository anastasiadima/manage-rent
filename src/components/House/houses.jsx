import React, { Component } from 'react';
import {House}  from './house';
import {HouseList} from './houseList';

class Houses extends Component {
    state = { 
        isCreateHouse: false
     }

     handleAddHouse (e) {

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
                            />
                        }
            </div>
        );
    }
}
 
export default Houses;