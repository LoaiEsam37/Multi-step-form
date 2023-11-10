import styles from "@/styles/cardfourthstep.module.scss"
import { useObjectSelector } from "@/features/formObject/objectSlice"
import { Dispatch, SetStateAction, useState } from "react"
import { serialize } from "v8"

export default function CardFourthStep({
  setCardStepNum,
}: {
  setCardStepNum: Dispatch<SetStateAction<number>>
}) {
  const { paymentOption, plan, services } = useObjectSelector(
    (state) => state.items
  )
  const GetPlanPrice = () => {
    if (paymentOption === "yearly") {
      if (plan === "arcade") return 90
      else if (plan === "advanced") return 120
      else return 150
    } else {
      if (plan === "arcade") return 9
      else if (plan === "advanced") return 12
      else return 15
    }
  }

  const serviceNames: string[] = Object.keys(services)

  const GetServicesPrice = () => {
    return serviceNames
      .map((service) => {
        if (service.toLowerCase() === "onlineservice" && services[service]) {
          if (paymentOption === "yearly") return 10
          else return 1
        } else if (
          service.toLowerCase() === "largerstorage" &&
          services[service]
        ) {
          if (paymentOption === "yearly") return 20
          else return 2
        } else if (
          service.toLowerCase() === "customizableprofile" &&
          services[service]
        ) {
          if (paymentOption === "yearly") return 20
          else return 2
        } else {
          return 0
        }
      })
      .reduce((partialSum, a) => partialSum + a, 0 as number)
  }

  const GetTotalPrice = () => {
    return GetPlanPrice() + GetServicesPrice()
  }

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.title}>Finishing up</h2>
      <p className={styles.subtitle}>
        Double-check everything looks OK before confirming.
      </p>
      <div className={styles.previewContainer}>
        <div className={styles.planCard}>
          <div className={styles.plan}>
            <span className={styles.text}>
              {plan} {paymentOption === "yearly" ? "(Yearly)" : "(Monthly)"}{" "}
              {/* Ex: arcade (Monthly) */}
            </span>
            <span onClick={() => setCardStepNum(2)}>Change</span>
          </div>
          <div className={styles.price}>
            {paymentOption === "yearly"
              ? plan === "arcade"
                ? "$90/yr"
                : plan === "advanced"
                ? "$120/yr"
                : plan === "pro"
                ? "$150/yr"
                : "unknown"
              : plan === "arcade"
              ? "$9/mo"
              : plan === "advanced"
              ? "$12/mo"
              : plan === "pro"
              ? "$15/mo"
              : "unknown"}
          </div>
        </div>
        <div className={styles.servicesCard}>
          {serviceNames.map((serviceName, id) => {
            if (services[serviceName]) {
              if (paymentOption === "yearly") {
                return (
                  <div className={styles.serviceWrapper} key={id}>
                    <div className={styles.service}>{serviceName}</div>
                    <div className={styles.price}>
                      {serviceName === "onlineService"
                        ? "+$10/yr"
                        : serviceName === "largerStorage"
                        ? "+$20/yr"
                        : serviceName === "customizableProfile"
                        ? "+$20/yr"
                        : "unkown"}
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className={styles.serviceWrapper} key={id}>
                    <div className={styles.service}>{serviceName}</div>
                    <div className={styles.price}>
                      {serviceName === "onlineService"
                        ? "+$1/mo"
                        : serviceName === "largerStorage"
                        ? "+$2/mo"
                        : serviceName === "customizableProfile"
                        ? "+$2/mo"
                        : "unkown"}
                    </div>
                  </div>
                )
              }
            }
            return undefined
          })}
        </div>
      </div>
      <div className={styles.totalPriceCard}>
        <span>
          Total {paymentOption === "yearly" ? "per year" : "per month"}
        </span>
        <span className={styles.price}>
          {paymentOption === "yearly" ? "$" : "+$"}
          {GetTotalPrice()}
          {paymentOption === "yearly" ? "/yr" : "/mo"}
        </span>
      </div>
    </div>
  )
}
