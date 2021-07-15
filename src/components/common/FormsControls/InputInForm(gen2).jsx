import React from "react";
import css from "./FormsConrtol.module.scss";


const FormControl = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return <div className={css.formControl + " " + (hasError && css.error)}>
        <div>
            {props.children}
        </div>
        { hasError && <span>{meta.error}</span> }
    </div>
}

const TextareaInForm2 = (props) => {
    const {input, ...restProps} = props;
    return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}

export default TextareaInForm2;