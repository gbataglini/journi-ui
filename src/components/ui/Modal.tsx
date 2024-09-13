import React, { FC, ReactElement } from "react";
import styles from "./ui.module.css";
import { IoIosClose } from "react-icons/io";

interface ModalProps {
  modalHeader: string;
  onClose: () => void;
  children: ReactElement;
}

export default function Modal(props: ModalProps): ReturnType<FC> {
  return (
    <div className={styles.modal} onClick={props.onClose}>
      <div className={styles.modalMain} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalHeaderText}>{props.modalHeader}</h3>
          <IoIosClose
            size={28}
            className={styles.modalClose}
            onClick={() => props.onClose()}
          />
        </div>
        <div className={styles.modalBody}>{props.children}</div>
      </div>
    </div>
  );
}
