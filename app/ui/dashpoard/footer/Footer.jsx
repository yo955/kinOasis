import styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>Joo Dev</div>
        <p className={styles.text}>All rights reserved</p>
    </div>
  )
}

export default Footer