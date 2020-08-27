import React from "react";
import Product from "../Interfaces and types/Product";

type ProductItemProps = {
  productEdit?: Function;
  index?: number;
  productElement: Product | undefined;
};

const ProductItem: React.FC<ProductItemProps> = (props: ProductItemProps) => {
  return (
    <div className="card pizzaItem">
      <h3 className="text-center mt-1">{props.productElement!.name}</h3>
      <img
        src={props.productElement?.photo}
        className="border card-img-top"
        alt={props.productElement!.name + " image"}
      />
      <div className="card-body">
        <div className="pizzaDescription">
          <p className="card-text">{props.productElement!.description}</p>
        </div>
        <div className="d-flex align-items-center mt-2 justify-content-between">
          <h5 className="">{props.productElement!.price}$</h5>
            <button
                onClick={() => props.productEdit!(props.productElement, props.index)}
                className="product_btn mb-2"
            >
                Edit
            </button>
        </div>
      </div>

    </div>
  );
};

export default ProductItem;
