import React, { useState } from 'react'
import axios from 'axios';


export const Create = () => {

    const [data, setData] = useState({
        image: "",
        title: "",
        message: ""
    });

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const onSubmit = async () => {
        await axios.post("https://reactblogspost.herokuapp.com/api/post",data)
        .then(res => {
            if (res.status === 200){
              alert('Student successfully created');
              window.location="/"
            }
            else
              Promise.reject();
          })
          .catch(err => alert('Something went wrong'));
    }

    return (
        <div className='create'>
            <p className='create-post'>Create Post</p>
            <div className='content'>
                    {console.log(data)}
                        <input type="text" name="image" value={data.image} onChange={handleChange} id="create-text" placeholder='Image-url' /><br />
                        {/* <button id="browse">Browse</button><br/> */}
                        <input type="text" name='title' value={data.title} onChange={handleChange} id="create-text" placeholder='Title' /><br />
                        <textarea rows="10" name='message' value={data.message} onChange={handleChange} cols="50" id="create-textt" placeholder='Say Something...'></textarea><br />
                        <button type="submit" id="publish" onClick={onSubmit} >Publish</button>
            </div>
        </div>
    )
}
