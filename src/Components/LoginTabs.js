import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { React,  useState } from 'react'
import axios from 'axios';

function TabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function BasicTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <p className='login-title'>Login</p>
                <Login />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <p className='register-title'>Register</p>
                <Register />
            </TabPanel>
        </Box>
    );
}


function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "https://reactblogspost.herokuapp.com/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token",res.data);
            window.location="/"
            console.log(res.message);
        } catch (error) {   
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <>
            <div className='login-box'>
                <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} name='email' value={data.email} id="login" placeholder='E-mail' required /><br />
                <input type="password" onChange={handleChange} name='password' value={data.password} id="login" placeholder='Password' required /><br />
                {error&&<div>{error}</div>}
                <button type="submit" id="login-button">Login</button>
                </form>
            </div>
        </>
    );
}

function Register() {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "https://reactblogspost.herokuapp.com/api/users";
            const { data: res } = await axios.post(url, data);
            console.log(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <>
            <div className='register-box'>
                <form onSubmit={handleSubmit} >
                    <input type="text" onChange={handleChange} name="name" value={data.name} id="register" placeholder='Name' required /><br />
                    <input type="text" onChange={handleChange} name='email' value={data.email} id="register" placeholder='E-mail' required /><br />
                    <input type="password" onChange={handleChange} name='password' value={data.password} id="register" placeholder='Password' required /><br />
                    {error&&<div>{error}</div>}
                    <button type="submit" id="register-button">Register</button>
                </form>
            </div>
        </>
    );
}