import styles from "@/app/ui/dashpoard/users/singleuser/SingleUser.module.css";
import Image from "next/image";
const SingleUserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src="/noavatar.png"
            alt="avatar"
            fill
            className={styles.userImg}
          />
        </div>
        Joo
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Username</label>
          <input type="text" name="username" placeholder="Joo" />
          <label>Email</label>
          <input type="email" name="Email" placeholder="joo@gmail.com" />
          <label>Password</label>
          <input type="password" name="password" placeholder="123456" />
          <label>Phone</label>
          <input type="number" name="phone" placeholder="+201099204104" />
          <label>Address</label>
          <textarea name="address" placeholder="Egypt"></textarea>
          <label>Is Admin?</label>
          <select name="isadmin" id="isadmin">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isactive" id="isactive">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
