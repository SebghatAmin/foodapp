import styles from "./innercontainer.module.css"
export default function innerContainer({children}){
    return <div className={styles.innerContainer}>
        {children}
    </div>
}