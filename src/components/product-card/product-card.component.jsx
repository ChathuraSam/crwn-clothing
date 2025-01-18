import Button from "../button/button-component";
import "./product-card.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cart-context";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  const { addItemsToCart } = useContext(CartContext);

  const addProductToCArt = () => {
    addItemsToCart(product);
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCArt}>
        ADD TO CART
      </Button>
    </div>
  );
};

export default ProductCard;
