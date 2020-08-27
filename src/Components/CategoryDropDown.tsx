import React from "react";
import CategoryDropDownListItem from "./CategoryDropDownListItem";
import {getCategoryList} from "./CategoryList";
import ICategory from "../Interfaces and types/ICategory";


interface ICategoryDropDownState {
    pickedCategory: number | null,
    isOpened: boolean,
    categoryList: Array<ICategory> | null,
    isReady: boolean
}

interface ICategoryDropDownProps {
    categoryId: number | null,
    changeCategoryId: Function
}

class CategoryDropDown extends React.Component<ICategoryDropDownProps, ICategoryDropDownState> {

    constructor(props: ICategoryDropDownProps) {
        super(props);
        this.state = {
            pickedCategory: this.props.categoryId,
            isOpened: false,
            categoryList: null,
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

    pickCategory(categoryId: number){
        this.setState({
            pickedCategory: categoryId
        })
    }

    toggleList(){
        this.setState({
            isOpened: !this.state.isOpened
        })
    }

    unknownCategoryProp(category: number | null){
        if(category != null){
            return this.state.categoryList?.filter(
                (element: ICategory) => {
                    return element.id === this.state.pickedCategory
                }
            ).map((element)=>{
                return (
                    <CategoryDropDownListItem
                        id={element.id}
                        name={element.name}
                        pickCategory={this.pickCategory.bind(this)}
                        changeCategoryId={this.props.changeCategoryId}
                        key={element.id}
                        toggleList={this.toggleList.bind(this)}
                    />
                )
            })
        }else{
            return (
                <CategoryDropDownListItem
                    id={this.state.categoryList![0].id}
                    name={this.state.categoryList![0].name}
                    pickCategory={this.pickCategory.bind(this)}
                    changeCategoryId={this.props.changeCategoryId}
                    key={this.state.categoryList![0].id}
                    toggleList={this.toggleList.bind(this)}
                />
            )
        }
    }

    isReady(Ready: boolean, Opened: boolean){
        if(Ready && !Opened){
            return (
                <div className="CategoryDropDown">
                    <div className="CategoryDropDown__pickedCategory">
                        {
                            this.unknownCategoryProp(this.state.pickedCategory)
                        }
                    </div>
                </div>
            );
        }if(Ready && Opened){
            return (
                <div className="CategoryDropDown">
                    <div className="CategoryDropDown__dropdownList">
                        {this.state.categoryList!.map(
                            (element) => {
                                return (
                                    <CategoryDropDownListItem
                                        id={element.id}
                                        key={element.id}
                                        name={element.name}
                                        pickCategory={this.pickCategory.bind(this)}
                                        toggleList={this.toggleList.bind(this)}
                                        changeCategoryId={this.props.changeCategoryId}
                                    />
                                )
                            }
                        )}
                    </div>
                </div>
            )
        }
        else{
            return <div>Loading...</div>
        }
    }

    render() {
       return this.isReady(this.state.isReady, this.state.isOpened)
    }
}

export default CategoryDropDown;