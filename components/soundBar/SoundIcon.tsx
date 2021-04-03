import React from "react";
import styles from "./SoundBar.module.css";

const SoundIcon: React.FC<{}> = () => {
  return <i className={`${styles.soundBar} soundIcon`} />;
};

export default SoundIcon;
