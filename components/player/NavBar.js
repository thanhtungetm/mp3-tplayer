import styles from "../../scss/player/NavBar.module.scss";
import Image from "next/dist/client/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faMusic, faRankingStar, faShapes, faStar, faHeart } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/images/logo.png" width={50} height={50} layout="responsive" />
      </div>
      <div className={styles.links}>
            <ul>
                <li>
                    <FontAwesomeIcon icon={faMusic} />
                    <span>Trang chủ</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faHeart} />
                    <span>Yêu thích</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faRankingStar} />
                    <span>Bảng xếp hạng</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faStar} />
                    <span>Top 100</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faShapes} />
                    <span>Danh mục</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faCircleDot} />
                    <span>Khám phá</span>
                </li>
            </ul>
      </div>
    </div>
  );
}

export default NavBar;
