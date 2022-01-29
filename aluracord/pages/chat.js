import { Box, TextField, Button } from "@skynexui/components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/header/index";
import MessageList from "../components/message-list/index";
import appConfig from "../config.json";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { getDataFromLocalStorage } from '../utils/index'

export default function ChatPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [messages, setMessageOnList] = useState([]);
  const username = getDataFromLocalStorage('username');

  useEffect(() => {
    if(!username){
      router.push({ pathname: "/" });
    }
  },[username])

  const handleTextEvent = (onKeyPressEvent) => {
    if (onKeyPressEvent.key === "Enter") {
      onKeyPressEvent.preventDefault();
      sendMessage();
    }
  };

  const onClickMessage = (value) => {
      value.preventDefault();
      sendMessage();
  }

  const sendMessage = ()  =>{
    const message = {
        id: uuidv4(),
        text: text,
        from: username,
        time: moment().format(),
    };
    setMessageOnList([message, ...messages]);
    setText("");
}

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList messages={messages} setMessages={setMessageOnList}/>

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
              onKeyPress={handleTextEvent}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              type="submit"
              label="Enviar"
              onClick={onClickMessage}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );    
}
