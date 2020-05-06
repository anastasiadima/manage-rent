import React, { useState, useRef, useEffect, Component } from "react";
import { tenantService } from "../../services/tenant.service";
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
    console.log(plans);
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
                  {plan.payment_definitions[0].amount.currency}
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
                  currency: plan.payment_definitions[0].currency
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
        // createOrder: (data, actions) => {
        //   return actions.order.create({
        //     purchase_units: [
        //       {
        //         description: product.description,
        //         amount: {
        //           currency_code: product.currency,
        //           value: product.price
        //         }
        //       }
        //     ]
        //   });
        createSubscription: function(data, actions) {
          return actions.subscription.create({
            plan_id: "P-5M814020L2441893DU4XVITY",
            start_time: "2020-05-04T00:00:00Z",
            quantity: "1",
            shipping_amount: {
              currency_code: "USD",
              value: "10.00"
            },
            subscriber: {
              name: {
                given_name: "John",
                surname: "Doe"
              },
              email_address: "customer@example.com",
              shipping_address: {
                name: {
                  full_name: "John Doe"
                },
                address: {
                  address_line_1: "2211 N First Street",
                  address_line_2: "Building 17",
                  admin_area_2: "San Jose",
                  admin_area_1: "CA",
                  postal_code: "95131",
                  country_code: "US"
                }
              }
            },
            application_context: {
              brand_name: "walmart",
              locale: "en-US",
              shipping_preference: "SET_PROVIDED_ADDRESS",
              user_action: "SUBSCRIBE_NOW",
              payment_method: {
                payer_selected: "PAYPAL",
                payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
              },
              return_url: "https://example.com/returnUrl",
              cancel_url: "https://example.com/cancelUrl"
            }
          });
        },
        // onApprove: async (data, actions) => {
        //   const order = await actions.order.capture();
        //   setPaidFor(true);
        //   console.log(order);
        // },
        onApprove: function(data, actions) {
          alert(
            "You have successfully created subscription " + data.subscriptionID
          );
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
