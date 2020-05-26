import React,{useState , useEffect}  from "react";

export function HouseList(props) {
  const { onAddHouse, onEditHouse, onCancel } = props;
  const [houses, setHouses] = useState(props.houses);

  useEffect(()=>{
      setHouses(props.houses);
  },[props]);
 let listItems;
 if(houses){
     listItems =  houses.map(house => (
    <li key={house.id.toString()} className="list-group-item">
      {house.name}
      <i
        className="material-icons float-right ml-2"
        style={{ color: "#f2664e", cursor: "pointer" }}
        aria-label="cancel"
        id={house.id} 
        onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?'))  onCancel(e, house.id) } }
      >
        cancel
      </i>
      <i
        className="material-icons float-right"
        style={{ color: "#2956ab", cursor: "pointer" }}
        aria-label="edit"
        id={house.id}
        onClick={e => onEditHouse(e, house)}
      >
        edit
      </i>
    </li>
  )); 
 }

  return (
    <div className="col-md-8 m-auto">
      <h3 className="mb-3 mt-5 ">Houses</h3>

      <ul className="list-group ">{listItems}</ul>
      <button
        className="btn mt-3"
        aria-label="Add house"
        style={{ backgroundColor: "#29ab97", color: "#fff" }}
        onClick={() => onAddHouse()}
      >
        Add House
      </button>
    </div>
  );
}
