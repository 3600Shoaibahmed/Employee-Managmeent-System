import React, { useState, useEffect } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import Button from 'react-bootstrap/Button';  // Corrected import
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponents = () => {
    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
        
    }, []);

    function getAllEmployees(){
        listEmployees()
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error(error);  
            });
    }

    function addNewEmployee() {
        navigator('/add-employee');
    }
    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)

    }

    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response) =>{
            getAllEmployees();

        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center text-bold'>List of Employee</h2>
            <Button type="button" onClick={addNewEmployee}>Add user</Button>  
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Button type="button" className="btn btn-primary" onClick={() => updateEmployee(employee.id)}>Update</Button>
                                <Button type="button" className="btn btn-danger" onClick={() => removeEmployee(employee.id)} style={{marginLeft:'20px'}}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListEmployeeComponents;
