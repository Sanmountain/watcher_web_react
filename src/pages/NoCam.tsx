import * as S from "../styles/NoCam.styles";
import vassImage1 from "../assets/images/noCam/vassImage1.png";
import vassImage2 from "../assets/images/noCam/vassImage2.png";
import vassTitle from "../assets/images/noCam/vassTitle.png";

export default function NoCam() {
  return (
    <S.Container>
      <S.TopContainer>
        <S.Info>
          CCTV 사용 대리점이 아닙니다. 가입 후 사용 가능합니다. <br />
          <br /> <br />
          가입문의 02-555-2893
        </S.Info>
        <S.Info>
          분실화물 찾는데 오랜시간 걸렸던 녹화용 CCTV <br /> <br />
          이제는 VASS 솔루션을 도입하여 빠르게 해결할 수 있습니다.
        </S.Info>
      </S.TopContainer>
      <S.BottomContainer>
        <S.TopImageContainer>
          <S.SeparateImageContainer>
            <S.Image src={vassImage1} />
          </S.SeparateImageContainer>
          <S.SeparateImageContainer>
            <S.Image src={vassImage2} />
          </S.SeparateImageContainer>
        </S.TopImageContainer>
        <S.BottomImageContainer>
          <S.Image src={vassTitle} />
        </S.BottomImageContainer>
      </S.BottomContainer>
    </S.Container>
  );
}
