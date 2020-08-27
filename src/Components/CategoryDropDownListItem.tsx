import React from "react";

interface ICategoryDropDownListItemProps {
    id: number,
    name: string,
    pickCategory: Function,
    toggleList: Function,
    changeCategoryId: Function
}

const CategoryDropDownListItem: React.FC<ICategoryDropDownListItemProps> = (props: ICategoryDropDownListItemProps) => {
    return(
        <div onClick={
            ()=>{
                props.pickCategory(props.id)
                props.changeCategoryId(props.id)
                props.toggleList()
            }}
             className="CategoryDropDownListItem">
            <p>{props.name}</p>
        </div>
    )
}

export default CategoryDropDownListItem;