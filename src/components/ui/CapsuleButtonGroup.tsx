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
  const [selected, setSelected] = useState(buttons[0].text);

  return (
    <div className={styles.row}>
      <button
        className={
          selected === buttons[0].text
            ? styles.firstCapsuleButtonSelected
            : styles.firstCapsuleButton
        }
        onClick={() => {
          setSelected(buttons[0].text);
          buttons[0].onClick();
        }}
      >
        {buttons[0].text}
      </button>
      {buttons.slice(1, buttons.length - 1).map((button) => {
        return (
          <button
            className={
              selected === button.text
                ? styles.middleCapsuleButtonSelected
                : styles.middleCapsuleButton
            }
            onClick={() => {
              setSelected(button.text);
              button.onClick();
            }}
          >
            {button.text}
          </button>
        );
      })}
      <button
        className={
          selected === buttons[buttons.length - 1].text
            ? styles.lastCapsuleButtonSelected
            : styles.lastCapsuleButton
        }
        onClick={() => {
          setSelected(buttons[buttons.length - 1].text);
          buttons[buttons.length - 1].onClick();
        }}
      >
        {buttons[buttons.length - 1].text}
      </button>
    </div>
  );
};

export default CapsuleButtonGroup;
