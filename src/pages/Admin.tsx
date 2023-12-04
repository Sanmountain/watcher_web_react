import * as S from "../styles/Admin.styles";
import { useEffect, useMemo, useState } from "react";
import Toggle from "../components/common/Toggle";
import { getImageSetting } from "../api/getImageSetting";
import { editImageSetting } from "../api/editImageSetting";
import EditMenu from "../components/common/admin/EditMenu";

export default function Admin() {
  const menu = useMemo(
    () => [{ label: "업무수정" }, { label: "이미지설정" }],
    [],
  );
  const [currentMenu, setCurrentMenu] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const { mutate: getImageSettingMutate } = getImageSetting(setIsOn);
  const { mutate: editImageSettingMutate } = editImageSetting(isOn, setIsOn);

  useEffect(() => {
    getImageSettingMutate();
  }, []);

  const handleCurrentMenu = (index: number) => {
    setCurrentMenu(index);
  };

  const handleImageSetting = () => {
    editImageSettingMutate();
  };

  return (
    <S.Container>
      <S.AdminMenuContainer>
        {menu.map((el, index) => (
          <S.AdminMenu
            key={el.label}
            className={currentMenu === index ? "current" : ""}
            onClick={() => handleCurrentMenu(index)}
          >
            {el.label}
          </S.AdminMenu>
        ))}
      </S.AdminMenuContainer>
      {currentMenu === 0 && <EditMenu />}
      {currentMenu === 1 && (
        <S.TitleToggleContainer>
          <S.Title>이미지설정</S.Title>
          <S.ToggleContainer>
            Off
            <Toggle onClick={handleImageSetting} $isOn={isOn} />
            On
          </S.ToggleContainer>
        </S.TitleToggleContainer>
      )}
    </S.Container>
  );
}
