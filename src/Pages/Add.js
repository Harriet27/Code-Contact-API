import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addContact } from '../Redux/Action/contactAction';
import phone from '../assets/phone.png';
import ayee from '../assets/ayee.png';

const Add = () => {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        age: '',
        photo: '',
    });

    useEffect(() => {
        document.title = 'Add Contacts';
    });

    const handleChange = (e) => {
        setInput({
            ...input,
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
                let { firstName, lastName, age, photo } = input;
                let formData = new FormData();
                formData.append('firstName', firstName);
                formData.append('lastName', lastName);
                formData.append('age', age);
                formData.append('photo', photo);
                dispatch(addContact(formData));
                setInput({
                    firstName: '',
                    lastName: '',
                    age: '',
                    photo: '',
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <div style={{backgroundColor:'#FAF0E6', backgroundSize:'cover', height:'100vh'}}>
            <div style={{position:'absolute', top:'8%', left:'10%'}}>
                <img src={ayee} alt='gambar' height={500} />
            </div>
            <div className='col' style={styles.addForm}>
                <div style={{display:'block', textAlign:'center'}}>
                    <div style={styles.title}>
                        <img src={phone} alt='add icon' height={70} />
                    </div>
                    <div style={styles.inputForm}>
                        <Input
                            type='text'
                            name='firstName'
                            placeholder='First Name'
                            style={styles.inputField}
                            onChange={handleChange}
                        />
                        <Input
                            type='text'
                            name='lastName'
                            placeholder='Last Name'
                            style={styles.inputField}
                            onChange={handleChange}
                        />
                        <Input
                            min='0'
                            type='number'
                            name='age'
                            placeholder='Age'
                            style={styles.inputField}
                            onChange={handleChange}
                        />
                        <Input
                            type='text'
                            name='photo'
                            placeholder='Photo URL'
                            style={styles.inputField}
                            onChange={handleChange}
                        />
                        <Button variant='contained' color='secondary' style={styles.button1} onClick={handleSaveContact}>
                            Add to my Contacts
                        </Button>
                        <NavLink to='/' style={styles.link}>
                            <Button variant='outlined' color='primary' style={styles.button2}>
                                My Contacts
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    addForm: {
        width: '30vw',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '50px',
        textAlign: 'center',
        top: '12%',
        left: '55%',
    },
    title: {
        marginTop: '50px',
        display: 'block',
        alignItems: 'center',
    },
    inputForm: {
        padding: '30px',
        display: 'block',
        paddingTop: '0px',
    },
    inputField: {
        width: '300px',
        margin: '20px',
        padding: '2px',
        borderRadius: '10px',
        paddingLeft: '15px',
    },
    button1: {
        width: '250px',
        margin: '5px',
        borderRadius: '40px',
    },
    button2: {
        width: '170px',
        margin: '5px',
        borderRadius: '40px',
    },
    link: {
        textDecoration: 'none',
    },
};

export default Add;
