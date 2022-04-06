import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { userContext } from '../../App';


const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [orders, setOrders] = useState([]);
    const {email,name} = loggedInUser;
    useEffect(()=>{
        fetch(`http://localhost:5000/orders/${email}`)
        .then(res => res.json())
        .then(data => setOrders(data))
    },[email])

    function createData(description, quantity, price, orderTime) {
        return { description, quantity, price, orderTime };
    }
    const rows = [];
    orders.map(order => rows.push(createData(`${order.bookName} by ${order.authorName}`, 1, `${order.price}`, `${order.orderTime}`)))

    return (
        <Container>
            <h1 style={{ textAlign:'center'}}>Hey <span style={{color:'gold'}}>{name}</span>, here is your order list</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell align="right"><strong>Quantity</strong></TableCell>
                        <TableCell align="right"><strong>Price</strong></TableCell>
                        <TableCell align="right"><strong>Order Time</strong></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">{row.description}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">${row.price}</TableCell>
                                <TableCell align="right">{row.orderTime}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Orders;