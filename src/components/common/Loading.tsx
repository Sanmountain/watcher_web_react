import { styled } from "styled-components";
import SpinnerImg from "../../assets/images/spinner.gif";

export default function Loading() {
  return (
    <Spinner>
      <SpinnerImage src={SpinnerImg} />
    </Spinner>
  );
}

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 13%;
  height: 28%;
  z-index: 3;
`;

const SpinnerImage = styled.img`
  width: 100%;
  height: 100%;
`;
