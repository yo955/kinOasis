"use client";
import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/MenuLink";
import { PiBuildingApartment } from "react-icons/pi";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";

import { useRouter } from "next/navigation";

const menuItems = [
  {
    title: "pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashpoard",
        icon: <MdDashboard />,
      },
      {
        title: "users",
        path: "/dashpoard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "compounds",
        path: "/dashpoard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Apartments",
        path: "/dashpoard/apartments",
        icon: <PiBuildingApartment />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  const router = useRouter();

  const logoutUser = async () => {
    localStorage.removeItem("jwt");
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <img
          className={styles.userImage}
          src="/noavatar.png"
          alt="userImage"
          width={50}
          height={50}
          loading="lazy"
        />
        <div className={styles.userDetails}>
          <span className={styles.username}>userName: user</span>
          <span className={styles.userTitle}>Rule: admin</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>
      <div className={styles.logout} onClick={logoutUser}>
        <MdLogout />
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
