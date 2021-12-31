import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import NoPage from "../components/NoPage";
import { useSocket } from "../hooks/useSocket";
import { BYE_ROOM, CHATTING } from "../socket.constants";
import { useRecoilValue } from "recoil";
import { loggedState } from "../provider/logged.atom";
import { FaRegPaperPlane } from "react-icons/fa";

interface IChat {
  payload: string;
}

const Container = styled.main`
  width: ${(props) => props.theme.basicWidth};
  margin: 0px auto;
`;

const ChatContainer = styled.div``;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  padding: 20px;
  border-bottom: 2px solid;
`;

const Form = styled.form`
  position: fixed;
  bottom: 5px;
  width: ${(props) => props.theme.basicWidth};
  height: 150px;
  display: grid;
  grid-template-columns: 18fr 1fr;
`;

const Input = styled.textarea`
  height: 150px;
  resize: none;
  font-size: 20px;
  color: black;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  &:focus {
    outline: 3px solid ${(props) => props.theme.color.accent};
  }
`;

const SubmitInput = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.color.accent};
  border: none;
  color: ${(props) => props.theme.color.text};
  border-radius: 5px;
  cursor: pointer;
`;

const Room = () => {
  const { state: roomName } = useLocation();
  const { register, handleSubmit } = useForm<IChat>();
  const socket = useSocket();
  const { nickname } = useRecoilValue(loggedState);

  const onSubmit: SubmitHandler<IChat> = ({ payload }) => {
    socket.emit(CHATTING, { payload, nickname, roomName }, () =>
      console.log(payload, nickname, roomName)
    );
  };

  useEffect(() => {
    socket.on(CHATTING, (item, done) => {
      done();
      console.log(item);
    });
    socket.on(BYE_ROOM, () => {
      console.log("BYE BYE ~~~~");
    });
  }, [socket]);

  return (
    <Container>
      {roomName ? (
        <ChatContainer>
          <Title>{roomName as string}</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("payload", { required: true })} />
            <SubmitInput type={"submit"}>
              <FaRegPaperPlane style={{ fontSize: 25 }} />
            </SubmitInput>
          </Form>
        </ChatContainer>
      ) : (
        <NoPage />
      )}
    </Container>
  );
};

export default Room;
