import CommonButton from "../components/common/CommonButton";
import * as S from "../styles/Profile.styles";

export default function Profile() {
  return (
    <S.Container>
      <S.Title>비밀번호 변경</S.Title>
      <S.LabelInputContainer className="first">
        <S.Label>비밀번호</S.Label>
        <S.Input type="password" />
      </S.LabelInputContainer>
      <S.LabelInputContainer>
        <S.Label>비밀번호 확인</S.Label>
        <S.Input type="password" />
      </S.LabelInputContainer>
      <CommonButton
        contents="변경하기"
        onClickFn={() => console.log("ddd")}
        width="20%"
        height="45px"
      />
    </S.Container>
  );
}
