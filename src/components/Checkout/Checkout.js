import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../../App';


const Checkout = () => {
    const navigate = useNavigate();
    const {bookId} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [book, setBook] = useState({});
    useEffect(()=>{
        fetch(`https://safe-caverns-56430.herokuapp.com/books/${bookId}`)
        .then(res => res.json())
        .then(data => setBook(data))
    },[bookId])
    
    const handlePlaceOrder = () =>{
        const orderDetails = {...loggedInUser, ...book, orderTime:new Date()};

        fetch('https://safe-caverns-56430.herokuapp.com/addOrder',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert('Your Order placed successfully');
                navigate('/home');
            }
        })
    }

    return (
        <Container fixed>
            <h1 style={{color:'rgba(54, 57, 88, 1)'}}>Checkout</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell align="right"><strong>Quantity</strong></TableCell>
                    <TableCell align="right"><strong>Price</strong></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {book.bookName}
                    </TableCell>
                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">$ {book.price}</TableCell>
                </TableRow>
                <TableRow
                key='Total'
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row"><strong>Total</strong></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"><strong>$ {book.price}</strong></TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <Button variant="contained" onClick={handlePlaceOrder} style={{ backgroundColor:'rgba(105, 70, 244, 1)', '&:hover':{backgroundColor: 'rgba(69, 27, 237, 1)'}, padding:'10px 25px', marginTop:'10px', float:'right' }}>Checkout</Button>
        </Container>
    );
};

export default Checkout;