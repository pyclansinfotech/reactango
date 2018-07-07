import React from 'react'
import $ from 'jquery'
// import Redirect from 'react-router-dom'

class InitialSettingsProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      completeName: '',
      username: '',
      password: '',
      emailValidOrNot: '',
      allEmails: [],
      formErrors: { email: '' },
      emailValid: false,
      isDeleteRecords: [],
      showRecords: false,
      confirmPassword: '',
      completeNameValid: '',
      usernameValid: '',
    }
  }

  emailDataHandler(e) {
    this.state.email = e.target.value
    this.state.emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
  }

  fullNameHandler(e) {
    this.state.completeName = e.target.value
    this.state.completeNameValid = this.state.completeName.match(/^[a-zA-Z]+$/)
    console.log('completeName', this.state.completeNameValid)
  }
  usernameHandler(e) {
    this.state.username = e.target.value
    this.state.usernameValid = this.state.username.match(/^[a-zA-Z0-9_.-]*$/)
  }

  passwordHandler(e) {
    this.state.password = e.target.value
  }
  confirmPasswordHandler(e) {
    this.state.confirmPassword = e.target.value
  }
  submitDetails(e) {
    this.state.allEmails = e.target.value
    const needToSend = []
    needToSend.push({ email: this.state.email,
      fullName: this.state.completeName,
      password: this.state.password,
      username: this.state.username })
    // const a = 2
    if (this.state.emailValid === false ||
      this.state.emailValid === null ||
      this.state.emailValid === undefined ||
      this.state.confirmPassword !== this.state.password ||
      this.state.completeNameValid === false ||
      this.state.completeNameValid === null ||
      this.state.completeNameValid === undefined ||
      this.state.usernameValid === false ||
      this.state.usernameValid === null ||
      this.state.usernameValid === undefined ||
      this.state.password.length < 8) {
      // console.log('a')
      console.log('Not met with Requirements')
    } else {
      $('.signup, .login').addClass('switched')
      setTimeout(() => { $('.signup, .login').hide() }, 700)
      setTimeout(() => { $('.brand').addClass('active') }, 300)
      setTimeout(() => { $('.heading').addClass('active') }, 600)
      setTimeout(() => { $('.success-msg p').addClass('active') }, 900)
      setTimeout(() => { $('.success-msg a').addClass('active') }, 1050)
      setTimeout(() => { $('.form').hide() }, 700)
      fetch('api/test_fun', {
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
    }
  }
  sendDetailsForLogin(e) {
    this.state.allEmails = e.target.value
    const needToSend = []
    needToSend.push({ email: this.state.email,
      password: this.state.password })
    if (this.state.emailValid === false ||
      this.state.emailValid === null ||
      this.state.emailValid === undefined ||
      this.state.password.length < 8) {
      // console.log('a')
      console.log('Not met with Requirements')
    } else {
      fetch('api/login_fun', {
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
          window.location.href = '/dashboard'
        }
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }

  addRecords(emailValue, e) {
    e.preventDefault()
    let enterValue = 0
    for (let i = 0; i < this.state.allEmails.length; i++) {
      if (this.state.allEmails[i].email === emailValue) {
        enterValue++
      }
    }
    if (enterValue === 0) {
      this.setState({ showRecords: true })
      const lengthOfArray = this.state.allEmails.length
      this.state.isDeleteRecords[lengthOfArray] = false
      this.setState({ allEmaisDeleteRecordsils: this.state.isDeleteRecords })

      this.state.allEmails.push({
        name: this.state.completeName,
        email: emailValue,
      })
      this.setState({ allEmails: this.state.allEmails })
    }
  }

  deleteRecords(e, index) {
    // const indexValue = this.state.allEmails.indexOf(index)
    e.preventDefault()
    const myArray = this.state.allEmails.slice()
    myArray.splice(index, 1)
    this.setState({ allEmails: myArray })
    // this.setState({isDeleteRecords: false})
    this.state.isDeleteRecords[index] = false
    this.setState({ allEmaisDeleteRecordsils: this.state.isDeleteRecords })
    if (this.state.allEmails.length === 1) {
      this.setState({ showRecords: false })
    }
  }

  editRecords(e, index) {
    // const indexValue = this.state.allEmails.indexOf(index)
    // this.setState({isDeleteRecords: true})
    this.state.isDeleteRecords[index] = true
    this.setState({ allEmaisDeleteRecordsils: this.state.isDeleteRecords })
  }

  nameHandler(e) {
    this.setState({ completeName: e.target.value })
  }
  updateNameHandler(e, index) {
    this.state.allEmails[index].name = e.target.value
    this.forceUpdate()
  }
  updateRecords(e, index) {
    // this.setState({isDeleteRecords: false})
    this.state.isDeleteRecords[index] = false
    this.setState({ allEmaisDeleteRecordsils: this.state.isDeleteRecords })
    const needToSend = this.state.allEmails
    console.log('needToSend', needToSend)
    console.log('needToSend(JSON.stringify)', JSON.stringify(needToSend))
    // const testObject = { firstName: 'First', lastName: 'Last' }
    fetch('api/test_fun', {
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
  }
  showToasterMessages(e) {
    this.state.allEmails = e.target.value
    // console.log('working')
    const x = document.getElementById('snackbar')
    x.className = 'show'
    setTimeout(() => { x.className = x.className.replace('show', '') }, 300000)
  }
  render() {
    return (
      <div>
        <div className="container">
          <button onClick={e => this.showToasterMessages(e)}>Show Snackbar</button>
          <div id="snackbar">Some text some message..</div>
          <section id="formHolder">
            <div className="row">
              <div className="col-sm-6 brand">
                <div className="heading">
                  <h2>Reactango</h2>
                  <p>React-Django Basic CRUD App</p>
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
                      <input type="email" name="loginemail" id="loginemail" required="required" onChange={e => this.emailDataHandler(e)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="loginPassword">Password</label>
                      <input type="password" name="loginPassword" id="loginPassword" required="required" onChange={e => this.passwordHandler(e)} />
                    </div>
                    <div className="CTA">
                      <input type="submit" value="Login" onClick={e => this.sendDetailsForLogin(e)} />
                      <a href="#new" className="switch">I am New</a>
                    </div>
                  </form>
                </div>
                <div className="signup form-peice">
                  <form className="signup-form" action="#" method="post">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" name="username" id="name" className="name" onChange={e => this.fullNameHandler(e)} />
                      <span className="error">a</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Adderss</label>
                      <input type="email" name="emailAdress" id="email" className="email" onChange={e => this.emailDataHandler(e)} />
                      <span className="error">a</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">User Name </label>
                      <input type="text" name="phone" id="phone" onChange={e => this.usernameHandler(e)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" id="password" className="pass" onChange={e => this.passwordHandler(e)} />
                      <span className="error">a</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="passwordCon">Confirm Password</label>
                      <input type="password" name="passwordCon" id="passwordCon" className="passConfirm" onChange={e => this.confirmPasswordHandler(e)} />
                      <span className="error">a</span>
                    </div>
                    <div className="CTA">
                      <input type="submit" value="Signup Now" id="submit" onClick={e => this.submitDetails(e)} />
                      <a href="#already" className="switch">I have an account</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
export default InitialSettingsProvider
