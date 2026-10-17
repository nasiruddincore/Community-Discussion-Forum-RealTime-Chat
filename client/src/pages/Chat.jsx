import { useEffect, useState } from 'react';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="max-w-md mx-auto mt-10 border rounded shadow-lg bg-white">
      <div className="bg-blue-600 text-white p-3 font-bold">Live Chat - Room: {room}</div>
      <div className="h-64 overflow-y-auto p-4 bg-gray-50">
        {messageList.map((msg, index) => (
          <div key={index} className={`mb-2 ${username === msg.author ? "text-right" : "text-left"}`}>
            <span className="text-xs text-gray-500 block">{msg.author} • {msg.time}</span>
            <span className={`inline-block p-2 rounded ${username === msg.author ? "bg-blue-500 text-white" : "bg-gray-200"}`}>{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t">
        <input type="text" value={currentMessage} placeholder="Type message..." className="border p-2 flex-grow" onChange={(e) => setCurrentMessage(e.target.value)} onKeyPress={(e) => { e.key === "Enter" && sendMessage(); }} />
        <button onClick={sendMessage} className="bg-green-500 text-white p-2 ml-2 rounded">&#9658;</button>
      </div>
    </div>
  );
}
export default Chat;