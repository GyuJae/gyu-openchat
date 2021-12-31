import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SetNickname from "../components/SetNickname";
import { useSocket } from "../hooks/useSocket";
import { loggedState } from "../provider/logged.atom";
import { ROOMNAME } from "../socket.constants";

interface IMakeRoomForm {
  roomName: string;
}

const Container = styled.main`
  margin: 0px auto;
  width: ${(props) => props.theme.basicWidth};
`;

const MainContainer = styled.div``;

const Logo = styled.h1`
  font-weight: 700;
  font-size: 30px;
  color: ${(props) => props.theme.color.accent};
  text-align: center;
  padding: 20px 0px;
`;

const MakeRoomContainer = styled.div`
  background-color: ${(props) => props.theme.color.accent};
  padding: 20px 5px;
  width: 200px;
  text-align: center;
  margin: 0px auto;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
`;

const MakeRoomForm = styled.form`
  width: 200px;
  padding: 20px 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
`;

const MakeRoomInput = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 5px;
  border: none;
  &:focus {
    outline: 3px solid ${(props) => props.theme.color.accent};
  }
`;

const SubmitInput = styled.input`
  all: unset;
  background-color: ${(props) => props.theme.color.accent};
  padding: 10px 5px;
  margin-top: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorSpan = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.color.accent};
  font-weight: 700;
  margin-top: 20px;
`;

const Home = () => {
  const socket = useSocket();
  const logged = useRecoilValue(loggedState);
  const navigate = useNavigate();
  const { nickname } = useRecoilValue(loggedState);
  const [makeRoom, setMakeRoom] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMakeRoomForm>();

  const onSubmit: SubmitHandler<IMakeRoomForm> = ({ roomName }) => {
    socket.emit(ROOMNAME, { roomName, nickname }, () => {
      navigate(`${roomName}`, { state: roomName });
    });
  };

  return (
    <Container>
      {logged.logged ? (
        <MainContainer>
          <Logo>Logo</Logo>
          {makeRoom ? (
            <MakeRoomForm onSubmit={handleSubmit(onSubmit)}>
              <MakeRoomInput
                {...register("roomName", { required: true, maxLength: 36 })}
              />
              <SubmitInput type={"submit"} value={"방 만들기"} />
              {errors.roomName?.type === "maxLength" && (
                <ErrorSpan>방 이름을 35자 이하로 해주세요.</ErrorSpan>
              )}
              {errors.roomName?.type === "required" && (
                <ErrorSpan>방 이름을 작성해 주세요</ErrorSpan>
              )}
            </MakeRoomForm>
          ) : (
            <MakeRoomContainer onClick={() => setMakeRoom(true)}>
              방 만들기
            </MakeRoomContainer>
          )}
        </MainContainer>
      ) : (
        <SetNickname />
      )}
    </Container>
  );
};

export default Home;
