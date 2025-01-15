import { useContext } from "react";

import { ProductsContext } from "../../context/products.context";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div>
      <h1>Shop Pagee</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} alt={product.name} />
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};
export default Shop;
