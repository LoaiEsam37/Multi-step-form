import Head from "next/head"
import styles from "@/styles/home.module.scss"
import { Button } from "@mui/material"
import { useState } from "react"
import CardFirstStep from "@/components/CardFirstStep"
import CardSecondStep from "@/components/CardSecondStep"
import CardThirdStep from "@/components/CardThirdStep"
import CardFourthStep from "@/components/CardFourthStep"
import Thanks from "@/components/Thanks"
import { useObjectSelector } from "@/features/formObject/objectSlice"

import { Ubuntu } from "next/font/google"
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

export default function Home() {
  const [cardStepNum, setCardStepNum] = useState(1)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    paymentOption: "",
  })
  const { name, email, phone, plan, paymentOption, services } =
    useObjectSelector((state) => state.items)
  const PersonalInfoVaildation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (name === "") {
      setErrors({
        ...errors,
        name: "Invaild Name",
      })
    } else if (email === "" || !email.match(emailRegex)) {
      setErrors({
        ...errors,
        email: "Invaild Email Address",
      })
    } else if (phone === "") {
      setErrors({
        ...errors,
        phone: "Invaild Phone Number",
      })
    } else {
      setCardStepNum(cardStepNum + 1)
    }
  }
  const SelectYourPlanVaildation = () => {
    if (plan === "") {
      setErrors({
        ...errors,
        plan: "Choose a Plan",
      })
    } else {
      setCardStepNum(cardStepNum + 1)
    }
  }
  const HandleVaildation = () => {
    switch (cardStepNum) {
      case 1:
        PersonalInfoVaildation()
        break
      case 2:
        SelectYourPlanVaildation()
        break
      case 3:
        setCardStepNum(cardStepNum + 1)
        break
    }
  }

  const NavToThanksPage = () => {
    const userData = { name, email, phone, plan, paymentOption, services }
    alert(JSON.stringify(userData))
    setCardStepNum(cardStepNum + 1)
  }
  return (
    <>
      <Head>
        <title>Frontend Mentor | Multi-step form</title>
        <meta name="description" content="Made by Loai Esam" />
      </Head>
      <article>
        <main className={`${styles.main} ${ubuntu.className}`}>
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
                  cardStepNum >= 4 && styles.activeStepNum
                }`}
                before-text="step 4"
                after-text="summary"
              >
                <span>4</span>
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardStepContainer}>
                <div className={styles.cardStep}>
                  {(() => {
                    switch (cardStepNum) {
                      case 1:
                        return (
                          <CardFirstStep
                            errors={errors}
                            setErrors={setErrors}
                          />
                        )
                      case 2:
                        return (
                          <CardSecondStep
                            errors={errors}
                            setErrors={setErrors}
                          />
                        )
                      case 3:
                        return <CardThirdStep />
                      case 4:
                        return (
                          <CardFourthStep setCardStepNum={setCardStepNum} />
                        )
                      case 5:
                        return <Thanks />
                      default:
                        return <span>Sorry Something went wrong</span>
                    }
                  })()}
                </div>
              </div>
              <div
                className={`${styles.cardNavButtons} ${
                  cardStepNum === 5 && styles.cardNavButtonsHidden
                }`}
              >
                {cardStepNum > 1 && cardStepNum < 5 ? (
                  <Button
                    variant="text"
                    className={styles.backButton}
                    onClick={() => setCardStepNum(cardStepNum - 1)}
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
                    onClick={() => HandleVaildation()}
                  >
                    Next Step
                  </Button>
                ) : cardStepNum === 4 ? (
                  <Button
                    variant="contained"
                    className={styles.confirmButton}
                    onClick={() => NavToThanksPage()}
                  >
                    Confirm
                  </Button>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          </div>
        </main>
      </article>
    </>
  )
}
