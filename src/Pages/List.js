import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, deleteContact, editContact } from '../Redux/Action/contactAction';
import { Button, TextField } from '@material-ui/core';
import {
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    CardText,
    CardImg,
} from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const List = () => {
    const dispatch = useDispatch();

    const contactList = useSelector((state) => state.contact.contactList);

    const [update, setUpdate] = useState(false);
    const [toggle, setToggle] = useState(null);
    const [formEdit, setFormEdit] = useState({
        firstName: '',
        lastName: '',
        age: '',
        photo: '',
    });

    useEffect(() => {
        document.title = 'Contact List';
        dispatch(getContacts());
        if (update) {
            setUpdate(false);
        }
    }, [dispatch, update]);

    const handleChange = (e) => {
        setFormEdit({
            ...formEdit,
            [e.target.name]: e.target.value,
        });
    };

    console.log(formEdit);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((res) => {
            if (res.value) {
                Swal.fire(
                    'Deleted!',
                    'Contact has been deleted.',
                    'success',
                );
                dispatch(deleteContact(id));
                setUpdate(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    };

    const handleEdit = (id) => {
        dispatch(editContact(id, formEdit));
        setUpdate(true);
        setToggle(null);
    };

    const renderContacts = () => {
        return contactList.map((val,index) => {
            if (toggle === val.id) {
                return (
                    <div key={index}>
                        <Card style={{width:'20vw', textAlign:'center', margin:'10px', borderRadius:'20px', overflow:'hidden'}}>
                            <CardHeader tag="h5">
                                <TextField label='First Name' name='firstName' onChange={handleChange} />
                                <TextField label='Last Name' name='lastName' onChange={handleChange} />
                            </CardHeader>
                            <CardBody>
                                <TextField label='Photo URL' name='photo' onChange={handleChange} />
                                <CardText style={{marginTop:'10px'}}>
                                    <TextField label='Age' name='age' onChange={handleChange} />
                                </CardText>
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <Button variant='outlined' color='primary' startIcon={<EditIcon />} style={{display:'flex', marginBottom:'10px'}} onClick={() => setToggle(null)}>
                                        Cancel
                                    </Button>
                                </div>
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <Button variant='outlined' color='secondary' startIcon={<DeleteIcon />} style={{display:'flex', marginBottom:'-10px'}} onClick={() => handleEdit(val.id, formEdit)}>
                                        Confirm
                                    </Button>
                                </div>
                            </CardBody>
                            <CardFooter className="text-muted">
                                ID : {val.id}
                            </CardFooter>
                        </Card>
                    </div>
                );
            } else {
                return (
                    <div key={index}>
                        <Card style={{width:'20vw', maxWidth:'20vw', textAlign:'center', margin:'10px', borderRadius:'20px', overflow:'hidden'}}>
                            <CardHeader tag="h5">
                                {val.firstName + ' ' + val.lastName}
                            </CardHeader>
                            <CardBody>
                                <CardImg src={val.photo} alt='profilePic' height={150} style={{display:'flex', alignSelf:'center'}} />
                                <CardText style={{marginTop:'10px'}}>
                                    Age : {val.age}
                                </CardText>
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <Button variant='outlined' color='primary' startIcon={<EditIcon />} style={{display:'flex', marginBottom:'10px'}} onClick={() => setToggle(val.id)}>
                                        Edit
                                    </Button>
                                </div>
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <Button variant='outlined' color='secondary' startIcon={<DeleteIcon />} style={{display:'flex', marginBottom:'-10px'}} onClick={() => handleDelete(val.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </CardBody>
                            <CardFooter className="text-muted">
                                ID : {val.id}
                            </CardFooter>
                        </Card>
                    </div>
                );
            }
        });
    };

    return (
        <div style={{backgroundColor:'#FAF0E6', backgroundSize:'cover', height:'100vh'}}>
            <div style={{display:'flex', justifyContent:'center', padding:'20px', position:'sticky'}}>
                <Link to='/add'>
                    <Button variant='contained' color='primary' style={{padding:'15px 50px'}}>
                        Add a Contact
                    </Button>
                </Link>
            </div>
            <div className='container' style={{display:'flex', justifyContent:'center'}}>
                <div className='row'>
                    {renderContacts()}
                </div>
            </div>
        </div>
    );
};

export default List;
