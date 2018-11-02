import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import { FaPhone, FaFacebookMessenger } from 'react-icons/fa';
import { IoMdChatboxes, IoIosChatbubbles } from 'react-icons/io';
import { resolve } from 'url';
import ChatBubble from './ChatBubble';

export default class CustomerInteractions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      chats: []
    };
  }

  // getChat(channelSid) {
  //   return new Promise(resolve, reject) {
  //     fetch(
  //     'https://k7ia1ytjx9.execute-api.us-east-1.amazonaws.com/dev-with-chat/chats?channelSid=' +
  //       channelSid
  //     ).then(res.json())
  //     resolve
  // }

  componentDidMount() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var phone = url.searchParams.get('phone') || '';
    console.log(phone);
    if (phone) {
      const headers = new Headers({
        Accept: 'application/json',
        'x-api-key': process.env.aws_api_key
      })
      fetch(
        'https://k7ia1ytjx9.execute-api.us-east-1.amazonaws.com/prod/interactions?phone=' +
        encodeURIComponent(phone),
        {
          //mode: 'no-cors',
          method: 'GET',
          headers: headers
        }
      )
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              isLoaded: false,
              items: result
            });
            this.state.items.forEach(item => {
              if (item.type === 'chat' || item.type === 'sms') {
                fetch(
                  'https://k7ia1ytjx9.execute-api.us-east-1.amazonaws.com/prod/chats?channelSid=' +
                  item.chat_channel,
                  {
                    //mode: 'no-cors',
                    method: 'GET',
                    headers: headers
                  }
                )
                  .then(res => res.json())
                  .then(result => {
                    const newItem = item;
                    newItem.messages = result;
                    const existingItems = this.state.items;
                    existingItems.concat(newItem);
                    this.setState({ items: existingItems });
                  });
              }
            });
            console.log('BEFORE IS LOADED IS TRUE');
            console.log(this.state);
            this.setState({
              isLoaded: true
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          error => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    } else {
      this.setState({
        isLoaded: true,
        items: [{ worker_name: 'No records to show!' }]
      });
    }
  }

  render() {
    console.log(this.state);


    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <VerticalTimeline>
          {items.map(item => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              key={item.date_created}
              date={item.date_created}
              iconStyle={(() => {
                switch (item.type) {
                  case 'chat':
                    return { background: 'rgb(8, 100, 127)', color: '#fff' };
                  case 'sms':
                    return { background: 'rgb(174, 23, 77)', color: '#fff' };
                  default:
                    return { background: 'rgb(33, 150, 243)', color: '#fff' };
                }
              })()}
              icon={(() => {
                switch (item.type) {
                  case 'chat':
                    return <IoMdChatboxes />;
                  case 'sms':
                    return <IoIosChatbubbles />;
                  default:
                    return <FaPhone />;
                }
              })()}
            >
              <h3 className="vertical-timeline-element-title">
                Worker: {item.worker_name}
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                Customer info: {item.customer_name}
              </h4>
              {item.type === 'chat' || item.type === 'sms' ? (
                <ChatBubble messages={item.messages} />
              ) : (
                  ''
                )}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      );
    }
  }
}
