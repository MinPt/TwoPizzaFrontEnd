import React from "react";
import getCookie from "../getCookie";
import CategoryDropDown from "./CategoryDropDown";
import {validationStatementsForStrings, validationStatementsForPrice} from "../funtions/validationStatementsForStrings";

async function createProduct(product: any) {
  let url = "https://twopizzaproject.azurewebsites.net/api/v1/Products";

  let newProduct = new FormData();
  newProduct.append("Photo", product.photo);
  newProduct.append("Name", product.name);
  newProduct.append("Price", product.price);
  newProduct.append("IsAvailable", product.isAvailable);
  newProduct.append("CategoryId", product.categoryId);
  newProduct.append("Description", product.description);

  await fetch(url, {
    method: "POST",
    body: newProduct,
    headers:{
        "Authorization" : "Bearer "+ getCookie("token")
    }
  });
}



type CreateProductItemState = {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  categoryId: number;
  photo: File | null;
};

class CreateProductItem extends React.Component<null, CreateProductItemState> {
  constructor(props: null) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: 0,
      isAvailable: false,
      categoryId: 0,
      photo: null,
    };
  }


    changeName(value: string) {
    this.setState({
      name: value,
    });
  }

  changeDescription(value: string) {
    this.setState({
      description: value,
    });
  }

  changePrice(value: number) {
    this.setState({
      price: value,
    });
  }

  changeIsAvailable(value: boolean) {
    this.setState({
      isAvailable: !this.state.isAvailable,
    });
  }

  changeCategoryId(value: number) {
    this.setState({
      categoryId: value,
    });
  }

  changeImage(value: File) {
      console.log("hello")
    this.setState({
      photo: value,
    });
  }

  async validation(){
    let errors = [null];
    validationStatementsForStrings(3,75,"name", this.state.name!, errors);
    validationStatementsForStrings(20,256,"description", this.state.description!, errors);
    validationStatementsForPrice(0,"price", this.state.price, errors);
    if(errors.length === 1) {
        if(window.confirm("Are you sure")) createProduct(this.state)
    }
    else{
        alert("here some errors")
    }

  }

  render() {
    return (
      <div className="container Create_product_form">

          <label htmlFor="name">name</label>
          <input
              className=""
              onChange={(element) => this.changeName(element.target.value)}
              id="name"
              name="name"
              type="text"
          />
          <p id="name_error" className="error_sign">name should contain at least 3 characters and less then 75 characters</p>
          <label className="mt-1" htmlFor="description">
              description
          </label>
          <textarea
              className=""
              onChange={(element) => this.changeDescription(element.target.value)}
              id="description"
              name="description"
          />
          <p id="description_error" className="error_sign">description should contain at least 20 characters and less then 256 characters</p>
          <label className="mt-1" htmlFor="price">
              price
          </label>
          <input
              className=""
              onChange={(element) => this.changePrice(Number(element.target.value))}
              id="price"
              name="price"
              type="number"
          />
          <p id="price_error" className="error_sign">price should be grater then 0</p>
          <label className="mt-1" htmlFor="isAvailable">
              isAvailable
          </label>
          <input
              className=""
              onChange={(element) =>
                  this.changeIsAvailable(Boolean(element.target.value))
              }
              id="isAvailable"
              name="isAvailable"
              type="checkbox"
          />
          <label className="mt-1" htmlFor="categoryId">
              categoryId
          </label>

          {<CategoryDropDown categoryId={null} changeCategoryId={this.changeCategoryId.bind(this)}/>}

          <label className="mt-1" htmlFor="photo">
              photo
          </label>
          <input
              className=""
              onChange={(element) => this.changeImage(element.target.files![0])}
              id="photo"
              name="photo"
              type="file"
          />
          <button
              className="btn btn-outline-success mt-3"
              onClick={() => this.validation()}
          >
              Send request
          </button>

      </div>
    );
  }
}

export default CreateProductItem;
