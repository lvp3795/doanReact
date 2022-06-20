import { Link } from "react-router-dom";

function AccountItem({ product, handleClick }) {
  console.log(product);
  const { _id, name, price, picture } = product;
  return (
    <Link
      to={`/chitiet/${_id}`}
      style={{ textDecoration: "none" }}
      onClick={handleClick}
    >
      <div className="wrapper-account">
        <img
          className="avatar"
          src={`http://localhost:3000/images/${picture}`}
          alt=""
        />
        <div className="info">
          <h4 className="name">{name}</h4>
          <span className="price">{price}</span>
        </div>
      </div>
    </Link>
  );
}

export default AccountItem;
