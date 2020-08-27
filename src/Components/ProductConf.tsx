import React, { Component } from "react";
import ProductItem from "./ProductItem";
import Product from "../Interfaces and types/Product";
import getCookie from "../getCookie";
import CategoryDropDown from "./CategoryDropDown";



async function deleteProduct(url: string) {
  if(window.confirm("Are you sure")){
    fetch(url, {
      method: "DELETE",
    });
  }
}

async function putProductItem(url: string, updatedProductItem: any) {
  if(window.confirm("Are you sure")){
    let changeProduct = new FormData();

    changeProduct.append("Photo", updatedProductItem.photo);
    changeProduct.append("Name", updatedProductItem.name);
    changeProduct.append("Price", updatedProductItem.price);
    changeProduct.append("IsAvailable", updatedProductItem.isAvailable);
    changeProduct.append("CategoryId", updatedProductItem.categoryId);
    changeProduct.append("Description", updatedProductItem.description);
    changeProduct.append("id", updatedProductItem.id);

    await fetch(url, {
      method: "PUT",
      body: changeProduct,
      headers:{
        "Authorization" : "Bearer "+ getCookie("token")
      }
    });
  }
}

type ProductConfState = {
  productElement: Product | undefined;
};

type ProductConfProps = {
  productElement: Product | undefined;
  exitConfig: Function;
  productElementChangeIndex: number | undefined;
  deleteProduct: Function;
  changeProduct: Function;
};

class ProductConf extends Component<ProductConfProps, ProductConfState> {
  private readonly url: string;
  constructor(props: any) {
    super(props);
    this.state = {
      productElement: this.props.productElement,
    };

    this.url =
      "https://twopizzaproject.azurewebsites.net/api/v1/Products/" +
      this.state.productElement!.id;
  }

  changeName(value: any) {
    this.setState(
      (state: ProductConfState) => (state.productElement!.name = value)
    );
  }

  changeDescription(value: any) {
    this.setState(
      (state: ProductConfState) => (state.productElement!.description = value)
    );
  }


  changePrice(value: any) {
    this.setState(
      (state: ProductConfState) => (state.productElement!.price = value)
    );
  }

  changeCategoryId(value: any){
    this.setState(
        (state: ProductConfState) => (state.productElement!.categoryId = value)
    );
  }

  changeIsAvailable(){

    const product: Product | undefined = this.state.productElement
    product!.isAvailable = !product!.isAvailable
    this.setState(
        {
          productElement : product
        }
    );
  }

  validation(url: string, element: Product | undefined){
    const name = document.getElementById("name")
    const description = document.getElementById("description")
    const price = document.getElementById("price")
    const categoryId = document.getElementById("categoryId")
    let errors = false;

    if(name!.innerHTML.length <= 6){
      errors = true;
      console.log("name : ", name!)
      alert("Name cannot have less then 6 characters")
    }
    if(description!.innerHTML.length <= 25){
      errors = true;
      console.log("Description : " , description!.innerHTML.length)
      description!.after("Description cannot have less then 25 characters")
    }
    if(price!.innerHTML.length == null){
      errors = true;
      price!.after("Price cannot be null")
    }
    if(categoryId!.innerHTML.length == null){
      errors = true;
      categoryId!.after("CategoryId cannot be null")
    }

    if(errors){
      alert("Here some errors")
      return
    }
    putProductItem(url, element).then(() => alert("Request is successful"));
  }

  render() {
    return (
      <div className="container mt-3 productConf-wrapper align-items-center">
        <div className="product_conf">
          <label className="" htmlFor="PizzaNameEditInput">
            Pizza name
          </label>

          <input
            onChange={(element) => this.changeName(element.target.value)}
            id="name"
            name="name"
            type="text"
            value={this.state.productElement!.name}
          />

          <label className="" htmlFor="PizzaDescriptionEditInput">
            Pizza description
          </label>

          <textarea
            onChange={(element) => this.changeDescription(element.target.value)}
            id="description"
            name="description"
            value={this.state.productElement!.description}
          />

          <label className="" htmlFor="PizzaPriceEditInput">
            Pizza price
          </label>

          <input
            onChange={(element) => this.changePrice(Number(element.target.value))}
            id="price"
            name="price"
            type="number"
            value={this.props.productElement!.price}
          />

          <label className="" htmlFor="isAvailable">
            isAvailable
          </label>

          <input
              onClick={(element) => this.changeIsAvailable()}
              className=""
              id="isAvailable"
              name="isAvailable"
              type="checkbox"
              checked={this.state.productElement!.isAvailable}
              onChange={()=>this.changeIsAvailable()}
          />


          <label className="" htmlFor="categoryId">
            categoryId
          </label>

          {<CategoryDropDown changeCategoryId={this.changeCategoryId.bind(this)} categoryId={this.state.productElement!.categoryId} />}


          <div className="product_Conf__categoryId">

          </div>


          <p id="photo_sign">Product photo:</p>
          <label className="photoLabel" id="photoLabel" htmlFor="photo">
            Choose file
          </label>

          <input id="photo" name="photo" type="file" />

          <button
            onClick={() => {
              putProductItem(this.url, this.state.productElement)
              this.props.changeProduct(
                this.state.productElement,
                this.props.productElementChangeIndex
              );
            }}
            className="btn btn-outline-success mt-3"
          >
            Submit editions
          </button>



          <button
            onClick={() => {
              deleteProduct(this.url).then(()=>alert("Product is deleted"));
              this.props.deleteProduct(this.props.productElementChangeIndex);
            }}
            className="btn btn-outline-danger mt-3"
          >
            Delete
          </button>

          <button
              onClick={() => this.props.exitConfig()}
              className="btn btn-outline-success mt-3"
          >
            Back
          </button>

        </div>
        <ProductItem
          productEdit={() => {}}
          productElement={this.props.productElement}
        />
      </div>
    );
  }
}

export default ProductConf;
