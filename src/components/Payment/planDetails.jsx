import React from 'react';

export function PlanDetails(props){
    const {planDetails, users} = props;
    const paymentDef = planDetails.payment_definitions.map(def => (
        <div key={def.id}>
             <p>Name: {def.name}</p>
            <p>Type: {def.type}</p>
            <p>Interval: {def.frequency_interval}</p>
            <p>Cycles: {def.cycles}</p>
            <p>Amount: {def.amount.currency} {def.amount.value} </p>
            <b>Charges:</b>
            {def.charge_models.map(charge_model=> (
                <div key={charge_model.id}>
                    <p> Type: {charge_model.type}</p>
                    <p> Amount:{charge_model.amount.currency} {charge_model.amount.value}</p>
                </div>
            ))}
        </div>
    ));
    const details = (
        <div key={planDetails.id}>
            <p><b>Name:</b> {planDetails.name}</p>
            <p><b>Description:</b> {planDetails.description}</p>
            <p><b>Type:</b> {planDetails.type}</p>
            <p><b>State:</b> {planDetails.state}</p>
            <p><b>Create Time:</b> {planDetails.create_time}</p>
            <p><b>Update time:</b> {planDetails.update_time}</p>
            <b>Definitions</b> {paymentDef}
        </div>
        );
 
    // const subscribe =  users.map(user =>(
    //     <div key={user.id}>
    //         {user.firstName} {user.lastName}
    //         {user.subscribed}
    //     </div>
    // ));
    const subsribedUsers= users.map(user => (
        <div>{user.firstName}</div>
    ));
    
    return (
        <div className="mt-5">
            <h3>Payment Details</h3> 
            {details}

            <h2>Subscribed Users</h2>
            {subsribedUsers}
            Subscribe users to paymentDe
            
        </div>
    );

}