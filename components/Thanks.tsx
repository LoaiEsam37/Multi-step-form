import styles from "@/styles/thankstep.module.scss"

export default function Thanks() {
  return (
    <div className={styles.stepContainer}>
      <div className={styles.icon}></div>
      <h2>Thank you!</h2>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  )
}
