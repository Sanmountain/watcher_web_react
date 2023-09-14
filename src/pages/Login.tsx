import * as S from "../styles/Login.styles";
import LogoIcon from "../assets/images/sidebar/icon_vass.png";
import JHCIcon from "../assets/images/icon_JHC.png";
import CommonButton from "../components/common/CommonButton";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { getLogin } from "../api/getLogin";
import { useRecoilState } from "recoil";
import { loginState } from "../stores/loginState";
import { useNavigate } from "react-router";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState({
    type: "password",
    isShow: false,
  });
  const [login, setLogin] = useRecoilState(loginState);

  const navigate = useNavigate();

  const { mutate: loginMutate } = getLogin(id, password);

  // NOTE 아이디 기억하기 계정인 경우 login state에서 id set해주기
  useEffect(() => {
    if (login.isUserIdStored && login.userId) {
      setId(login.userId);
    }
  }, [login.isUserIdStored, login.userId]);

  // NOTE 로그인 정보가 저장되어 있는 경우 메인 페이지로 이동
  useEffect(() => {
    if (login.isLogin) {
      navigate("/");
    }
  }, [login]);

  const handleId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClickPasswordIcon = () => {
    if (!isShowPassword.isShow)
      setIsShowPassword({
        type: "string",
        isShow: true,
      });
    else
      setIsShowPassword({
        type: "password",
        isShow: false,
      });
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setLogin({ ...login, isUserIdStored: e.target.checked, userId: id });
    } else {
      setLogin({ ...login, isUserIdStored: e.target.checked });
    }
  };

  const onClickLogin = () => {
    loginMutate();
  };

  const handleKeyDownEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  return (
    <S.Container onKeyDown={handleKeyDownEnter}>
      <S.LoginContainer>
        <S.LogoContainer>
          <S.Image src={LogoIcon} />
        </S.LogoContainer>

        <S.InputContainer>
          <S.Input
            placeholder="ID"
            onChange={handleId}
            defaultValue={login.userId}
          />
          <S.PasswordContainer>
            <S.Input
              type={isShowPassword.type}
              placeholder="Password"
              onChange={handlePassword}
            />
            {isShowPassword.isShow ? (
              <S.ShowIcon onClick={onClickPasswordIcon} />
            ) : (
              <S.HiddenIcon onClick={onClickPasswordIcon} />
            )}
          </S.PasswordContainer>
        </S.InputContainer>

        <S.SaveContainer>
          <S.CheckBox
            type="checkbox"
            checked={login.isUserIdStored}
            onChange={handleCheckbox}
          />
          ID 저장
        </S.SaveContainer>

        <S.LoginButtonContainer>
          <CommonButton contents="로그인" onClickFn={onClickLogin} $isRound />
        </S.LoginButtonContainer>

        <S.BottomContainer>
          <S.JHCIcon>
            <S.Image src={JHCIcon} />
          </S.JHCIcon>
          Copyright © JHC 2021
        </S.BottomContainer>
      </S.LoginContainer>
    </S.Container>
  );
}
