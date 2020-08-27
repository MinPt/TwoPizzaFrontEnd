import React from "react";
import ProductConf from "./ProductConf";
import ProductList from "./ProductList";
import Product from "../Interfaces and types/Product";
import getCookie from "../getCookie";

async function getProductList(url: string) {
  const response = await fetch(
    url
  ,{
      headers: {
        "Authorization" : "Bearer "+ getCookie("token"),
      }
      });
  const productList = await response.json();
  return productList;
}

type ProductListConfigProps = {
  categoryId: number | null
};


type ProductListConfigState = {
  isReady: boolean;
  isConfiguring: boolean;
  productConfElement: Product | undefined;
  productList: Product[];
  productElementChangeIndex: number | undefined;
};

class ProductListConfig extends React.Component<
  ProductListConfigProps,
  ProductListConfigState
> {
  private readonly url: string;
  constructor(props: ProductListConfigProps) {
    super(props);
    this.state = {
      isReady: false,
      isConfiguring: false,
      productConfElement: undefined,
      productList: [],
      productElementChangeIndex: undefined,
    };
    this.url = "https://twopizzaproject.azurewebsites.net/api/v1/Products/Category/" + this.props.categoryId
  }

  async componentDidMount() {
    const productList: Array<Product> = await getProductList(this.url);

    this.setState({
      productList: [...productList],
      isReady: true,
    });
  }

  deleteElement(elementIndex: number) {
    this.setState((state) => {
      state.productList.splice(elementIndex, elementIndex);
    });
  }

  changeProduct(element: Product, index: number) {
    this.setState((state) => {
      state.productList[index] = element;
    });
  }

  productEdit(element: Product, index: number) {
    this.setState({
      isConfiguring: !this.state.isConfiguring,
      productConfElement: { ...element },
      productElementChangeIndex: index,
    });
  }

  exitConfig() {
    this.setState({
      isConfiguring: false,
    });
  }

  configurable(configurable: boolean, ready: boolean) {
    if (configurable && ready) {
      return (
        <ProductConf
          exitConfig={this.exitConfig.bind(this)}
          productElement={this.state.productConfElement}
          productElementChangeIndex={this.state.productElementChangeIndex}
          deleteProduct={this.deleteElement.bind(this)}
          changeProduct={this.changeProduct.bind(this)}
        />
      );
    } else if (!configurable && ready) {
      return (
        <ProductList
          productList={this.state.productList}
          productEdit={this.productEdit.bind(this)}
        />
      );
    } else {
      return <div className="display-1">Loading...</div>;
    }
  }

  render() {
    return this.configurable(this.state.isConfiguring, this.state.isReady);
  }
}

export default ProductListConfig;
