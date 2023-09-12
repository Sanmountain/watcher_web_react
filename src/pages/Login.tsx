import * as S from "../styles/Login.styles";
import LogoIcon from "../assets/images/sidebar/icon_vass.png";
import JHCIcon from "../assets/images/icon_JHC.png";
import CommonButton from "../components/common/CommonButton";
import { useState } from "react";

export default function Login() {
  const [isShowPassword, setIsShowPassword] = useState({
    type: "password",
    isShow: false,
  });

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

  return (
    <S.Container>
      <S.LoginContainer>
        <S.LogoContainer>
          <S.Image src={LogoIcon} />
        </S.LogoContainer>

        <S.InputContainer>
          <S.Input placeholder="ID" />
          <S.PasswordContainer>
            <S.Input type={isShowPassword.type} placeholder="Password" />
            {isShowPassword.isShow ? (
              <S.ShowIcon onClick={onClickPasswordIcon} />
            ) : (
              <S.HiddenIcon onClick={onClickPasswordIcon} />
            )}
          </S.PasswordContainer>
        </S.InputContainer>

        <S.SaveContainer>
          <S.CheckBox type="checkbox" />
          ID 저장
        </S.SaveContainer>

        <S.LoginButtonContainer>
          <CommonButton
            contents="로그인"
            onClickFn={() => console.log("dddd")}
            $isRound
          />
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
