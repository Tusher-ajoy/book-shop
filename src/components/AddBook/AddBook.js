import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './AddBook.css';

const AddBook = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => {
        const imgName = data.img[0].name;
        data.img = imgName;
        fetch('http://localhost:5000/addBooks', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res =>{
            if(res.ok){
                alert('Item added successfully');
                navigate('/admin/manage-book');
            }
        })
    }
    return (
        <div className='mainContainer'>
            <Sidebar />
            <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
                <div className='formControl'>
                    <label>Book Name</label><br />
                    <input {...register("bookName", { required: true })} />
                    {errors.bookName?.type === 'required' && <span style={{color:'red'}}>Book name is required</span>}
                </div>
                
                <div className='formControl'>
                    <label>Author Name</label><br />
                    <input {...register("authorName", { required: true })} />
                    {errors.authorName && <span style={{color:'red'}}>Author name is required</span>}
                </div>
                <div className='formControl'>
                    <label>Add Price</label><br />
                    <input type="number" {...register("price", { required: true })} />
                    {errors.price && <span style={{color:'red'}}>Price is required</span>}
                </div>
                <div className='formControl'>
                    <label>Add book cover photo</label><br />
                    <input className='custom-file-input' type="file" {...register("img")} />
                </div>
                <Button type='submit' variant="contained" sx={{ backgroundColor:'rgba(105, 70, 244, 1)', '&:hover':{backgroundColor: 'rgba(69, 27, 237, 1)'}, float:'right', marginRight:'130px' }} >Submit</Button>
            </form>
        </div>
    );
};

export default AddBook;