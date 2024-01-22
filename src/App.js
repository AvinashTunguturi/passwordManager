import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordManager: [],
    searchResultList: [],
    showPasswords: false,
    searchMode: false,
    passwordCount: 0,
  }

  submitForm = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const newPasswordDetails = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordManager: [...prevState.passwordManager, newPasswordDetails],
      website: '',
      username: '',
      password: '',
      passwordCount: prevState.passwordCount + 1,
    }))
  }

  observeWebsite = event => {
    this.setState({website: event.target.value})
  }

  observeUsername = event => {
    this.setState({username: event.target.value})
  }

  observePassword = event => {
    this.setState({password: event.target.value})
  }

  checkedStatus = event => {
    console.log(event.target.checked)
    this.setState({showPasswords: event.target.checked})
  }

  searchPasswords = event => {
    if (event.target.value === '') {
      this.setState({searchMode: false})
    }

    const {passwordManager} = this.state

    const searchValue = event.target.value
    const searchResultList = passwordManager.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchValue.toLowerCase()),
    )

    console.log(searchValue)
    console.log(searchResultList)
    this.setState({
      searchResultList,
      searchMode: true,
      passwordCount: searchResultList.length,
    })
  }

  renderForm = () => (
    <div className="form-container">
      <form className="form" onSubmit={this.submitForm}>
        <h1 className="form-heading">Add New Password</h1>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
            className="icon"
          />
          <input
            placeholder="Enter Website"
            className="input-field"
            onChange={this.observeWebsite}
          />
        </div>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
            className="icon"
          />
          <input
            placeholder="Enter Username"
            className="input-field"
            onChange={this.observeUsername}
          />
        </div>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
            className="icon"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="input-field"
            onChange={this.observePassword}
          />
        </div>
        <div className="add-button">
          <button type="submit" className="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  )

  renderSavedPasswords = eachPassword => {
    const {showPasswords, passwordManager} = this.state
    const {id, website, username, password} = eachPassword

    const deletePassword = () => {
      const remainingPasswordsList = passwordManager.filter(
        eachPasswordDetails => eachPasswordDetails.id !== id,
      )
      this.setState({
        passwordManager: remainingPasswordsList,
        passwordCount: remainingPasswordsList.length,
      })
    }
    return (
      <div>
        <div className="initial-container">
          <p>{website.slice(0, 1)}</p>
        </div>
        <div>
          <p>{website}</p>
          <p>{username}</p>
          {showPasswords ? (
            <p>{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
        <button type="button" testid="delete" onClick={deletePassword}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    )
  }

  renderNoPasswordView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className=""
      />
      <p>No Passwords</p>
    </div>
  )

  renderPasswordView = () => {
    const {passwordManager} = this.state
    const noOfPasswordsSaved = passwordManager.length

    return (
      <>
        {noOfPasswordsSaved === 0 ? (
          this.renderNoPasswordView()
        ) : (
          <ul>
            {passwordManager.map(eachPassword => (
              <li key={eachPassword.id}>
                {this.renderSavedPasswords(eachPassword)}
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  renderSearchResults = () => {
    const {searchResultList} = this.state
    const noOfPasswordsSaved = searchResultList.length

    return (
      <>
        {noOfPasswordsSaved === 0 ? (
          this.renderNoPasswordView()
        ) : (
          <ul>
            {searchResultList.map(eachPassword => (
              <li key={eachPassword.id}>
                {this.renderSavedPasswords(eachPassword)}
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  render() {
    const {passwordCount, searchResultList, searchMode} = this.state

    console.log(searchResultList)
    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo-image"
          />
        </div>
        <div className="top-section">
          {this.renderForm()}
          <div className="password-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-image"
            />
          </div>
        </div>
        <div className="bottom-section">
          <div className="bottom-header">
            <h1>Your Passwords</h1>
            <p>{passwordCount}</p>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="icon"
              />
              <input
                type="search"
                placeholder="search"
                className="input-field"
                onChange={this.searchPasswords}
              />
            </div>
          </div>
          <hr />
          <div className="show-password-container">
            <div className="check-box-container">
              <input
                type="checkbox"
                id="checkbox"
                onChange={this.checkedStatus}
              />
              <label htmlFor="checkbox">Show Passwords</label>
            </div>
            {searchMode
              ? this.renderSearchResults()
              : this.renderPasswordView()}
          </div>
        </div>
      </div>
    )
  }
}

export default App
