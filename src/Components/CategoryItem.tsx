import React from "react";
import {Link} from "react-router-dom";

interface ICategoryItemProps {
    categoryId: number,
    name: string,
    photo: string,
    changeCategoryId?: Function
}


const CategoryItem: React.FC<ICategoryItemProps> = (props:ICategoryItemProps) => {
    let ChangeOrNull: any = null
    if(props.changeCategoryId == null){
        ChangeOrNull = () => {

        }
    }else{
        ChangeOrNull = props.changeCategoryId

    }

    return (
        <Link className="categoryItem" onClick={() => (ChangeOrNull(props.categoryId))} to={"/products/category/" + props.categoryId}>
            <div>
                <h4>{props.name}</h4>
            </div>
            <img className="categoryItem__image" src={props.photo} alt={props.name + " image"}/>
            <button className=""><Link onClick={()=>ChangeOrNull(props.categoryId)} to="/updateCategory">Edit</Link></button>
        </Link>
    )
}

export default CategoryItem;