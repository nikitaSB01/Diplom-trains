import React, { useState } from "react";
import styles from "./FiltersThereBack.module.css";

import { ReactComponent as ArrowThereIcon } from "../../../../assets/icons/Filters/FiltersThereBack/arrowThere.svg";
import { ReactComponent as ArrowBackIcon } from "../../../../assets/icons/Filters/FiltersThereBack/arrowBack.svg";
import { ReactComponent as ToggleIconPlus } from "../../../../assets/icons/Filters/FiltersThereBack/plus.svg";
import { ReactComponent as ToggleIconMinus } from "../../../../assets/icons/Filters/FiltersThereBack/minus.svg";

import Track from "./Track/Track";

interface FiltersThereBackProps {
  title: "Туда" | "Обратно";
}

export const FiltersThereBack: React.FC<FiltersThereBackProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  // выбираем нужную стрелку
  const ArrowIcon = title === "Туда" ? ArrowThereIcon : ArrowBackIcon;

  return (
    <div className={styles.container}>
      <button className={styles.header} onClick={handleToggle} type="button">
        <div className={styles.headerLeft}>
          <div className={styles.iconWrapper}>
            <ArrowIcon />
          </div>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.toggle}>
          {isOpen ? <ToggleIconMinus /> : <ToggleIconPlus />}
        </div>
      </button>

      {isOpen && (
        <div className={styles.body}>
          <Track label="Время отбытия" />        {/* выравнивание по левому краю */}
          <Track label="Время прибытия" align="right" />  {/* выравнивание по правому */}
        </div>
      )}
    </div>
  );
};

export default FiltersThereBack;
