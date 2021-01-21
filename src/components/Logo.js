import { Link } from 'react-router-dom';
import logo from '../assets/Без названия.png';

const Logo = (props) => {

    return (
        <div className={`logo ${props.classOver ? props.classOver : ''}`}>
            <Link to="/" className="logo__link">
                <figure className={`logo__figure ${props.classImg ? props.classImg : ''}`}>
                    <img className="logo__img" src={logo} alt="Logo" />
                </figure>
                {/* <h5 className={`heading heading__3 logo__heading ${props.class ? props.class : ''}`}>Logo</h5>
                 */}
            </Link>
        </div>
    )
};

export default Logo;