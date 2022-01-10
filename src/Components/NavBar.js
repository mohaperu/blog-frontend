import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { About } from './About'
import { Create } from './Create'
import { Home } from './Home'
import 'boxicons'
import { Login } from './Login'


export const NavBar = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    const user = localStorage.getItem('token');

    const useer = localStorage.getItem('token');
    console.log(useer)
    return (
        <>
            <div className='navbar'>
                <div className='nav-wrapper'>
                    <ul className='nav-items'>

                        <box-icon type='logo' name='blogger' size="2.5rem" id="logo" color="white"></box-icon><span className='logo-title' >Blogger</span>

                        <li className='items'>
                            <Link exact to="/" className='link'>Home</Link>
                        </li>
                        <li className='items'>
                            <Link to="/create-blog" className='link'>Create</Link>
                        </li>
                        <li className='items'>
                            <Link to="/about" className='link'>About</Link>
                        </li>

                        {user ?
                            <button className='login' onClick={handleLogout}>Logout</button> :
                            <button className='login'><Link to="/login" className='loginlink'>Login</Link></button>
                        }

                        {/* <box-icon name='user' id="user" size="md" color="white" ></box-icon>
                        <p className='username'>Mohan</p> */}

                    </ul>
                </div>
            </div>

            <Switch>
                <Route exact path="/"> <Home /> </Route>
                <Route path="/create-blog"> <Create /> </Route>
                <Route path="/about"> <About /> </Route>
                <Route path="/login"> <Login /> </Route>
            </Switch>
        </>
    )
}


