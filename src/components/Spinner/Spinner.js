import { Card, Grid, Skeleton, Stack } from '@mui/material';
import React from 'react';

const Spinner = () => {
    return (
        <>
        <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345,margin: '20px 40px' }}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Card>
        </Grid>
        <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345,margin: '20px 40px' }}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Card>
        </Grid>
        <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345,margin: '20px 40px' }}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Card>
        </Grid>
        <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345,margin: '20px 40px' }}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Card>
        </Grid>
        <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345,margin: '20px 40px' }}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Card>
        </Grid>
        <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345,margin: '20px 40px' }}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Card>
        </Grid>

        </>
        
    );
};

export default Spinner;