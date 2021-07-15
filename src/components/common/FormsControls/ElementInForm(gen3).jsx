import React from "react";
import css from "./FormsConrtol.module.scss";



/*
типа HOC

использование:

    const PasswordInput = ElementInFormGen3("input");
    <Field name={"password"} component={PasswordInput} placeholder={"Password"} type={"password"}
                           validate={[required]}
    />
 */

const ElementInFormGen3 = (Element) => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return <div className={css.formControl + " " + (hasError && css.error)}>
        <div><Element {...input} {...props} /></div>
        { hasError && <span>{meta.error}</span> }
    </div>
}

export default ElementInFormGen3;




/*
ДРУГИЕ ВАРИАНТЫ из комментов:

Слишком заморочено, почему бы не использовать
React.createElement(element, {...input, props.placeholder}),
или если брать подобное этому решению, то перед return из FormControl создать
const Element = element, и тогда <Element ..... /> использовать в return.
Но вариант  React.createElement выглядит как-то более правильным...




Таким способом не создать чекбокс.
Можно сделать так:
 export const Custom = props => {
    const hasError = props.meta.touched && props.meta.error;
    return (
        <div>
            {
                (props.type !== 'checkbox' && <props.type {...props.input} placeholder={props.placeholder} />)
                || <input type="checkbox"/>
            }
            {hasError && <span >{props.meta.error}</span>}
        </div>
    )
};
Получается без хока, просто компонент, который можно  сразу вставлять в
<Field type="textarea" component{Custom} />, и можно создать чек бокс.
при необходимости доп.данные можно передать в объект пропсов

 */