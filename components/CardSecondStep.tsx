import styles from "@/styles/cardsecondstep.module.scss"
import Image from "next/image"
import { Dispatch, SetStateAction, useState, useEffect } from "react"
import {
    setPaymentOption,
    setPlan,
    useObjectDispatch,
} from "@/features/formObject/objectSlice"

interface CardFirstStepProps {
    errors: {
        name: string
        email: string
        phone: string
        plan: string
        paymentOption: string
    }
    setErrors: Dispatch<
        SetStateAction<{
            name: string
            email: string
            phone: string
            plan: string
            paymentOption: string
        }>
    >
}

export default function CardSecondStep({
    errors,
    setErrors,
}: CardFirstStepProps) {
    const dispatch = useObjectDispatch()
    const [plan, setPlanNum] = useState(0)
    const [isChecked, setIsChecked] = useState(false) // false -> monthly // true -> yearly
    const newPlan =
        plan === 1
            ? "arcade"
            : plan === 2
            ? "advanced"
            : plan === 3
            ? "pro"
            : ""
    dispatch(setPlan(newPlan))
    dispatch(setPaymentOption(isChecked ? "yearly" : "monthly"))
    useEffect(() => {
        if (plan !== 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                plan: "",
            }))
        }
    }, [plan, setErrors])
    return (
        <div className={styles.stepContainer}>
            <h2 className={styles.title}>Select your plan</h2>
            <p className={styles.subtitle}>
                You have the option of monthly or yearly billing.
            </p>
            <div className={styles.cardsContainer}>
                <div
                    className={`${styles.card} ${
                        plan === 1 && styles.activePlanCard
                    }`}
                    onClick={() => setPlanNum(1)}
                >
                    <Image
                        src={"/icon-arcade.svg"}
                        width={35}
                        height={35}
                        alt="arcade icon"
                    />
                    <span>Arcade</span>
                    <span>{isChecked ? "$90/yr" : "$9/mo"}</span>
                    {isChecked && <span>2 months free</span>}
                </div>
                <div
                    className={`${styles.card} ${
                        plan === 2 && styles.activePlanCard
                    }`}
                    onClick={() => setPlanNum(2)}
                >
                    <Image
                        src={"/icon-advanced.svg"}
                        width={35}
                        height={35}
                        alt="advanced icon"
                    />
                    <span>Advanced</span>
                    <span>{isChecked ? "$120/yr" : "$12/mo"}</span>
                    {isChecked && <span>2 months free</span>}
                </div>
                <div
                    className={`${styles.card} ${
                        plan === 3 && styles.activePlanCard
                    }`}
                    onClick={() => setPlanNum(3)}
                >
                    <Image
                        src={"/icon-pro.svg"}
                        width={35}
                        height={35}
                        alt="pro icon"
                    />
                    <span>Pro</span>
                    <span>{isChecked ? "$150/yr" : "$15/mo"}</span>
                    {isChecked && <span>2 months free</span>}
                </div>
            </div>
            <div>
                {errors.plan !== "" && (
                    <span className={styles.errorMessage}>{errors.plan}</span>
                )}
            </div>
            <div className={styles.togglerContainer}>
                <label
                    className={`${styles.switch} ${isChecked && styles.active}`}
                >
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(event) => setIsChecked(event.target.checked)}
                    />
                    <span className={styles.slider}></span>
                </label>
            </div>
        </div>
    )
}
