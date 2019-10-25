import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { IonBackButton, IonButtons, IonHeader, IonFooter, IonPage, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/react';
import { attach } from 'ionicons/icons';
import './Chat.scss';

const ChatPage = () => {
  const ionContentRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const msg = [];
    for (let index = 0; index < 100; index++) {
      msg.push({
        text: `Hello world ${index}`,
        timestamp: '12:00 PM'
      });
    }
    setMessages(msg);
  }, []);

  const sendMessage = (e) => {
    if (e.keyCode === 13) {
      const text = e.target.value;
      e.target.value = '';
      ionContentRef.current.scrollToBottom(500);
      setMessages(prev => [ ...prev, { text, timestamp: format(new Date(), 'h:mm a') }]);
    }
  };

  return (
    <IonPage className="Chat">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={ionContentRef}>
        <div className="MessageList">
          {messages && messages.map((msg, index) => (
            <div className="message-wrapper">
              <div className={`message ${index % 2? 'message-mine' : 'message-other'}`}>
                <div className="message-text">
                  {msg.text}
                </div>
                <span className="message-timestamp">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <div className="input-container">
            <input type="text" onKeyUp={sendMessage}/>
          </div>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={attach}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ChatPage;
