import styles from './index.module.css';
const Task = ({ task }) => {
    return (
        <div className={styles.task}>
            {task}
        </div>
        
    )

}
export default Task;