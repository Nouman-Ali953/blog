import React from 'react'
import { AppBar,Toolbar,styled } from '@mui/material'
import '../../scss/login.scss'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import '../../scss/media.scss';


const Component = styled(AppBar)`
    background:#978a73;
    color: #FFFFFF;
    font-weight: 400;
    letter-spacing:1px;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #ffffff;
        text-decoration: none;
    }
`

const logout = () =>{
  sessionStorage.removeItem(
    "accessToken"
  );
  sessionStorage.removeItem(
    "refreshToken"
  );
}
const Header = () => {
  return (
    <>
        <Component>
            <Container className='menu'>
              <img src={logo} alt="logo" id='main-logo'/>
                <Link to='/' id='margin'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/account' onClick={logout}>LOGOUT</Link>
            </Container>
        </Component>
    </>
  )
}

export default Header
