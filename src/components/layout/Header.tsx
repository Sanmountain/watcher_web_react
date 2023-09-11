import * as S from "../../styles/layout/Header.styles";

export default function Header() {
  return (
    <S.Container>
      <S.ProfileButtonContainer>
        <S.Profile>홍길동</S.Profile>
        <S.LogOutButton>Logout</S.LogOutButton>
      </S.ProfileButtonContainer>
    </S.Container>
  );
}
