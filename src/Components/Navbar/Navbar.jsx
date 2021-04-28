import { Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from '../Navbar/navbar.module.css';
import todologo from '../../img/images.png';
const menuItems = [
    {
        slug: "/",
        menuName: "Home"
    },
    {
        slug: "/contact",
        menuName: "Contact"
    },
    {
        slug: "/about",
        menuName: "About Us"
    }
];

const MenuNavbar = () => {
    const menuList = menuItems.map((item, index) => {
        return (
            <Nav.Item key={index} className={styles.item}>
                <NavLink
                    to={item.slug}
                    activeClassName={styles.active}
                    exact={true}>
                    {item.menuName}
                </NavLink>
            </Nav.Item>
        );
    });
    return (

        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                
                <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={todologo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        React JS
                        </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    
                        {menuList}
                </Navbar.Collapse>
                
            </Container>

        </Navbar>

    )
}
export default MenuNavbar;