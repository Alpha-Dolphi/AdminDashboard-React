import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import Particles from "react-tsparticles";
import { loadSeaAnemonePreset } from "tsparticles-preset-sea-anemone";
import Typewriter from "typewriter-effect";
import "./styles.css";

export const Heading = ({ className, name, searchOption = false }) => {
  const particlesInit = async (engine) => {
    await loadSeaAnemonePreset(engine);
  };

  return (
    <div className={classNames(styles.headingWrap, className)}>
      <Particles
        id="tsparticles"
        className={styles.tsparticles}
        init={particlesInit}
        options={{
          preset: "seaAnemone",
          fullScreen: {
            enable: false,
          },
          image: "#4a03fc",
        }}
      />
      <div id="items" className={styles["page-title"]}>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString(name).start();
          }}
        />
        {searchOption ? <input /> : ""}
      </div>
    </div>
  );
};
