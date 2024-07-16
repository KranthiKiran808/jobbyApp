import './index.css'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

const Logout = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Logout)
