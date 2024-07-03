import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLocationArrow } from "react-icons/fa";
import "./Chatbot.css";
import { IoSend } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = "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";

  useEffect(() => {
    const messageFormeight = document.getElementById("messageFormeight");
    if (messageFormeight) {
      messageFormeight.scrollTop = messageFormeight.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() === "") return;

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const str_time = `${hour}:${minute < 10 ? "0" + minute : minute}`;

    const userMessage = {
      text: message,
      time: str_time,
      sender: "user",
    };

    setMessages([...messages, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const messages = [
        { role: "system", content: "You are a doctor" },
        { role: "user", content: message },
      ];

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          messages: messages,
          model: "llama3-70b-8192",
          temperature: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      let answer = "";
      if (response && response.data) {
        const { choices } = response.data;
        if (choices && choices.length > 0) {
          const { message } = choices[0];
          answer = message?.content;
          console.log(answer);
        } else {
          console.error("No choices available in the response.");
        }
      } else {
        console.error("No data in the response.");
      }

      const botMessage = {
        text: answer,
        time: str_time,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        text: `An error occurred: ${
          error.response
            ? error.response.status + " " + error.response.statusText
            : error.message
        }`,
        time: str_time,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-52 max-w-4xl mx-auto max-h-screen">
      <div className="w-full bg-[rgba(0,0,0,.4)] p-4 rounded-lg h-[50rem] flex flex-col justify-between">
        {messages.length === 0 && (
          <div className="scrollbar-container overflow-y-auto h-[45rem] px-2 flex items-center justify-center text-4xl text-white font-semibold flex-col gap-2">
            <h1>Start Chat</h1>
            <h1>Answer to your every Queries</h1>
          </div>
        )}
        {messages.length > 0 && (
          <div className="scrollbar-container overflow-y-auto h-[45rem] px-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`d-flex mb-4 ${
                  msg.sender === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="mr-1">
                    <img
                      src="https://www.prdistribution.com/spirit/uploads/pressreleases/2019/newsreleases/d83341deb75c4c4f6b113f27b1e42cd8-chatbot-florence-already-helps-thousands-of-patients-to-remember-their-medication.png"
                      className="rounded-full h-7 w-7"
                      alt="Bot"
                    />
                  </div>
                )}
                <div
                  className={`px-2 py-1 w-3/4 rounded-lg ${
                    msg.sender === "user" ? "bg-gray-200" : "bg-gray-200"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                  <span className="msg_time">{msg.time}</span>
                </div>
                {msg.sender === "user" && (
                  <div className="ml-1">
                    <img
                      src="https://i.ibb.co/d5b84Xw/Untitled-design.png"
                      className="rounded-full h-7 w-7"
                      alt="User"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="h-[3.5rem] mt-[.5rem] flex w-full gap-2 items-center bg-[#f3f3ed] rounded-[3.2rem] overflow-hidden px-2 border-2 border-cyan-800">
          <div className="flex-1 flex items-center">
            <TextareaAutosize
              minRows={1}
              maxRows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 min-h-full resize-none bg-[#f3f3ed] outline-none text-[#272727] text-sm p-1 pl-12 w-full"
              placeholder={"Ask any question..."}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-b from-cyan-700 to-cyan-300 hover:bg-gradient-to-l hover:to-cyan-700 hover:from-cyan-300 rounded-full h-10 w-10 flex justify-center items-center text-5xl transition-all duration-300"
          >
            <IoSend className="text-lg text-white" />
          </button>
        </div>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
