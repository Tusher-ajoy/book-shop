import React from 'react';
import './Sidebar.css'
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const handleClicked = (e) =>{
        const destination = e.target.textContent;
        const destinationInLowerCase = destination.toLowerCase();
        const finalDestination = destinationInLowerCase.replace(" ","-");
        navigate(`/admin/${finalDestination}`);
    }
    return (
        <div className='sidebar'>
            <li onClick={handleClicked}><BorderAllRoundedIcon />Manage Book</li>
            <li onClick={handleClicked}><AddIcon />Add Book</li>
            <li onClick={handleClicked}><BorderColorIcon />Edit Book</li>
        </div>
    );
};

export default Sidebar;