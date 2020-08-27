import React, {Component} from "react";
import ProductItem from "./ProductItem";
import Product from "../Interfaces and types/Product";
import {Link} from "react-router-dom";


type PizzaListState = {
    productList: Array<Product>
}

type PizzaListProps = {
    productList: Array<Product>,
    productEdit: Function,
}

class ProductList extends Component<PizzaListProps, PizzaListState>{
    constructor(props: PizzaListProps) {
        super(props);
        this.state = {
            productList: [...this.props.productList]
        }
    }

    render() {
        return(
            <div className="d-flex flex-column align-items-center">
                <button className="btn btn-outline-success mb-3"><Link to="/categories">Back to categories</Link></button>
                <div className="container align-items-start productList-wrapper">
                    {this.state.productList.map(
                        (element,index) => {
                            return(
                                <ProductItem
                                    key={index}
                                    index={index}
                                    productElement={element}
                                    productEdit={this.props.productEdit}
                                />
                            )
                        }
                    )}
                </div>
            </div>

        );
    }
}

export default ProductList;