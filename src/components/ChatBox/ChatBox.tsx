import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addMessage } from "../../features/messageSlice";
import { UserOutlined, SendOutlined, SearchOutlined } from "@ant-design/icons";
import "../../styles/Chatbox.css";

interface ChatBoxProps {
  selectedUser: string | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({ selectedUser }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) =>
    selectedUser ? state.messages.messages[selectedUser] || [] : []
  );
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [messageInput, setMessageInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const botReplies: { [key: string]: string[] } = {
    hi: ["Hi there! 👋", "Hello! How can I help you?", "Hey! 😊"],
    how: [
      "I'm just a bot, but I'm here to help!",
      "I'm doing great! How about you?",
    ],
    help: [
      "Sure! What do you need help with?",
      "I'm here to assist. Ask me anything!",
    ],
    bye: ["Goodbye! Have a great day!", "See you soon! 👋"],
    default: [
      "I'm not sure I understand. Can you rephrase that?",
      "Hmm... Can you clarify? 🤔",
    ],
  };

  const getBotReply = (message: string): string => {
    message = message.toLowerCase();
    for (let key in botReplies) {
      if (message.includes(key)) {
        const responses = botReplies[key];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    const defaultResponses = botReplies["default"];
    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser || !selectedUser || messageInput.trim() === "") return;
    dispatch(
      addMessage({
        user: selectedUser,
        message: {
          sender: currentUser.userName,
          content: messageInput.trim(),
        },
      })
    );
    const userMessage = messageInput.trim();
    setMessageInput("");
    setTimeout(() => {
      const botResponse = getBotReply(userMessage);
      dispatch(
        addMessage({
          user: selectedUser,
          message: {
            sender: selectedUser,
            content: botResponse,
          },
        })
      );
    }, 1000);
  };

  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chatbox">
      {selectedUser ? (
        <>
          <div className="chat-header">
            <UserOutlined className="user-icon" />
            <h3>{selectedUser}</h3>
          </div>
          <div className="search-bar">
            <SearchOutlined className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search messages..."
            />
          </div>
          <div className="chat-msg">
            {filteredMessages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === currentUser?.userName ? "s-msg" : "r-msg"
                }
              >
                <p className="msg">{msg.content}</p>
              </div>
            ))}
          </div>
          <form className="chat-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">
              <SendOutlined />
            </button>
          </form>
        </>
      ) : (
        <div className="no-chat-selected">Select a user to start chatting</div>
      )}
    </div>
  );
};

export default ChatBox;
