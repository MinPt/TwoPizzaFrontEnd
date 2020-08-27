import React from "react";
import CategoryDropDown from "./CategoryDropDown";
import {getCategoryList} from "./CategoryList";
import ICategory from "../Interfaces and types/ICategory";
import getCookie from "../getCookie";
import CategoryItem from "./CategoryItem";

interface IUpdateCategoryState {
    categoryList: ICategory[] | null,
    isReady: boolean,
    updateCategoryId: number | null,
    categoryPhoto: Blob | null
}

interface IUpdateCategoryProps {
    updateCategoryId: number
}

async function deleteCategory(deleteCategoryId: number | null) {
    if (window.confirm("Are you sure")) {
        const url = "https://twopizzaproject.azurewebsites.net/api/v1/Categories/" + deleteCategoryId

        fetch(url, {
            method: "DELETE",
        });
    }
}

async function updateCategory(categoryName: string, categoryPhoto: Blob | null, updateCategoryId: number | null) {
    if (window.confirm("Are you sure")) {
        const url = "https://twopizzaproject.azurewebsites.net/api/v1/Categories/" + updateCategoryId
        const updateCategory = new FormData()

        updateCategory.append("Photo", categoryPhoto!)
        updateCategory.append("Name", categoryName)
        fetch(url, {
            method: "PUT",
            body: updateCategory,
            headers: {
                "Authorization": "Bearer " + getCookie("token"),
            }
        })
    }
}


class UpdateCategory extends React.Component<IUpdateCategoryProps, IUpdateCategoryState> {
    constructor(props: IUpdateCategoryProps) {
        super(props);
        this.state = {
            categoryList: null,
            isReady: false,
            updateCategoryId: null,
            categoryPhoto: null
        }
    }

    async componentDidMount() {
        const categoryList: ICategory[] = await getCategoryList()

        this.setState({
            categoryList: [...categoryList],
            isReady: true
        })
    }

    updateCategoryId(value: number) {
        this.setState({
            updateCategoryId: value
        })
    }

    updatePhoto(value: Blob) {
        this.setState({
            categoryPhoto: value
        })
    }


    isReady(Ready: boolean) {
        if (Ready) {
            return (

                <div className="Update_Category">
                    <CategoryDropDown
                        categoryId={this.props.updateCategoryId}
                        changeCategoryId={this.updateCategoryId.bind(this)}
                    />

                    <label htmlFor="photo">Upload image</label>
                    <input onChange={(element) => this.updatePhoto(element.target.files![0])} type="file"
                           id="photo"/>

                    <button
                        onClick={() => updateCategory("Pizza", this.state.categoryPhoto, this.state.updateCategoryId)}
                        className="updateBtn">Update category
                    </button>
                    <button onClick={() => deleteCategory(this.state.updateCategoryId)} className="deleteBtn">Delete
                        category
                    </button>
                </div>


            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }

    render() {
        return this.isReady(this.state.isReady)
    }

}

export default UpdateCategory;