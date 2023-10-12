import { styled } from "styled-components";
import { colors } from "../../styles/palette";

interface ICommonButtonProps {
  contents: string;
  onClickFn: any;
  $isRound?: boolean;
  height?: string;
}

export default function CommonButton({
  contents,
  onClickFn,
  $isRound,
  height,
}: ICommonButtonProps) {
  return (
    <Button $isRound={$isRound} onClick={onClickFn} height={height}>
      {contents}
    </Button>
  );
}

const Button = styled.button<{ $isRound?: boolean; height?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 600;

  background-color: ${colors.blue[300]};
  color: ${colors.black[1000]};
  padding: 5px 15px;
  border: 1px solid ${colors.blue[300]};
  border-radius: ${(props) => (props.$isRound ? "20px" : "10px")};
  width: 100%;
  height: ${(props) => props.height || "120%"};
  cursor: pointer;

  &:hover {
    background-color: ${colors.black[1000]};
    color: ${colors.blue[300]};
  }
`;
