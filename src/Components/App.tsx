import React from 'react';
import ProductListConfig from "./ProductListConfig";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Authorization from "./authorization";
import SecuredRoute from "./SecuredRoute";
import CreateProductItem from "./CreateProductItem";
import CategoryList from "./CategoryList";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./updateCategory";
import pizzaPng from "../img/pizza-nav-image.png"



interface IApp {
    categoryId: number | null
}


class App extends React.Component<any, IApp> {
    constructor(props: any) {
        super(props);
        this.state = {
            categoryId: null
        }


    }

    changeCategoryId(value: number){
        this.setState({
            categoryId: value
        })
    }

    render() {
        return (
            <div className="container-fluid d-flex flex-column align-items-center">
                <Router>
                    <nav className="navbar navbar-expand-xl d-flex justify-content-between ">
                        <a className="navbar-brand d-flex align-items-center mr-5">
                            <img src={pizzaPng} width="60px" height="60px"
                                 className="d-inline-block align-top" alt="fdf"/>
                            TwoPizza Project
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="">Menu</span>
                        </button>
                        <div className="collapse navbar-collapse NavList text-center" id="navbarTogglerDemo01">
                            <Link className="nav-item dropdown-item" to="/">
                                <li>Auth</li>
                            </Link>
                            <Link className="nav-item dropdown-item" to="/categories">
                                <li>Categories</li>
                            </Link>
                            <Link className="nav-item dropdown-item" to="/createProduct">
                                <li>Create Product</li>
                            </Link>
                            <Link className="nav-item dropdown-item" to="/createCategory">
                                <li>Create category</li>
                            </Link>

                        </div>
                    </nav>



                    <Switch>
                        <Route path="/" exact component={Authorization}/>
                        <SecuredRoute path={"/products/category/" + this.state.categoryId} exact categoryId={this.state.categoryId} component={ProductListConfig}/>
                        <SecuredRoute path="/createProduct" exact component={CreateProductItem}/>
                        <SecuredRoute path="/categories" changeCategoryId={this.changeCategoryId.bind(this)} component={CategoryList}/>
                        <SecuredRoute path="/createCategory" component={CreateCategory}/>
                        <SecuredRoute path="/updateCategory" updateCategoryId={this.state.categoryId} component={UpdateCategory}/>
                    </Switch>
                </Router>
            </div>
        );
    }

}

export default App;
