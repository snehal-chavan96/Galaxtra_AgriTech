import { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const chatHistory = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
    setMessages(chatHistory);

    if ("webkitSpeechRecognition" in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = "en-US";

      speechRecognition.onstart = () => setIsListening(true);
      speechRecognition.onend = () => setIsListening(false);
      speechRecognition.onresult = (event) => {
        setUserInput(event.results[0][0].transcript);
      };

      setRecognition(speechRecognition);
    }
  }, []);

  // Function to speak the bot's response
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // Set language
      utterance.rate = 1; // Adjust speed if needed
      speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    
    const newMessages = [...messages, { sender: "You", text: userInput, className: "text-blue-600 font-semibold" }];
    setMessages(newMessages);
    setUserInput("");

    newMessages.push({ sender: "Bot", text: "Typing...", className: "text-gray-500 italic" });
    setMessages([...newMessages]);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
      });

      const data = await response.json();
      const botMessage = data.response || "I didn’t get that.";

      newMessages.pop();
      newMessages.push({ sender: "Bot", text: botMessage, className: "text-green-700 font-semibold" });
      setMessages([...newMessages]);

      // Speak the bot's response
      speakText(botMessage);

      sessionStorage.setItem("chatHistory", JSON.stringify(newMessages));
    } catch (error) {
      newMessages.pop();
      newMessages.push({ sender: "Bot", text: "Error getting response!", className: "text-red-500" });
      setMessages([...newMessages]);
    }
  };

  return (
    <div className=" flex flex-col items-center p-6 min-h-screen">
      <h2 className="text-4xl text-white tracking-widest font-bold text-green-700 mb-10">Agritech Chatbot</h2>
      <div className="w-[1000px] bg-green-300 h-[600px] shadow-lg rounded-lg p-4">
        <div className="h-[560px] overflow-y-auto p-4 border border-gray-200 rounded-lg bg-gray-50">
          {messages.map((msg, index) => (
            <p key={index} className={msg.className}>{msg.sender}: {msg.text}</p>
          ))}
        </div>
      </div>
      <div className="flex items-center w-[1000px] mt-4">
        <button
          onClick={() => recognition && recognition.start()}
          className={`p-3 rounded-l-lg ${isListening ? 'bg-red-500' : 'bg-gray-400'} text-white transition`}
        >
          {isListening ? <Mic size={20} /> : <MicOff size={20} />}
        </button>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 p-3 border focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-6 py-3 rounded-r-lg shadow hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;



// import { useState, useEffect } from "react";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [userName, setUserName] = useState(sessionStorage.getItem("userName") || "");

//   useEffect(() => {
//     const chatHistory = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
//     setMessages(chatHistory);
//   }, []);

//   const scrapeData = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/scrape", {
//         method: "GET",
//         headers: { "Authorization": `Bearer 09d1b1c97d891bfeec629885a3ac45ef7b67edf7f26a03ad17b30ccb29e8d8f4` }
//       });
//       if (!response.ok) throw new Error("Failed to scrape data");
//       alert("Scraped Data Added!");
//     } catch (error) {
//       alert("Error fetching data!");
//     }
//   };

//   const sendMessage = async () => {
//     if (!userInput.trim()) {
//       alert("Please enter a question!");
//       return;
//     }

//     const newMessages = [...messages, { sender: "You", text: userInput, className: "text-blue-600 font-semibold" }];
//     setMessages(newMessages);
//     setUserInput("");

//     checkForName(userInput);

//     newMessages.push({ sender: "Bot", text: "Typing...", className: "text-gray-500 italic" });
//     setMessages([...newMessages]);

//     try {
//       const response = await fetch("http://localhost:8000/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer 09d1b1c97d891bfeec629885a3ac45ef7b67edf7f26a03ad17b30ccb29e8d8f4`
//         },
//         body: JSON.stringify({
//           message: userInput,
//           session_id: Date.now().toString(), // Dynamic session ID
//           context: "",
//           name: userName || "Guest"
//         })
//       });

//       const data = await response.json();
//       newMessages.pop(); // Remove "Typing..."

//       let botResponse = data.response || "Sorry, I couldn’t understand.";
//       if (userName) botResponse = botResponse.replace("{name}", userName);

//       newMessages.push({ sender: "Bot", text: botResponse, className: "text-green-700 font-semibold" });
//       setMessages([...newMessages]);
//       sessionStorage.setItem("chatHistory", JSON.stringify(newMessages));
//     } catch (error) {
//       newMessages.pop(); // Remove "Typing..."
//       newMessages.push({ sender: "Bot", text: "Error getting response!", className: "text-red-500" });
//       setMessages([...newMessages]);
//     }
//   };

//   const checkForName = (message) => {
//     const namePattern = /my name is (\w+)/i;
//     const match = message.match(namePattern);
//     if (match) {
//       sessionStorage.setItem("userName", match[1]);
//       setUserName(match[1]);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "Bot", text: `Nice to meet you, ${match[1]}!`, className: "text-green-700 font-semibold" }
//       ]);
//     }
//   };

//   return (
//     <div className="bg-green-100 flex flex-col items-center p-6 min-h-screen">
//       <h2 className="text-3xl font-bold text-green-700 mb-6">Agritech Chatbot</h2>
//       <button
//         onClick={scrapeData}
//         className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
//       >
//         Scrape Agricultural News
//       </button>
//       <div className="w-full max-w-2xl mt-6 bg-white shadow-lg rounded-lg p-4">
//         <div className="h-96 overflow-y-auto p-4 border border-gray-200 rounded-lg bg-gray-50">
//           {messages.map((msg, index) => (
//             <p key={index} className={msg.className}>{msg.sender}: {msg.text}</p>
//           ))}
//         </div>
//       </div>
//       <div className="flex items-center w-full max-w-2xl mt-4">
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           placeholder="Ask something..."
//           className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-green-600 text-white px-6 py-3 rounded-r-lg shadow hover:bg-green-700 transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


// import React from "react"; 
// import { useState } from "react";
// import { Send } from "lucide-react";
// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { user: "bot", text: "Hello! How can I help you today?" },
//   ]);
//   const [input, setInput] = useState("");

//   const getBotResponse = (message) => {
//     const lowerCaseMessage = message.toLowerCase();

//     if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
//       return "Hi there! How can I assist you?";
//     } else if (lowerCaseMessage.includes("How are you?")) {
//       return "I am fine...what's about you?";
//     } else if (lowerCaseMessage.includes("programming")) {
//       return "I see you're interested in programming! What language are you learning?";
//     } else {
//       return "That's interesting! Tell me more.";
//     }
//   };

//   const sendMessage = () => {
//     if (input.trim() !== "") {
//       const userMessage = { user: "user", text: input };
//       const botMessage = { user: "bot", text: getBotResponse(input) };

//       setMessages([...messages, userMessage, botMessage]);
//       setInput("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div className="flex flex-col relative z-10 items-center min-h-screen p-6">
//       <h2 className="text-4xl tracking-widest mt-10 font-bold text-center mb-10 text-gray-100">
//         CHATBOT ASSISTANCE 🤖
//       </h2>
//       <div className="w-[1200px]  bg-green-200 p-4 rounded-lg shadow-lg border-green-900 border-2">
//         <div className="h-[500px] overflow-y-auto p-2 border-b space-y-2">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.user === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-lg ${
//                   msg.user === "user"
//                     ? "bg-white text-green-700"
//                     : "bg-green-500 text-white"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex mt-4">
//           <input
//             type="text"
//             className="flex-1 p-2 border rounded-l-lg focus:outline-none"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-green-600 text-white px-4 py-2 rounded-r-lg flex items-center"
//           >
//             <Send size={18} className="mr-1" />
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
