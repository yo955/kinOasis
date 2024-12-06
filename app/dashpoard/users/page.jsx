import Pagination from "@/app/ui/dashpoard/pagination/Pagination";
import Search from "@/app/ui/dashpoard/search/Search";
import styles from "@/app/ui/dashpoard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
const UsersPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link prefetch={true} href="/dashpoard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
               test
              </div>
            </td>
            <td>test@gmail.com</td>
            <td>11.06.2024</td>
            <td>Admin</td>
            <td>Active</td>
            <td>
              <div className={styles.buttons}>
                <Link prefetch={true} href="/dashpoard/users/test">
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <button className={`${styles.button} ${styles.delete}`}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersPage;
