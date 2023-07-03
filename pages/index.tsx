import Head from "next/head"
import { Inter } from "next/font/google"
import styles from "@/styles/home.module.scss"
import { Button } from "@mui/material"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    const [cardStepNum, setCardStepNum] = useState(1)
    return (
        <>
            <Head>
                <title>Frontend Mentor | Multi-step form</title>
                <meta name="description" content="Made by Loai Esam" />
            </Head>
            <article>
                <main className={`${styles.main} ${inter.className}`}>
                    <div className={styles.card}>
                        <div className={styles.cardSidebar}>
                            <div
                                className={`${styles.stepNum} ${
                                    cardStepNum == 1 && styles.activeStepNum
                                }`}
                                before-text="step 1"
                                after-text="your info"
                            >
                                <span>1</span>
                            </div>
                            <div
                                className={`${styles.stepNum} ${
                                    cardStepNum === 2 && styles.activeStepNum
                                }`}
                                before-text="step 2"
                                after-text="select plan"
                            >
                                <span>2</span>
                            </div>
                            <div
                                className={`${styles.stepNum} ${
                                    cardStepNum === 3 && styles.activeStepNum
                                }`}
                                before-text="step 3"
                                after-text="add-ons"
                            >
                                <span>3</span>
                            </div>
                            <div
                                className={`${styles.stepNum} ${
                                    cardStepNum === 4 && styles.activeStepNum
                                }`}
                                before-text="step 4"
                                after-text="summary"
                            >
                                <span>4</span>
                            </div>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardStepContainer}>
                                <div className={styles.cardStep}></div>
                            </div>
                            <div className={styles.cardNavButtons}>
                                {cardStepNum > 1 ? (
                                    <Button
                                        variant="text"
                                        className={styles.backButton}
                                        onClick={() =>
                                            setCardStepNum(cardStepNum - 1)
                                        }
                                    >
                                        Go Back
                                    </Button>
                                ) : (
                                    <span></span>
                                )}
                                {cardStepNum < 4 ? (
                                    <Button
                                        variant="contained"
                                        className={styles.nextButton}
                                        onClick={() =>
                                            setCardStepNum(cardStepNum + 1)
                                        }
                                    >
                                        Next Step
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        className={styles.confirmButton}
                                    >
                                        Confirm
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </article>
        </>
    )
}
