import '../App.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../common/Input';
import RadioInput from '../common/RadioInput';
import SelectOptions from '../common/SelectOptions';
import CheckBoxInput from '../common/CheckBoxInput';
const SignUpForm = () => {

    const [savedData, setSavedData] = useState(null);
    const submitHandler = (values) => {
        axios.post('http://localhost:3001/users', values).then(res => console.log(res.data)).catch(err => console.log(err));
    }
    const radioOptions = [
        { label: "male", value: 0 },
        { label: "female", value: 1 }
    ];
    const selectOptions = [
        { label: "nationality...", value: "" },
        { label: "iran", value: "ir" },
        { label: "germany", value: "ger" },
        { label: "usa", value: "us" },

    ];
    const checkBoxOptions = [
        { label: "react.js", value: "react.js" },
        { label: "vue.js", value: "vue.js" },
    ];
    const initialValues = {
        name: "",
        email: "",
        phoneNumber: "",
        gender: "",
        passwordConfirmation: "",
        password: "",
        nationality: "",
        interests: [],
        terms: false,
    };
    useEffect(() => {
        axios.get('http://localhost:3001/users/1').then(res => setSavedData(res.data)).catch(err => { console.log(err) });
    }, [])
    const formik = useFormik({
        initialValues: savedData || initialValues,
        onSubmit: (values) => { submitHandler(values) },
        validationSchema: yup.object({
            name: yup.string().required("required").min(6, 'must be at least 6 chars'),
            email: yup.string().email("invalid format").required("required"),
            phoneNumber: yup.string().required('required').matches(/^[0-9]{11}$/, 'invalid phoneNumber'),
            gender: yup.string().required('required'),
            passwordConfirmation: yup.string().required('required').oneOf([yup.ref('password'), null], "must be match with password"),
            password: yup.string().required("required").matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
            nationality: yup.string().required("required"),
            interests: yup.array().min(1).required("at least select one interest."),
            terms: yup.boolean().required("you must fill agreement").oneOf([true], "must be accept")
        }),
        validateOnMount: true,
        enableReinitialize: true,

    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Input className="inputField" label="name" name="name" formik={formik} />
                <Input className={"inputField"} label="email" name="email" formik={formik} />
                <Input className={"inputField"} label="phone Number" name="phoneNumber" formik={formik} />
                <Input className={"inputField"} label="password" name="password" formik={formik} type="password" />
                <Input className={"inputField"} label="password confirmation" name="passwordConfirmation" formik={formik} type="password" />
                <RadioInput formik={formik} name="gender" radioOptions={radioOptions} />
                <SelectOptions name="nationality" formik={formik} selectOptions={selectOptions} />
                <CheckBoxInput name="interests" formik={formik} checkBoxOptions={checkBoxOptions} />
                <div className='formControl'>
                    <input type="checkbox" name="terms" value={true} id="terms" onChange={formik.handleChange} checked={formik.values.terms} />
                    <label htmlFor="terms">terms and conditions </label>
                    {formik.errors.terms && formik.touched.terms && (<div className='error'>{formik.errors.terms}</div>)}
                </div>
                <button type='submit' onClick={formik.onSubmit} disabled={!formik.isValid}>submit</button>
            </form>
        </div>
    );
}

export default SignUpForm;