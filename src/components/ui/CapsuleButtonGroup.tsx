import React, { useState } from "react";
import styles from "./ui.module.css";

interface CapsuleButtonGroupProps {
  buttons: TwoOrMore<ButtonProps>;
}

type TwoOrMore<T> = {
  0: T;
  1: T;
} & Array<T>;

interface ButtonProps {
  onClick: () => {};
  text: string;
}

const CapsuleButtonGroup: React.FC<CapsuleButtonGroupProps> = ({ buttons }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.row}>
      <button
        className={
          selected === 0
            ? styles.firstCapsuleButtonSelected
            : styles.firstCapsuleButton
        }
        onClick={() => {
          setSelected(0);
          buttons[0].onClick();
        }}
      >
        {buttons[0].text}
      </button>
      {buttons.slice(1, buttons.length - 1).map((button, index) => {
        return (
          <button
            className={
              selected === index + 1
                ? styles.middleCapsuleButtonSelected
                : styles.middleCapsuleButton
            }
            onClick={() => {
              setSelected(index + 1);
              button.onClick();
            }}
          >
            {button.text}
          </button>
        );
      })}
      <button
        className={
          selected === buttons.length - 1
            ? styles.lastCapsuleButtonSelected
            : styles.lastCapsuleButton
        }
        onClick={() => {
          setSelected(buttons.length - 1);
          buttons[buttons.length - 1].onClick();
        }}
      >
        {buttons[buttons.length - 1].text}
      </button>
    </div>
  );
};

export default CapsuleButtonGroup;
