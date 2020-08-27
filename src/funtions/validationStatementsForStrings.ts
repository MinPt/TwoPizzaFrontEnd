import $ from "jquery";

export function validationStatementsForStrings(minLength: number, maxLength : number, name: string, stateValue: string, errors: Array<string | null>){
    if(stateValue.length > minLength && stateValue.length < maxLength){
        $(`#${name}_error`).removeClass("active")
        $(`#${name}`).addClass("input_without_errors")
        return

    }
    if(stateValue.length <= minLength || stateValue.length >= maxLength){
        $(`#${name}`).addClass("input_with_error")
        $(`#${name}_error`).addClass("active")
        return errors.push(`error_${name}`);
    }
}

export function validationStatementsForPrice(minPrice: number, name: string, stateValue:number, errors: Array<string | null>) {
    if(stateValue > minPrice){
        $(`#${name}_error`).removeClass("active")
        $(`#${name}`).addClass("input_without_errors")
        return
    }
    if(stateValue <= minPrice){
        $(`#${name}`).addClass("input_with_error")
        $(`#${name}_error`).addClass("active")
        return errors.push(`error_${name}`);
    }
}