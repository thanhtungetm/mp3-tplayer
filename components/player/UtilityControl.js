import { faVolumeControlPhone, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cls from 'classnames'
import styles from '../../scss/player/UtilityControl.module.scss'

export function UtilityControl() {
    return (
        <div className={cls(styles.utilityControl)}>
            <div className={cls(styles.volumeControl)} >
                <FontAwesomeIcon icon={faVolumeHigh} />
                {/* <FontAwesomeIcon icon={faVolumeMute} /> */}
                <div className={cls(styles.sliderVolume)} >
                    <div className={cls(styles.sliderVolumeBase)}>
                        <div className={cls(styles.volume)}>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
