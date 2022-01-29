import React, { useEffect, useState } from "react";
import { Box, Text, Image, Button } from "@skynexui/components";
import appConfig from "../../config.json";
import moment from "moment";
import filter from "lodash/filter";

export default function MessageList(props) {
  const { messages, setMessages } = props;

  const deleteMessageClick = (event) => {
    event.preventDefault();
    const messageIdToDelete = event.target.id;
    if(messageIdToDelete){
      const listMessages = filter(messages, function (message) {
        return message.id !== messageIdToDelete;
      });
      setMessages(listMessages);
    }    
  };

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {messages?.map((message) => {
        console.log("message", message);
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Button
              iconName="FaWindowClose"
              onClick={deleteMessageClick}
              id={message.id}
              styleSheet={{
                float: "right",
                width: "50px",
                height: "22px",
                backgroundColor: "black"
              }}
            />
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag="strong">{message.from}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                às {moment(message.time).format("HH:mm")}
              </Text>
            </Box>
            {message.text}
          </Text>
        );
      })}
    </Box>
  );
}
