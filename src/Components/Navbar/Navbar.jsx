import { Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from '../Navbar/navbar.module.css';
import todologo from '../../img/images.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
    },
    {
        slug: "/counter",
        menuName: "Counter Redux"
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
                <div>
                    <form class="form-inline my-2 my-lg-0">
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." />
                            <div class="input-group-append">
                                <button type="button" class="btn btn-secondary btn-number">
                                    <FontAwesomeIcon icon={faSearch} className="mr-1" />
                                </button>
                            </div>
                        </div>
                        {/* <a class="btn btn-success btn-sm ml-3" href="cart.html">
                            <i class="fa fa-shopping-cart"></i> Cart
                            <span class="badge badge-light">3</span>
                        </a> */}
                    </form>
                </div>
                
            </Container>

        </Navbar>

    )
}
export default MenuNavbar;