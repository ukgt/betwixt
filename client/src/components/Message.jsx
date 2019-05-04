import React from 'react'
import Pusher from 'pusher-js'
import ChatBox from '../ChatBox'
import ChatList from '../ChatList'
import axios from 'axios'

export default class Message extends React.Component {
  state = {
    checkingSession: true,
    text: '',
    username: '',
    chats: []
  }
  async componentDidMount () {
    this.setState({ checkingSession: false })
    const username = window.prompt('Username: ', 'Anonymous') // TODO:
    this.setState({ username, checkingSession: false })
    const pusher = new Pusher('be45f6d9f5b297267413', {
      cluster: 'us2',
      encrypted: true
    })
    const channel = pusher.subscribe('chat')
    channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: '' })
      console.log(this.state)
    })
  }
  handleTextChange = e => {
    if (e.keyCode === 13) {
      let payload = {
        userId: sessionStorage.getItem('currentUser'),
        message: this.state.text
      }
      console.log('hey!!!', payload)
      axios.post('/message', payload)
    } else {
      this.setState({ text: e.target.value })
    }
  }

  render () {
    // JSX
    return (
      <div>
        <section>
          <ChatList chats={this.state.chats} username={this.state.username}/>
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          />
        </section>
      </div>
    )
  }
}
