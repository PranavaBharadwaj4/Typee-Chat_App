import React, { useState, useEffect } from "react";

function Contacts({ contacts, currentUser, handleChatChange }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserIcon, setCurrentUserIcon] = useState(undefined);
  // eslint-disable-next-line
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser !== undefined) {
      setCurrentUserName(currentUser.username);
      setCurrentUserIcon(currentUser.iconImage);
    }
  }, [currentUser]);
  //   console.log(currentUserName, "list");

  const changeCurrentChat = (index, chat) => {
    setCurrentSelected(index);
    handleChatChange(chat);
  };

  return (
    <>
      {currentUserIcon && currentUserName && (
        <div className="contacts-body">
          <div className="brand">
            <img src="" alt="" />
            <h1>Typee</h1>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact${
                    // eslint-disable-next-line react-hooks/exhaustive-deps

                    index === currentSelected ? "-selected" : ""
                  } `}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="icon">
                    <img
                      src={`data:image/svg+xml;base64,${contact.iconImage}`}
                      alt="Icon"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="icon">
              <img
                src={`data:image/svg+xml;base64,${currentUserIcon}`}
                alt="Icon"
                // onClick={() => setSelectedIcon(index)}
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;
