import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";


export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const headers = {
    authorization: "a2z" + " " + `${localStorage.getItem("userToken")}`,
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await fetch(
        "https://a2z-render.onrender.com/admin/getusermsg",
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data && Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else {
        throw new Error("Data is not an array");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <div className="container  mesg mt-5">
      <h2>Messages from Contact Us</h2>
      <div className="row">
        {isLoading ? (
          <div className="loader-container">
            <BeatLoader color="#262152" margin={4} size={40} />
          </div>
        ) : messages.length === 0 ? (
          <div>
            <p>No messages available.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div className="col-md-4" key={index}>
              <div class="card mb-3 mt-3" style={{ maxWidth: "540px" }}>
                <div class="row g-0">
                  <div class="col-md-2">
                    <div className=" imgg"></div>
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <h5 class="card-title">Message From {message.name} </h5>
                      <p class="card-text">
                      {truncateText(message.message, 100)}
                      </p>
                      <p class="card-text">
                        <small class="text-muted">
                        {truncateText(message.email, 20)}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
          ))
        )}
      </div>
    </div>
  );
}
