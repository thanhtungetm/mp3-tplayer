import {
  faVolumeControlPhone,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cls from "classnames";
import { useContext, useRef } from "react";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import styles from "../../scss/player/UtilityControl.module.scss";

export function UtilityControl() {
  const {
    state: { volume },
    dispatch,
  } = useContext(MusicPlayerContext);

  const volumeSlider = useRef(null);

  const changeVolume = (e) => {
    const clientX = e.clientX;
    const volumeX = volumeSlider.current.getBoundingClientRect().x;
    const volumeWidth = volumeSlider.current.getBoundingClientRect().width;

    const percent = (clientX - volumeX) / volumeWidth;
    dispatch({ type: "SET_VOLUME", volume: percent.toFixed(2) });
  };

  return (
    <div className={cls(styles.utilityControl)}>
      <div className={cls(styles.volumeControl)}>
        {volume==0.00 ? (
          <FontAwesomeIcon icon={faVolumeMute} />
        ) : (
          <FontAwesomeIcon icon={faVolumeHigh} />
        )}
        <div className={cls(styles.sliderVolume)} onMouseDown={changeVolume}>
          <div ref={volumeSlider} className={cls(styles.sliderVolumeBase)}>
            <div style={{width: `${volume*100}%`}} className={cls(styles.volume)}>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
