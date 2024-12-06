import styles from "@/app/ui/dashpoard/users/adduser/adduser.module.css";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input type="text" placeholder="username" name="username" required />
        <input type="email" placeholder="email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="number" placeholder="number" name="number" required />

        <select name="isAdmin" id="isAdmin" defaultValue={false}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <select name="isActive" id="isActive" defaultValue={true}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <textarea
          name="address"
          id="address"
          placeholder="address"
          rows={16}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
