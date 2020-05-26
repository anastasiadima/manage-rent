import React, { useState, useRef, useEffect, Component } from "react";
import { tenantService } from "../../services/tenant.service";
import {paymentService} from "../../services/payment.service";
class PlanListTenant extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      plans: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    var plans = tenantService.planList();
    plans.then(response => {
      if (this._isMounted) {
        this.setState({
          plans: response
        });
      }
    }); 
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const plans = this.state.plans.map(plan => (
      <div
        className="card  w-75"
        style={{
          backgroundColor: "#fff",
          color: "",
          padding: "20px 20px 0px",
          marginBottom: "10px"
        }}
        key={plan.id}
      >
        <div className="card-body text-center container">
          <div className="card-title d-flex flex-row justify-content-between">
            <h4>{plan.name}</h4>
            <span
              className="material-icons float-right"
              style={{ width: "24px", color: "#c7c7c7" }}
            >
              check_circle_outline
            </span>
          </div>

          <div className="row text-justify card-text">
            <div className="col-sm">
              <div style={{ color: "#999" }}>{plan.description}</div>
              <div>
                <p style={{ fontSize: "28px", color: "", fontWeight: "400" }}>
                  {plan.payment_definitions[0].amount.value}{" "}
                  {"USD"}
                </p>
                <p style={{ backgroundColor: "#fff", color: "#c7c7c7" }}>
                  {" "}
                  per {plan.payment_definitions[0].frequency} (
                  {plan.payment_definitions[0].cycles} cycles)
                </p>
              </div>
            </div>
          </div>
          {plan.subscribed ? (
            <span>Subscribed</span>
          ) : (
            <div>
              {/* <button href="#" className="btn bg-light">
              Subscribe
            </button> */}
              <Product
                product={{
                  description: plan.description,
                  name: plan.name,
                  price: plan.payment_definitions[0].amount.value,
                  currency: "USD",
                  id: plan.id
                }}
              />
            </div>
          )}
        </div>
      </div>
    ));
    return (
      <div className="">
        <h3>Subscriptions</h3>
        {plans}
      </div>
    );
  }
}

export function Product({ product }) {
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
                  currency_code: "USD",
                  value: product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
            //save order
            var paymentUnit = {
              planId: product.id,
              createdTime: order.create_time,
              purchaseUnitAmount: order.purchase_units[0].amount.value,
              purchaseUnitCurrency : "USD",
            }

            paymentService.createOrder(paymentUnit);
        }, 
        onError: err => {
          setError(err);
        }
      })
      .render(paypalRef.current);
  }, [product.description, product.price]);

  if (paidFor) {
    return (
      <div>
        <h5 style={{ color: "#ffcc54" }}>
          Congrats, you just bought {product.name}!
        </h5>
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <div ref={paypalRef} />
    </div>
  );
}
export default PlanListTenant;
