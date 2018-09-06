import { Component } from 'react'
import Container from '~/base'
import ReactLogo from '~/assets/images/logo.svg'
import { render } from 'react-dom'
import { registerServiceWorker } from '~/utilities'
import { redirectToSignIn } from 'blockstack'

class App extends Component {

  render() {
    return (
      <Container>
        <header className='header'>
          <ReactLogo
            className='logo'
          />
          <h1
            className='title'
            children='Welcome to React'
          />
        </header>
        <p className='intro'>
          To get started, edit <code children='src/App.js' /> and save to reload.
        </p>
        <button
          children='sign in'
          onClick={ this.signIn }
        />
      </Container>
    )
  }

  signIn() {
    const origin = window.location.origin
    redirectToSignIn(origin, `${ origin }/manifest.json`, [ 'store_write', 'publish_data' ])
  }

}

render(<App />, document.getElementById('root'))
registerServiceWorker()
