import React, {useState, useEffect, useRef} from 'react';

const ChatComponent = () => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');
    const socket = useRef();

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.parse(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose = () => {
            console.log('Сокет закрыт')
        }
        socket.current.onerror = () => {
            console.log('Сокет ошибка')
        }
    }

    const sendMessage = async () => {

    }

    if (!connected) {
        return (
            <>
                <div>
                    <input value={username} onChange={event => setUsername(event.target.value)} type="text" placeholder='Введи имя' />
                        <button onClick={connect}>Войти</button>
                </div>
            </>
        )
    }

    return (
        <div>
            <input type="text" value={value} onChange={event =>  setValue(event.target.value) }/>
            <button onClick={() => console.log(value)}>Отправить</button>
            <div>
                {messages.map(message =>
                    <div key={message.id}>
                        {message.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatComponent;
