import {Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'; 
import styles from '../Navbar/navbar.module.css';

const Navbar = () => {
    return (
        <Nav
            activeKey="/"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
            <Nav.Item className={styles.item}>
                <NavLink to="/" activeClassName={styles.active} exact={true}>Home</NavLink>
            </Nav.Item>
            <Nav.Item className={styles.item}>
                <NavLink to="/contact" activeClassName={styles.active} exact={true}>Contact</NavLink>
            </Nav.Item>
            <Nav.Item className={styles.item}> 
                <NavLink to="/about" activeClassName={styles.active} exact={true}>About Us</NavLink>
            </Nav.Item>
        </Nav>
    )
}
export default Navbar;