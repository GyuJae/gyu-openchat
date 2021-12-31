import { atom } from "recoil";

interface ILoggedState {
  logged: boolean;
  nickname: string;
}

export const loggedState = atom<ILoggedState>({
  key: "loggedState",
  default: { logged: false, nickname: "이름없음" },
});
