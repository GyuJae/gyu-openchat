import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loggedState } from "../provider/logged.atom";

interface ISetNicknameForm {
  nickname: string;
}

const Container = styled.main`
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.h1`
  font-size: 30px;
  font-weight: 700;
`;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: none;
  &:focus {
    outline: 3px solid ${(props) => props.theme.color.accent};
  }
`;

const SubmitInput = styled.input`
  all: unset;
  cursor: pointer;
  margin-top: 7px;
  background-color: ${(props) => props.theme.color.accent};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  border-radius: 5px;
`;

const ErrorSpan = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.color.accent};
  font-weight: 700;
  margin-top: 20px;
`;

const SetNickname = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISetNicknameForm>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNicknameState] = useRecoilState(loggedState);

  const onSubmit: SubmitHandler<ISetNicknameForm> = ({ nickname }) => {
    setNicknameState({
      logged: true,
      nickname,
    });
  };

  return (
    <Container>
      <Logo>Logo</Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("nickname", { required: true, maxLength: 11 })}
          autoComplete="off"
        />
        <SubmitInput type={"submit"} value={"닉네임 저장"} />
        {errors.nickname?.type === "maxLength" && (
          <ErrorSpan>닉네임을 10자 이하로 해주세요</ErrorSpan>
        )}
        {errors.nickname?.type === "required" && (
          <ErrorSpan>닉네임을 꼭 작성해 주세요</ErrorSpan>
        )}
      </Form>
    </Container>
  );
};

export default SetNickname;
