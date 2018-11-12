import React from 'react'
import { css } from 'glamor'
import { Auth } from 'aws-amplify'

import { withRouter } from 'react-router-dom'

class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    showConfirmation: false,
    user: {},
    authCode: ''
  }
  onChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  signIn = () => {
    const { history } = this.props
    Auth.signIn(this.state.username, this.state.password)
      .then(user => {
        console.log('user: ', user)
        if (!user.signInUserSession) {
          this.setState({ user, showConfirmation: true })
        } else {
          history.push('/')
        }        
      })
      .catch(err => console.log('error signing in...: ', err))
  }
  confirmSignIn = () => {
    const { history } = this.props
    Auth.confirmSignIn(this.state.user, this.state.authCode, this.state.user.challengeName)
      .then(user => {
        history.push('/')
      })
      .catch(err => console.log('error confirming signing in...: ', err))
  }
  render() {
    return (
      <div {...css(styles.container)}>
        {
          !this.state.showConfirmation && (
            <div {...css(styles.formContainer)}>
              <h2 {...css(styles.signInHeader)}>Sign In</h2>
              <input
                onChange={evt => this.onChange('username', evt.target.value)}
                {...css(styles.input)}
                placeholder='username'
                
              />
              <input
                type='password'
                onChange={evt => this.onChange('password', evt.target.value)}
                {...css(styles.input)}
                placeholder='password'
              />
              <div {...css(styles.button)} onClick={this.signIn}>
                <p {...css(styles.buttonText)}>Sign In</p>
              </div>
            </div>
          )
        }
        {
          this.state.showConfirmation && (
            <div {...css(styles.formContainer)}>
              <input
                onChange={evt => this.onChange('authCode', evt.target.value)}
                {...css(styles.input)}
                placeholder='Confirmation Code'
              />
              <div {...css(styles.button)} onClick={this.confirmSignIn.bind(this)}>
                <p {...css(styles.buttonText)}>Confirm Sign In</p>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

const styles = {
  signInHeader: {
    textAlign: 'left',
    margin: '0px 0px 20px'
  },
  button: {
    padding: '10px 60px',
    backgroundColor: '#ddd',
    cursor: 'pointer',
    borderRadius: '3px',
    ':hover': {
      backgroundColor: '#ededed'
    }
  },
  buttonText: {
    margin: 0
  },
  input: {
    height: 40,
    marginBottom: '10px',
    border: 'none',
    outline: 'none',
    borderBottom: '2px solid #FF9900',
    fontSize: '16px',
    '::placeholder': {
      color: 'rgba(0, 0, 0, .3)'
    }
  },
  container: {
    flex: 1,
    paddingTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formContainer: {
    padding: 20,
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: "0px 0px 5px rgba(0, 0, 0, .2)"
  }
}

export default withRouter(SignIn)
