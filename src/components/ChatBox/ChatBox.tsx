import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setActiveUser,
  clearMessages,
  sendMessageRequest,
} from "../../redux/messages/messageSlice";
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

  useEffect(() => {
    if (selectedUser) {
      dispatch(setActiveUser(selectedUser));
    }
  }, [selectedUser, dispatch]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser || !selectedUser || messageInput.trim() === "") return;

    dispatch(
      sendMessageRequest({
        user: selectedUser,
        message: { sender: currentUser.userName, content: messageInput.trim() },
      })
    );

    setMessageInput("");
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
