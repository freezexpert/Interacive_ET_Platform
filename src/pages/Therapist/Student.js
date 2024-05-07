import React from 'react';
import Grid from '@mui/material/Grid';

const Information = () => {

    return <div>
        <Grid container>
            <Grid item xs={4}>
                <button className="btn1">學生資訊</button>
            </Grid>
            <Grid item xs={4}>
                <button className="btn1">練習影片</button>
            </Grid>
            <Grid item xs={4}>
                <button className="btn1">連絡家長</button>
            </Grid>
        </Grid>
    </div>
}

export default Information