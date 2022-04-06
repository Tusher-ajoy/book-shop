import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Book = ({book}) => {
    const mediaStyle = {
        height: '300px',
        width:'200px',
        margin:'0 auto',
        padding: '10px',
        marginTop:'30'
    };
    const navigate = useNavigate();
    return (
        <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345, backgroundColor:'rgba(241, 241, 241, 1)', margin: '20px 40px' }}>
                <CardMedia
                    style={mediaStyle}
                    title="Book image"
                    image={require(`../images/${book.img}`)}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {book.bookName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {book.authorName}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between'}}>
                    <h1 style={{margin:'0px', color:'rgba(105, 70, 244, 1)'}}>${book.price}</h1>
                    <Button variant="contained" style={{ backgroundColor:'rgba(105, 70, 244, 1)', '&:hover':{backgroundColor: 'rgba(69, 27, 237, 1)'} }} onClick={()=>navigate(`/checkout/${book._id}`,{state:{id:1,name:'sabaoon'}})}>Buy Now</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Book;