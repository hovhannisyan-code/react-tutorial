import styles from './preloader.module.css';
const Preloader = () => {
    return (
        <section className={styles.section}>
            <div className={styles.preloader}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span className={styles.loader_text}>React Js</span>
        </section>
    )
}
export default Preloader;