import React from "react";
import classes from './Input.module.css'

function isValidate({valid, touched, shouldValidate}) {
    return !valid && touched && shouldValidate
}

function resizeArea(text_id, minHeight, maxHeight) {
    var area = document.getElementById(`${text_id}`);
    var area_hidden = document.getElementById(`${classes.descriptionTextHidden}`);
    var text = '';
    area.value.replace(/[<>]/g, '_').split("\n").forEach( (s) => {
            text = text + '<div>' + s.replace(/\s\s/g, ' &nbsp;') + '&nbsp;</div> \n';
        } );
    area_hidden.innerHTML = text;
    var height = area_hidden.offsetHeight + 15;
    height = Math.max(minHeight, height);
    height = Math.min(maxHeight, height);
    area.style.height = height + 'px';
}

const Input = props => {
    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const htmlFor = Math.random();
    
    if (props.controlFocus) {
        cls.push(classes.focusOn)
    } else {
        cls.splice(1, 1)
    }

    if (props.type === 'textarea') {
        cls.push(classes.textareaContainer)
    }
    
    if (isValidate(props)) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            <label
                htmlFor={props.name || htmlFor}
            >{props.label && props.label}
                {props.validation && props.validation.required ? <span>*</span> : null}
            </label>
            {
                props.type === 'textarea'
                ? 
                <div>
                    <div className={classes.text}>
                        <div className={classes.descriptionTextHiddenContainer}>
                            <div className={classes.textareaBehavior} id={classes.descriptionTextHidden}>

                            </div>
                        </div>
                        <textarea
                            value={props.value}
                            onFocus={props.onFocus}
                            onBlur={props.onFocus}
                            placeholder={props.placeholder}
                            id={props.name || 'description-text'}
                            onChange={props.handleChange || props.onChange}
                            maxLength={props.validation.maxLength || ''}
                            rows={props.rows || "1"}
                            onKeyUp={()=>resizeArea('description-text', 33, 90)}
                        />
                    </div>
                </div>
                
                :
                <input
                    type={inputType}
                    value={props.value}
                    onFocus={props.onFocus}
                    onBlur={props.onFocus}
                    id={props.name || htmlFor}
                    placeholder={props.placeholder}
                    name={props.name || props.type}
                    onChange={props.handleChange || props.onChange}
                    maxLength={props.validation && props.validation.maxLength || ''}
                />      
            }
            
        </div>
    )
};

export default Input;