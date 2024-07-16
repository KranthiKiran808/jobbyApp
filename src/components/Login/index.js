import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

class Login extends Component {
  state = {username: '', password: '', errorMessage: '', showSubmitError: false}

  onSubmitForm = event => {
    event.preventDefault()
    this.getIntoHomePage()
  }

  getIntoHomePage = async () => {
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMessage: errorMsg, showSubmitError: true})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMessage, showSubmitError} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <section>
        <div className="login-con">
          <div className="login-bg-container">
            <div className="website-logo">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </div>
            <form onSubmit={this.onSubmitForm}>
              <div className="input-container">
                <label htmlFor="username">USERNAME</label>
                <input
                  type="text"
                  id="username"
                  placeholder="USERNAME"
                  required
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  placeholder="PASSWORD"
                  required
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {showSubmitError && (
                  <p className="error-msg">{`* ${errorMessage}`}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}
export default Login
