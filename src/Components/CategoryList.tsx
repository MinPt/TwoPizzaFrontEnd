import React from "react";
import CategoryItem from "./CategoryItem";
import ICategory from "../Interfaces and types/ICategory";
import getCookie from "../getCookie";


export async function getCategoryList() {

    const response = await fetch(
        "https://twopizzaproject.azurewebsites.net/api/v1/Categories"
    ,{
            headers: {
                "Authorization" : "Bearer "+ getCookie("token"),
            }
        });
    const CategoryList = await response.json();
    return CategoryList;
}

interface ICategoryListProps{
    changeCategoryId: Function
}


interface ICategoryListState {
    categoryList: ICategory[] | null,
    isReady: boolean,
}

class CategoryList extends React.Component<ICategoryListProps, ICategoryListState>{
    constructor(props: any) {
        super(props);
        this.state = {
           categoryList : null,
           isReady: false
        }
    }

    
    
    async componentDidMount() {
        const categoryList: Array<ICategory> = await getCategoryList();

        this.setState({
            categoryList: [...categoryList],
            isReady: true
        });
    }


    isReady(isReady: boolean){
        if(isReady){
            return (
                <div className="container align-items-start categoryList-wrapper">
                    {this.state.categoryList!.map(
                        (element, index) => {
                            return (
                                <CategoryItem
                                    key={index}
                                    categoryId={element.id}
                                    name={element.name}
                                    changeCategoryId={this.props.changeCategoryId}
                                    photo={element.photo}
                                />
                            )
                        }
                    )}
                </div>
            )
        }else{
            return <div className="display-1">Loading...</div>
        }
    }

    render() {
        return this.isReady(this.state.isReady)
    }
}

export default CategoryList;