import React, { useState, useRef, useEffect, Component } from 'react';
import Plan from './plan';
import PlanPage from './planpage';

import {paymentService} from '../../services/payment.service';

function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: 'USD',
                  value: product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: err => {
          setError(err);
          console.error(err);
        }
      })
      .render(paypalRef.current);
  }, [product.description, product.price]);

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought {product.name}!</h1>
        <img alt={product.description} src='' />
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <h1>
        {product.description} for ${product.price}
      </h1>
      <img alt={product.description} src={product.image} width="200" />
      <div ref={paypalRef} />
    </div>
  );
}


class PaymentModule  extends Component {
  state = {  }

  handleCreatePlan(e, plan){
    e.preventDefault();
    paymentService.createPlan(plan).then(response =>{
      console.log(response);
    });
  }
 
  render() { 
    return (
      <div className="col-10 col-md-8 vh-100 m-auto ">
        <PlanPage/>
       </div>);
  }
}
 
export default PaymentModule;