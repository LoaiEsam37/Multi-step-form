import Head from "next/head"
import { Inter } from "next/font/google"
import styles from "@/styles/home.module.scss"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Frontend Mentor | Multi-step form</title>
            </Head>
            <main className={`${styles.main} ${inter.className}`}></main>
        </>
    )
}
