import React, { useEffect, useState } from 'react'
import { Parallax } from 'react-parallax'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import bg from '../images/bg-2.jpg'

export const Home = () => {

    const inlineStyle = {
        // background : 'white',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 50,
        fontFamily: "system-ui",
        left: '50%',
        top: '50%',
        position: 'absolute',
        padding: '20px',
        transform: 'translate(-50%, -50%)',
    }



    return (
        <>
            <div className='home'>

                <div className='parallax'>
                    <Parallax bgImage={bg} strength={600} blur={{ min: -1, max: 5 }} >
                        <div style={{ height: 400 }}  >
                            <div style={inlineStyle}>Bloggers Point</div>
                        </div>
                    </Parallax>
                </div>
                <div className='blogpostitle'>
                    <p className='blog-post'>-Blog Posts-</p>
                </div>
                <div className='card-block'>
                    <Cards />
                </div>
            </div>
        </>
    )
}

export function Cards() {

    //get
    const [get, setGet] = useState([{}]);

    useEffect(async () => {
        await axios.get("https://reactblogspost.herokuapp.com/api/allpost")
            .then(response => setGet(response.data))
    }, [])

    console.log(get);


    return (
        <>
                {get.map((data) =>
                    <div className='cards'>
                        <Card sx={{ width: 350 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={data.image}
                                    alt={data.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {data.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {data.message}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                )}
        </>
    );
}