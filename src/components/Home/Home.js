import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Book from '../../Book/Book';
import Spinner from '../Spinner/Spinner';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(241, 241, 241, 1)',
    '&:hover': {
      backgroundColor: 'rgba(241, 241, 241, 1)',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '80%',
    margin: '40px auto',   
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '50%',
      margin: '50px auto'
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(2, 1, 2, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '55ch',
      },
      [theme.breakpoints.down('md')]: {
        width: '23ch',
      },
    },
  }));

const Home = () => {
  const [search, setSearch] = useState('');
  const [book, setBook] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(()=>{
      setIsLoading(true);
        fetch('http://localhost:5000/books')
        .then(res => res.json())
        .then(data => {
          setBook(data);
          setIsLoading(false);
        })
    },[])
    return (
        <>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Search Book…"
            onChange={(event)=>setSearch(event.target.value)}
            inputProps={{ 'aria-label': 'search' }}
            />
            <Button variant="contained" style={{ backgroundColor:'rgba(105, 70, 244, 1)', '&:hover':{backgroundColor: 'rgba(69, 27, 237, 1)'}, padding:'15px 31px' }}>Search</Button>
          </Search>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {isLoading ? <Spinner /> : book.filter(data => {
                  if(search === ''){
                    return data;
                  }
                  else if(data.bookName.toLowerCase().includes(search.toLocaleLowerCase())){
                    return data
                  }
                }).map(data => <Book key={data._id} book={data}></Book>)}
            </Grid>
          </Box>
        </>
    );
};

export default Home;