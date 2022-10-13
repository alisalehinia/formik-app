import React from "react";
import '../App.css'
const RadioInput = ({ formik, name, radioOptions }) => {
    return (
        <div className='formControl'>
            {radioOptions.map((input) => {
                return <React.Fragment key={input.value} className="inputField">
                    <input type="radio" name={name} value={input.value} onChange={formik.handleChange} id={input.value} checked={formik.values[name] == input.value} />
                    <label htmlFor={input.value}>{input.label}</label>
                    {formik.errors[name] && formik.touched[name] && (<div className='error'>{formik.errors[name]}</div>)}
                </React.Fragment>
            })}
        </div>
    );
}

export default RadioInput;