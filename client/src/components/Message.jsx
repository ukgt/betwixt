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
  };
  async componentDidMount() {
    this.setState({ checkingSession: false });
    const pusher = new Pusher("be45f6d9f5b297267413", {
      cluster: "us2",
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
        userName: this.state.username,
        message: this.state.text
      }
      console.log('hey!!!', payload)
      axios.post('/message', payload)
    } else {
      this.setState({ text: e.target.value })
    }
  }

  handleUsernameSubmit = (event) => {
    event.preventDefault();

    const usernameElement = event.target.querySelector('[name="username"]');

    if (usernameElement) {
      this.setState({ username: usernameElement.value });
    }

    console.log(event.target)
  }


  renderGrabUserName = () => {
    return (
      <div>
        <label>Enter Username:</label>
        <form onSubmit={this.handleUsernameSubmit}>
          <input name="username" type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  render() {
    const { username } = this.state;
    // JSX
    return (
      <div>
        {username ?
        <section>
          <ChatList chats={this.state.chats} username={this.state.username}/>
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          />
        </section>
        :
        this.renderGrabUserName()
        }
      </div>
    )
  }
}
