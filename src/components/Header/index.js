import './index.css'
import {Link} from 'react-router-dom'
import Logout from '../Logout'

const Header = () => (
  <div className="header-container">
    <Link to="/">
      <div className="website-logo">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </div>
    </Link>
    <ul>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/jobs">
        <li>Jobs</li>
      </Link>
    </ul>
    <Logout />
  </div>
)

export default Header
