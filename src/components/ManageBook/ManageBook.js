import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Sidebar from '../Sidebar/Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ManageBook = () => {
    const navigate = useNavigate();
    const [book, setBook] = useState([]);
    useEffect(()=>{
        fetch('https://safe-caverns-56430.herokuapp.com/books')
        .then(res => res.json())
        .then(data => setBook(data))
    },[])

    function createData(name, aName, price, id) {
        return { name, aName, price, id };
    }
    const rows = [];
    book.map(b => {
      rows.push(createData(b.bookName,b.authorName,`$${b.price}`, b._id))
    })

    const handleDelete = (id) =>{
        fetch(`https://safe-caverns-56430.herokuapp.com/delete/${id}`,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(result =>{
            if(result){
                alert('Order deleted successfully');
                navigate('/admin/add-book');
            }
        })
    }
      
    return (
        <>
        <Sidebar />
        <TableContainer component={Paper} sx={{width:'80%', margin:'0 auto'}}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                <TableRow>
                    <TableCell><strong>Book Name</strong></TableCell>
                    <TableCell align="right"><strong>Author Name</strong></TableCell>
                    <TableCell align="right"><strong>Price</strong></TableCell>
                    <TableCell align="right"><strong>Action</strong></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.aName}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right"><Button variant="outlined" color="success"><EditIcon /></Button> <Button variant="outlined" color="error" onClick={()=>handleDelete(row.id)}><DeleteIcon /></Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default ManageBook;