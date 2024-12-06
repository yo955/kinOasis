"use client";
import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/MenuLink";
import Image from "next/image";
import { PiBuildingApartment } from "react-icons/pi";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
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
        <Image
          className={styles.userImage}
          src="/noavatar.png"
          alt="userImage"
          height={50}
          width={50}
        />
        <div className={styles.userDetails}>
          <span className={styles.username}>userName: user</span>
          <span className={styles.userTitle}>Rule: admin</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => {
          return (
            <li key={cat.title}>
              <span className={styles.cat}>{cat.title}</span>
              {cat.list.map((item) => {
                return <MenuLink key={item.title} item={item} />;
              })}
            </li>
          );
        })}
      </ul>
      <div className={styles.logout} onClick={logoutUser}>
        <MdLogout />
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
