import { faMoon, faSearch, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cls from "classnames";
import Image from "next/dist/client/image";
import styles from "../../scss/common/Header.module.scss";
export function Header() {
  return (
    <div className={cls(styles.wrapper)}>
      <div className={cls(styles.header)}>
        <div className={cls(styles.search)}>
          <label htmlFor="searchInput">
            <FontAwesomeIcon icon={faSearch} />
          </label>
          <input
            id="searchInput"
            type="text"
            placeholder="Tìm kiếm bài hát..."
          ></input>
        </div>
        <div className={cls(styles.links)}>
          <FontAwesomeIcon icon={faMoon} style={{ fontSize: 30 }} />
          <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />
          <Image
            className={cls(styles.avatarImg)}
            src="/images/avt.webp"
            width={35}
            height={35}
            layout="fixed"
          />
        </div>
      </div>
    </div>
  );
}
