import React from 'react'
import ReactDOM from 'react-dom'
import InitialSettingsProvider from '../../shared/components/InitialSettingsProvider'
import World from './components/World'

class Hello extends React.Component {
  constructor(props) {
    super(props)

    this.defaultSettings = {
      text: 'Hello ',
      url: 'http://weknowmemes.com/wp-content/uploads/2013/12/most-photographed-places-in-the-world-map.jpg',
    }
  }

  render() {
    const currentSettings = {
      ...this.defaultSettings,
      ...this.props.initialSettings,
    }

    console.log('currentSettings', currentSettings)
    return (<div>
      <br />
      {currentSettings.text}<br />
      <br />
      <World {...currentSettings} />
    </div>)
  }
}

Hello.propTypes = {
  initialSettings: React.PropTypes.object.isRequired,
}


ReactDOM.render(
  <InitialSettingsProvider>
    <Hello initialSettings={{}} />
  </InitialSettingsProvider>,
  document.getElementById('reactjs-root'),
)

