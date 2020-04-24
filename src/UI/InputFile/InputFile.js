import React from 'react';
import classes from './InputFile.module.css';
import InputFileIcon from "../../style/Images/Icons/InputFile/InputFileIcon";
import DeclineCurrentFileIcon from "../../style/Images/Icons/InputFile/DeclineCurrentFileIcon";

const InputFile = props => {
    const htmlFor = Math.random();

    return (
        <div className={classes.InputFile}>
            <div>
                <div className={classes.inputFileWrapper}>
                    <label htmlFor={props.name || htmlFor}>
                        {
                           props.fileName
                           ? props.fileName
                           : props.label || 'Upload File'
                        }
                        <i><InputFileIcon/></i>
                    </label>
                    {
                        props.fileName
                            ? <i onClick={()=>props.onDeclineFile(htmlFor)}><DeclineCurrentFileIcon/></i>
                            : null
                    }
                    <input
                        type="file"
                        id={props.name  || htmlFor}
                        name={props.name || props.name}
                        onChange={(e) => props.onChange(e, props.name)}
                    />
                    <span>(File requirements: pdf, doc, docx, rtf, ppt, pptx)</span>
                </div>
            </div>
        </div>
    )
};

export default InputFile;