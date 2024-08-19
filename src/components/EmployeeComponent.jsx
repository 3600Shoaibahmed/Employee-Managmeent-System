import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate,useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';

const EmployeeComponent = () => {

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');

    const {id} = useParams();
    const navigator = useNavigate();

    useEffect(() =>  {
        if(id){
            getEmployee(id).then((response) =>{
                setfirstname(response.data.firstname);
                setlastname(response.data.lastname);
                setemail(response.data.email);

            }).catch(error =>{
                console.error(error);
            }
            
            )

        }
    },[id])

    const handleFirstname = (e) => setfirstname(e.target.value);
    const handleLastname = (e) => setlastname(e.target.value);  
    const handleEmail = (e) => setemail(e.target.value);

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        const employee = { firstname, lastname, email };
        console.log(employee);

        if (validateForm()) {

            if(id){
                updateEmployee(id,employee).then((response) => {
                    console.log(response.data);
                    navigator("/employees");
                }).catch(error =>{
                    console.error(error);
                })
            }
            else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error =>{
                    console.error(error);
                })

            }
            
           
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstname.trim()) {
            errorsCopy.firstname = '';
        } else {
            errorsCopy.firstname = 'Please enter your first name';
            valid = false;
        }

        if (lastname.trim()) {
            errorsCopy.lastname = '';
        } else {
            errorsCopy.lastname = 'Please enter your last name';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Please enter your email address';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTittle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
            
        }
        else{
            <h2 className='text-center'>Add employee</h2>

        }

    }

    return (
        <div className='container'>
            <br />
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTittle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter the employee First name'
                                    value={firstname}
                                    className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                    onChange={handleFirstname}
                                />
                                {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter the employee Last Name'
                                    value={lastname}
                                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                    onChange={handleLastname}
                                />
                                {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email</label>
                                <input
                                    type='text'
                                    placeholder='Enter the employee Email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={handleEmail}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <Button className='btn btn-primary' onClick={saveOrUpdateEmployee}>Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeComponent;
