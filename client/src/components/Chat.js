import React, { useState } from "react";
import {
  Fab,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { colors } from "../styles/colors";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const commonQuestions = [
    "What is your refund policy?",
    "How to book a flight?",
    "Do you offer discounts?",
    "What are your working hours?",
  ];

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { user: "You", text: input }]);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ask`,
        { query: input }
      );
      const botReply = response.data.answer;
      setMessages((prev) => [...prev, { user: "Bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { user: "Bot", text: "Sorry, something went wrong." },
      ]);
    }

    setInput("");
  };

  const handleCommonQuestion = (question) => {
    setInput(question);
    handleSend();
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Fab
          color="primary"
          aria-label="chat"
          onClick={toggleChat}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
        >
          <ChatIcon />
        </Fab>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <Paper
          elevation={3}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 300,
            height: 500,
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: colors.basics.primary,
              color: "white",
              padding: "10px",
            }}
          >
            <Typography variant="h6">Chat with us!</Typography>
            <CloseIcon style={{ cursor: "pointer" }} onClick={toggleChat} />
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              borderTop: "1px solid #ddd",
              borderBottom: "1px solid #ddd",
              minHeight: "100px ",
            }}
          >
            {messages.map((msg, index) => (
              <Typography
                key={index}
                align={msg.user === "You" ? "right" : "left"}
                color={msg.user === "You" ? "primary" : "textSecondary"}
              >
                <strong>{msg.user}:</strong> {msg.text}
              </Typography>
            ))}
          </Box>

          {/* Common Questions */}
          <Box sx={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            <Typography variant="subtitle1">Quick Questions:</Typography>
            <List>
              {commonQuestions.map((question, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleCommonQuestion(question)}
                >
                  <ListItemText primary={question} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Input Field */}
          <Box sx={{ display: "flex", padding: "10px", gap: "10px" }}>
            <TextField
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleSend}>
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatPopup;
