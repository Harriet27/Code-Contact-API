import React, { useEffect, useState } from 'react';
import { getContacts, addContact, deleteContact, editContact } from '../Redux/Action/contactAction';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Table } from 'reactstrap';
import Swal from 'sweetalert2';

const Testing = () => {
    const dispatch = useDispatch();

    const contactList = useSelector((state) => state.contact.contactList);

    const [formInput, setFormInput] = useState({
        firstName: '',
        lastName: '',
        age: '',
        photo: '',
    });
    const [formEdit, setFormEdit] = useState({
        firstName: '',
        lastName: '',
        age: '',
        photo: '',
    });
    const [toggle, setToggle] = useState(null);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        document.title = 'Welcome';
        dispatch(getContacts());
        if (update) {
            setUpdate(false);
        }
    }, [dispatch, update]);

    const handleChangeInput = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeEdit = (e) => {
        setFormEdit({
            ...formEdit,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveContact = () => {
        Swal.fire({
            title: 'Are you sure you want to add this contact?',
            text: 'You can edit the contact later on ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!',
        }).then((res) => {
            if (res.value) {
                Swal.fire(
                    'Success!',
                    'Contact has been added.',
                    'success',
                );
                let { firstName, lastName, age, photo } = formInput;
                let formData = new FormData();
                formData.append('firstName', firstName);
                formData.append('lastName', lastName);
                formData.append('age', age);
                formData.append('photo', photo);
                dispatch(addContact(formData));
                setUpdate(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        })
        .then((res) => {
            if (res.value) {
                Swal.fire(
                    'Deleted!',
                    'Product has been deleted.',
                    'success',
                );
                dispatch(deleteContact(id));
                setUpdate(true);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const handleEdit = (id) => {
        let { firstName, lastName, age, photo } = formEdit;
        let formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('age', age);
        formData.append('photo', photo);
        dispatch(editContact(id, formData));
        setUpdate(true);
    };

    const renderTable = () => {
        return contactList.map((val,index) => {
            if (toggle !== val.id) {
                return (
                    <tr key={index}>
                        <td>{val.firstName}</td>
                        <td>{val.lastName}</td>
                        <td>{val.age}</td>
                        <td>
                            <img src={val.photo} alt='Gambar' height={100} className='image' />
                        </td>
                        <td>
                            <Button outline color='warning' onClick={() => setToggle(val.id)}>
                                Edit
                            </Button>
                        </td>
                        <td>
                            <Button outline color='danger' onClick={() => handleDelete(val.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                );
            } else {
                return(
                    <tr key={index}>
                        <td>
                            <Input defaultValue={val.firstName} name='firstName' onChange={handleChangeEdit} />
                        </td>
                        <td>
                            <Input defaultValue={val.lastName} name='lastName' onChange={handleChangeEdit} />
                        </td>
                        <td>
                            <Input defaultValue={val.age} name='age' onChange={handleChangeEdit} />
                        </td>
                        <td>
                            <Input defaultValue={val.photo} name='photo' onChange={handleChangeEdit} />
                        </td>
                        <td>
                            <Button onClick={() => setToggle(null)}>
                                Cancel
                            </Button>
                        </td>
                        <td>
                            <Button onClick={() => handleEdit(val.id)}>
                                Confirm
                            </Button>
                        </td>
                    </tr>
                );
            }
        });
    };

    return (
        <div>
            <div style={{margin:'50px'}}>
                <Table hover bordered>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Photo</th>
                            <th colSpan='2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable()}
                    </tbody>
                </Table>
            </div>
            <div style={{margin:'50px'}}>
                <Input type='text' name='firstName' placeholder='First Name' onChange={handleChangeInput} style={{marginBottom:'10px'}} />
                <Input type='text' name='lastName' placeholder='Last Name' onChange={handleChangeInput} style={{marginBottom:'10px'}} />
                <Input type='number' name='age' placeholder='Age' onChange={handleChangeInput} style={{marginBottom:'10px'}} />
                <Input type='text' name='photo' placeholder='Photo Link' onChange={handleChangeInput} style={{marginBottom:'10px'}} />
                <Button outline color='primary' onClick={handleSaveContact} style={{marginBottom:'10px'}}>
                    Save Contact
                </Button>
            </div>
        </div>
    );
};

export default Testing;
