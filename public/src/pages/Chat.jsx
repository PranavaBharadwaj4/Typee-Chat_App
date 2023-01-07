import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import LoaderAnimation from "../components/LoaderAnimation";
function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("typee-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("typee-user")));
        setIsLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (currentUser !== undefined) {
        if (currentUser.isIconSet) {
          const { data } = await axios.get(
            `${allUserRoute}/${currentUser._id}`
          );
          setContacts(data);
        } else {
          navigate(`/setIcon`);
        }
      }
    }
    fetchData();
  });
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      {!isLoading ? (
        <div className="chat-body">
          <div className="chat-container">
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              handleChatChange={handleChatChange}
            />
            {currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer currentUser={currentUser} />
            )}
          </div>
        </div>
      ) : (
        <LoaderAnimation />
      )}
    </>
  );
}

export default Chat;
