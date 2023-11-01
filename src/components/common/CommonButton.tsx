import { styled } from "styled-components";
import { colors } from "../../styles/palette";

interface ICommonButtonProps {
  contents: string;
  onClickFn: any;
  $isRound?: boolean;
  width?: string;
  height?: string;
  backgroundColor?: string;
  className?: string;
}

export default function CommonButton({
  contents,
  onClickFn,
  $isRound,
  width,
  height,
  backgroundColor,
  className,
}: ICommonButtonProps) {
  return (
    <Button
      $isRound={$isRound}
      onClick={onClickFn}
      $width={width}
      $height={height}
      $backgroundColor={backgroundColor}
      className={className}
    >
      {contents}
    </Button>
  );
}

const Button = styled.button<{
  $isRound?: boolean;
  $width?: string;
  $height?: string;
  $backgroundColor?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-weight: 600;

  background-color: ${(props) => props.$backgroundColor || colors.blue[300]};
  color: ${colors.black[1000]};
  padding: 5px 15px;
  border: 1px solid ${(props) => props.$backgroundColor || colors.blue[300]};
  border-radius: ${(props) => (props.$isRound ? "20px" : "10px")};
  width: ${(props) => props.$width || "fit-content"};
  height: ${(props) => props.$height || "120%"};
  cursor: pointer;

  &:hover {
    background-color: ${colors.black[1000]};
    color: ${(props) => props.$backgroundColor || colors.blue[300]};
  }
`;
