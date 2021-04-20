import img404 from '../../../img/404.jpg';
import {NavLink} from 'react-router-dom'; 
const NotFound = () => {
    return (
        <>
            <h1>404 Not Found</h1>
            <NavLink to="/" exact={true}>Go to ToDoList page</NavLink>
            <div>
                <img className="mt-5" src={img404} alt="404 not found"></img>
            </div>
        </>
    )
}
export default NotFound;