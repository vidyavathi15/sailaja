import {v4} from 'uuid'

import {Component} from 'react'
import PasswordItem from '../PasswordItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Passwords extends Component {
  state = {
    websiteName: '',
    nameInput: '',
    passwordInput: '',
    passwordList: [],
    isEmptyView: false,
    searchInput: '',
  }

  togglePassword = () => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.map(
        (eachList => eachList.isShowPassword: true),
      ),
    }))
  }

  onClickShowPassword = () => {
    this.togglePassword()
  }

  addNewPassword = event => {
    event.preventDefault()
    const {websiteName, nameInput, passwordInput} = this.state
    const initialBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPassword = {
      id: v4(),
      website: websiteName,
      name: nameInput,
      password: passwordInput,
      isShowPassword: false,
      initialClassName: initialBackgroundClassName,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteName: '',
      nameInput: '',
      passwordInput: '',
    }))
  }

  callingEmptyPassword = () => {
    this.setState({isEmptyView: true})
  }

  deletePassword = id => {
    const {passwordList} = this.state

    const filteredPasswords = passwordList.filter(each => each.id !== id)
    if (filteredPasswords.length === 0) {
      this.callingEmptyPassword()
    }
    this.setState({passwordList: filteredPasswords})
  }

  getSearchResults = () => {
    const {passwordList, searchInput} = this.state
    const result = passwordList.filter(eachPassword =>
      eachPassword.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    return result
  }

  renderPasswordListView = () => {
    const searchResults = this.getSearchResults()

    return (
      <>
        {searchResults.length === 0 ? (
          this.callingEmptyPassword()
        ) : (
          <ul className="password-list">
            {searchResults.map(each => (
              <PasswordItem
                key={each.id}
                passwordDetails={each}
                deletePassword={this.deletePassword}
                onClickShowPassword={this.onClickShowPassword}
              />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderNoPasswordView = () => (
    <div className="no-password-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-img"
      />
      <p className="no-password-txt">No Passwords</p>
    </div>
  )

  onChangeWebsiteName = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      websiteName,
      nameInput,
      passwordInput,
      searchInput,
      isEmptyView,
      passwordList,
    } = this.state

    return (
      <div className="app-container">
        <div className="password-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo-img"
          />
          <div className="form-background-container">
            <div className="form-container">
              <form className="form-pass" onSubmit={this.addNewPassword}>
                <div className="input-container">
                  <div className="arrange-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                      className="icon-img"
                    />
                  </div>
                  <input
                    type="text"
                    className="input-text"
                    value={websiteName}
                    onChange={this.onChangeWebsiteName}
                    placeholder="Enter Website"
                  />
                </div>
                <div className="input-container">
                  <div className="arrange-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                      className="icon-img"
                    />
                  </div>
                  <input
                    type="text"
                    className="input-text"
                    value={nameInput}
                    onChange={this.onChangeNameInput}
                    placeholder="Enter Username"
                  />
                </div>

                <div className="input-container">
                  <div className="arrange-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                      className="icon-img"
                    />
                  </div>
                  <input
                    type="password"
                    className="input-text"
                    value={passwordInput}
                    onChange={this.onChangePasswordInput}
                    placeholder="Enter Password"
                  />
                </div>

                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-img d-md-none"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-img d-none"
            />
          </div>
          <div className="password-container">
            <div className="search-container">
              <p className="password-txt">
                <span className="count">{passwordList.length}</span>Your
                Passwords
              </p>
              <div className="icon-container">
                <div className="arrange-container-search">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="icon-img-search"
                  />
                </div>
                <input
                  type="search"
                  className="input-search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                  placeholder="Search"
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="myCheckbox"
                className="checkbox-input"
                onClick={this.onClickShowPassword}
              />
              <label htmlFor="myCheckbox" className="label">
                Show Passwords
              </label>
            </div>

            {isEmptyView
              ? this.renderNoPasswordView()
              : this.renderPasswordListView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Passwords
