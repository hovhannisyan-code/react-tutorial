import styles from './preloader.module.css';
const Preloader = () => {
    return (
        <div className={styles.section}>
            <div className={styles.preloader}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span className={styles.loader_text}>React Js</span>
        </div>
    )
}
export default Preloader;