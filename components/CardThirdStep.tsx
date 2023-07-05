import styles from "@/styles/cardthirdstep.module.scss"
import { Checkbox } from "@mui/material"
import { useState } from "react"

export default function CardThirdStep() {
    const [onlineService, setOnlineService] = useState(false)
    const [largerStorage, setLargerStorage] = useState(false)
    const [customizableProfile, setCustomizableProfile] = useState(false)

    return (
        <div className={styles.stepContainer}>
            <h2 className={styles.title}>Pick add-ons</h2>
            <p className={styles.subtitle}>
                Add-ons help enhance your gaming experience.
            </p>
            <div className={styles.cardsContainer}>
                <div
                    className={`${styles.card} ${
                        onlineService && styles.active
                    }`}
                    onClick={() => setOnlineService(!onlineService)}
                >
                    <Checkbox checked={onlineService} />
                    <div className={styles.service}>
                        <span className={styles.serviceName}>
                            Online service
                        </span>
                        <span className={styles.serviceDetails}>
                            Access to multiplayer games
                        </span>
                    </div>
                    <span className={styles.servicePrice}>+$1/mo</span>
                </div>
                <div
                    className={`${styles.card} ${
                        largerStorage && styles.active
                    }`}
                    onClick={() => setLargerStorage(!largerStorage)}
                >
                    <Checkbox checked={largerStorage} />
                    <div className={styles.service}>
                        <span className={styles.serviceName}>
                            Larger storage
                        </span>
                        <span className={styles.serviceDetails}>
                            Extra 1TB of cloud save
                        </span>
                    </div>
                    <span className={styles.servicePrice}>+$2/mo</span>
                </div>
                <div
                    className={`${styles.card} ${
                        customizableProfile && styles.active
                    }`}
                    onClick={() => setCustomizableProfile(!customizableProfile)}
                >
                    <Checkbox checked={customizableProfile} />
                    <div className={styles.service}>
                        <span className={styles.serviceName}>
                            Customizable Profile
                        </span>
                        <span className={styles.serviceDetails}>
                            Custom theme on your profile
                        </span>
                    </div>
                    <span className={styles.servicePrice}>+$2/mo</span>
                </div>
            </div>
        </div>
    )
}
