import React,{ useState, useRef, useEffect, Component } from "react";
import { tenantService } from "../../services/tenant.service";
class PlanListTenant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plans: []
    };
  }

  componentDidMount() {
    var plans = tenantService.planList();
    plans.then(response => {
      this.setState({
        plans: response
      });
    });
    console.log(plans);
  }
  render() {
    const plans = this.state.plans.map(plan => (
      <div
        className="card  w-75"
        style={{ backgroundColor: "#fff", color: "#5ab3a2" }}
        key={plan.id}
      >
        <div className="card-body text-center ">
          <h3>{plan.name}</h3>
        </div>
        <div className="card-footer text-center">
          {plan.subscribed ? (
            <span>Subscribed</span>
          ) : (
              <div>
                  {/* <button href="#" className="btn bg-light">
              Subscribe
            </button> */}
            <Product product={{
            description: plan.description,
            name: plan.name,
            price: plan.payment_definitions[0].amount.value,
            currency: plan.payment_definitions[0].currency
            }}/>
              </div>
            
          )}
        </div>
      </div>
    ));
    return (
      <div className="">
        <h3>Your Subscriptions</h3>
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
                  currency_code: product.currency,
                  value: product.price
                }
              }
            ]
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
        <h5 style={{ color: "#ffcc54" }}>Congrats, you just bought {product.name}!</h5>
        <img alt={product.description} src="" />
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <img alt={product.description} src={product.image} width="200" />
      <div ref={paypalRef} />
    </div>
  );
}
export default PlanListTenant;
