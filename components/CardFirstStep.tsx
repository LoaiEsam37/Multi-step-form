import styles from "@/styles/cardfirststep.module.scss"
import { useState, Dispatch, SetStateAction } from "react"
import {
    setEmail,
    setName,
    setPhone,
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

export default function CardFirstStep({
    errors,
    setErrors,
}: CardFirstStepProps) {
    const dispatch = useObjectDispatch()
    const [userInputData, setUserInputData] = useState({
        name: "",
        email: "",
        phone: "",
    })

    dispatch(setName(userInputData.name))
    dispatch(setEmail(userInputData.email))
    dispatch(setPhone(userInputData.phone))

    const nameRegex = (value: string) => {
        if (value !== "") {
            setErrors({
                ...errors,
                name: "",
            })
        }
        const maxLength = 50
        const finalValue: string = value.slice(0, maxLength)
        setUserInputData({
            ...userInputData,
            name: finalValue,
        })
    }

    const emailRegex = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (value.match(emailRegex)) {
            setErrors({
                ...errors,
                email: "",
            })
        }

        setUserInputData({
            ...userInputData,
            email: value,
        })
    }

    const phoneRegex = (value: string) => {
        const maxLength = 11
        const numberRegex = /[^0-9]/g
        const finalValue: string = value
            .replace(numberRegex, "")
            .slice(0, maxLength)
        if (finalValue !== "") {
            setErrors({
                ...errors,
                phone: "",
            })
        }
        setUserInputData({
            ...userInputData,
            phone: finalValue,
        })
    }

    return (
        <div className={styles.stepContainer}>
            <h2 className={styles.title}>Personal info</h2>
            <p className={styles.subtitle}>
                Please provide your name, email address, and phone number.
            </p>
            <div className={styles.inputContainer}>
                <label>Name</label>
                <input
                    className={`${styles.nameInput} ${
                        errors.name !== "" && styles.inputError
                    }`}
                    placeholder="e.g. Stephen King"
                    value={userInputData.name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        nameRegex(event.target.value)
                    }
                />
                {errors.name !== "" && (
                    <span className={styles.errorMessage}>{errors.name}</span>
                )}
            </div>
            <div className={styles.inputContainer}>
                <label>Email Address</label>
                <input
                    className={`${styles.emailInput} ${
                        errors.email !== "" && styles.inputError
                    }`}
                    placeholder="e.g. stephenking@lorem.com"
                    value={userInputData.email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        emailRegex(event.target.value)
                    }
                />
                {errors.email !== "" && (
                    <span className={styles.errorMessage}>{errors.email}</span>
                )}
            </div>
            <div className={styles.inputContainer}>
                <label>Phone Number</label>
                <input
                    className={`${styles.phoneInput} ${
                        errors.phone !== "" && styles.inputError
                    }`}
                    placeholder="e.g. +1 234 567 890"
                    value={userInputData.phone}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        phoneRegex(event.target.value)
                    }
                />
                {errors.phone !== "" && (
                    <span className={styles.errorMessage}>{errors.phone}</span>
                )}
            </div>
        </div>
    )
}
