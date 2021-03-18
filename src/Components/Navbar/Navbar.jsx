import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from '../Navbar/navbar.module.css';

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
        <Navbar bg="light" expand="lg">
            {menuList}
        </Navbar>
    )
}
export default MenuNavbar;