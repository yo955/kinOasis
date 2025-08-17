import styles from "./transactions.module.css";

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <img
                  src="/noavatar.png"
                  alt="avatarImage"
                  width={40}
                  height={40}
                  className={styles.userImage}
                  loading="lazy"
                />
                Joo
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                pending
              </span>
            </td>
            <td>12.5.2024</td>
            <td>$3.200</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <img
                  src="/noavatar.png"
                  alt="avatarImage"
                  width={40}
                  height={40}
                  className={styles.userImage}
                  loading="lazy"
                />
                Joo
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>done</span>
            </td>
            <td>12.5.2024</td>
            <td>$3.200</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <img
                  src="/noavatar.png"
                  alt="avatarImage"
                  width={40}
                  height={40}
                  className={styles.userImage}
                  loading="lazy"
                />
                Joo
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                cancelled
              </span>
            </td>
            <td>12.5.2024</td>
            <td>$3.200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
