import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userDetails: JSON.parse(sessionStorage.getItem('userDetails')),
      extra: '',
      email: '',
      emailValid: '',
      completeName: '',
      completeNameValid: '',
      username: '',
    }
  }
  componentWillMount() {
    if (this.state.userDetails != null) {
      this.setState({ email: this.state.userDetails.email })
      this.setState({ completeName: this.state.userDetails.first_name })
      this.setState({ username: this.state.userDetails.username })
    } else {
      window.location.href = '/'
    }
  }
  logoutUser(e) {
    this.state.exta = e.target.value
    sessionStorage.clear()
    window.location.href = '/'
  }
  emailDataHandler(e) {
    this.state.email = e.target.value
    this.setState({ email: e.target.value })
    this.state.emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
  }

  fullNameHandler(e) {
    this.state.completeName = e.target.value
    this.setState({ completeName: e.target.value })
    this.state.completeNameValid = this.state.completeName.match(/^[a-zA-Z]+$/)
  }
  sendDetailsForLogin(e) {
    this.state.exta = e.target.value
    if (this.state.emailValid === false ||
      this.state.emailValid === null ||
      this.state.emailValid === undefined ||
      this.state.completeNameValid === false ||
      this.state.completeNameValid === null ||
      this.state.completeNameValid === undefined ||
      this.state.password.length < 8) {
      console.log('form not met with requirements')
    } else {
      const needToSend = []
      needToSend.push({ email: this.state.email,
        fullName: this.state.completeName,
        password: this.state.password,
        username: this.state.username })
      fetch('api/update_userDetails', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': window.CSRF_TOKEN,
        },
        body: JSON.stringify({ needToSend }),
        // data: JSON.stringify({ needToSend }),
        // body: JSON.stringify({ testObject }),
      })
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.message === 'wrongCredentials') {
          console.log(responseJson.message)
        } else {
          console.log(responseJson)
          const userJsonResponse = JSON.stringify(responseJson)
          sessionStorage.setItem('userDetails', userJsonResponse)
        }
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }
  deleteUserAccount(e) {
    this.state.exta = e.target.value
    if (this.state.emailValid === false ||
      this.state.emailValid === null ||
      this.state.emailValid === undefined ||
      this.state.completeNameValid === false ||
      this.state.completeNameValid === null ||
      this.state.completeNameValid === undefined ||
      this.state.password.length < 8) {
      console.log('form not met with requirements')
    } else {
      const needToSend = []
      needToSend.push({ email: this.state.email,
        fullName: this.state.completeName,
        password: this.state.password,
        username: this.state.username })
      fetch('api/delete_userAccount', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': window.CSRF_TOKEN,
        },
        body: JSON.stringify({ needToSend }),
        // data: JSON.stringify({ needToSend }),
        // body: JSON.stringify({ testObject }),
      })
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.message === 'wrongCredentials') {
          console.log(responseJson.message)
        } else {
          console.log(responseJson)
          sessionStorage.clear()
          window.location.href = '/'
        }
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }
  passwordHandler(e) {
    this.state.password = e.target.value
  }
  render() {
    return (
      <div>
        { this.state.userDetails != null ?
          <div className="container">
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ zIndex: 99999 }} >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">x</button>
                  </div>
                  <div className="modal-body" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                    Type Account Password to Save Changes
                    <input type="password" name="loginPassword" id="loginPassword" required="required" className="form-control" onChange={e => this.passwordHandler(e)} style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '10px' }} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => this.sendDetailsForLogin(e)}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal fade" id="deleteAccountModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ zIndex: 99999 }} >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">x</button>
                  </div>
                  <div className="modal-body" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                    Type Account Password to Delete Account
                    <input type="password" name="loginPassword" id="loginPassword" required="required" className="form-control" onChange={e => this.passwordHandler(e)} style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '10px' }} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => this.deleteUserAccount(e)}>Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
            <section id="formHolder">
              <div className="row">
                <div className="col-sm-6 brand">
                  <div className="heading">
                    <h2>Reactango</h2>
                    <p>User Dashboard</p>
                  </div>
                  <div className="success-msg">
                    <p>Great! You are One of Reactango Members Now</p>
                    <a href="#profile" className="profile">Your Profile</a>
                  </div>
                </div>
                <div className="col-sm-6 form">
                  <div className="login form-peice switched">
                    <form className="login-form" action="#" method="post">
                      <div className="form-group">
                        <label htmlFor="loginemail">Email Adderss</label>
                        <input type="email" name="loginemail" id="loginemail" required="required" onChange={e => this.emailDataHandler(e)} value={this.state.email} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="username" id="name" className="name" onChange={e => this.fullNameHandler(e)} value={this.state.completeName} />
                        <span className="error">a</span>
                      </div>
                      <div className="CTA">
                        <input type="submit" value="Save Changes" href="#myModal" data-toggle="modal" style={{ fontWeight: 'bold', padding: '5px 10px', marginRight: '7px' }} />
                        <a href="#new" className="switch">View Profile</a>
                        <input type="submit" value="Delete Account" href="#deleteAccountModal" data-toggle="modal" style={{ fontWeight: 'bold', padding: '5px 10px', marginRight: '0px', marginLeft: '7px' }} />
                      </div>
                    </form>
                  </div>
                  <div className="signup form-peice">
                    <form className="signup-form" action="#" method="post">
                      <div className="form-group">
                        <label htmlFor="name" className="active dashboardActive">Name</label>
                        <p className="name dashboardDetails">{this.state.completeName}</p>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="active dashboardActive">Email Adderss</label>
                        <p className="name dashboardDetails">{this.state.email}</p>
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone" className="active dashboardActive">User Name </label>
                        <p className="name dashboardDetails">{this.state.username}</p>
                      </div>
                      <div className="CTA">
                        <input type="submit" value="Logout" id="submit" onClick={e => this.logoutUser(e)} />
                        <a href="#already" className="switch">Edit Profile</a>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div> : <p>need to login</p> }
      </div>
    )
  }
}
export default App
ReactDOM.render(
  <App />,
  document.getElementById('reactjs-root'),
)

