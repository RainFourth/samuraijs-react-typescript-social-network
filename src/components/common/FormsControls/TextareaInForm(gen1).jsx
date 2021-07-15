import React from "react";
import css from "./FormsConrtol.module.scss";


const TextareaInFormGen1 =  ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error

    //присвоение нескольких css классов через пробел !!!
    return <div className={css.formControl + " " + (hasError && css.error)}>
        <div><textarea {...input} {...props} /></div>
        { hasError && <span>{meta.error}</span>}
    </div>
}


export default TextareaInFormGen1;