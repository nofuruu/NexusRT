
import { Link } from 'react-router'
import LogoIcon from 'src/assets/images/logos/logo-icon.svg'

const Logo = () => {
    return (
        <Link to={'/'}>
            <img src={LogoIcon} alt="logo" className="w-10 h-10" />
        </Link>
    )
}

export default Logo
