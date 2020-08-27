import React from "react";
import getCookie from "../getCookie";
import {validationStatementsForStrings} from "../funtions/validationStatementsForStrings";

interface CreateCategoryState {
    name: string | null,
    photo: File | null,
    errors: boolean
}

async function createCategory(name: string, photo: File | null) {
    let url = "https://twopizzaproject.azurewebsites.net/api/v1/Categories";
    if(photo == null){
        let newCategory = new FormData();
        newCategory.append("Name", name);

        await fetch(url, {
            method: "POST",
            body: newCategory,
            headers:{
                "Authorization" : "Bearer "+ getCookie("token")
            }
        });
    }else{
        let newCategory = new FormData();
        newCategory.append("Name", name);
        newCategory.append("Photo", photo);
        await fetch(url, {
            method: "POST",
            body: newCategory,
            headers:{
                "Authorization" : "Bearer "+ getCookie("token")
            }
        });
    }
}

class CreateCategory extends React.Component<any, CreateCategoryState>{
    constructor(props: any) {
        super(props);
        this.state = {
            name: null,
            photo:  null,
            errors: false
        }

    }


    async validation(){
        let errors = [null];
        validationStatementsForStrings(3,55,"name",this.state.name!, errors);
        if(errors.length === 1){
            if(window.confirm("Are you sure")) createCategory(this.state.name!, this.state.photo)
        }else{
            alert("Here some errors")
        }

    }

    changePhoto(value: File | null){
        this.setState({
            photo : value
        })
    }

    changeName(value: string | null){
        this.setState({
            name : value
        })
    }

    render() {
        return (
            <div className="Create_category_form">
                <label htmlFor="name">Name</label>
                <input onChange={(event)=>this.changeName(event.target.value)} form="form" type="text" id="name"/>
                <p id="name_error" className="error_sign">name should contain at least 4 characters and less then 55 characters</p>

                <label id="file_label" htmlFor="photo">Choose file</label>
                <input onChange={(event)=>this.changePhoto(event.target.files![0])} form="form" type="file" id="photo"/>

                <button onClick={()=>this.validation()} className="create_category_btn">Create category</button>
            </div>
        )
    }
}

export default CreateCategory;