import React from 'react'
const CheckBoxInput = ({ checkBoxOptions, name, formik }) => {
    return (
        <div className='formControl'>
            {checkBoxOptions.map((input) => {
                return <React.Fragment key={input.value}>
                    <input type="checkbox" name={name} value={input.value} onChange={formik.handleChange} id={input.value} checked={formik.values[name].includes(input.value)} />
                    <label htmlFor={input.value}>{input.label}</label>
                    {formik.errors[name] && formik.touched[name] && (<div className='error'>{formik.errors[name]}</div>)}
                </React.Fragment>
            })}
        </div>
    );
}

export default CheckBoxInput;