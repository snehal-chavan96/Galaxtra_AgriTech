import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Community = () => {
  const [messages, setMessages] = useState([
    { user: "Sam", text: "Welcome to the community chat!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { user: "You", text: input }]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col items-center h-[500px] relative z-10 mt-10 p-6">
      <h2 className="text-4xl font-bold text-center mb-4 text-gray-100 tracking-widest">
        🌱 Community Chat
      </h2>
      <div className="w-full bg-white p-4 rounded-lg shadow-lg">
        <div className="h-[560px] overflow-y-auto p-2 border-b space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.user === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.user === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                <strong>{msg.user}: </strong> {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            className="flex-1 text-black p-2 border rounded-l-lg focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-4 py-2 rounded-r-lg flex items-center"
          >
            <Send size={18} className="mr-1" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
