function Action({handlePlusCount,handleMinusCount}) {
    return (
        <div className="actions">
            <button onClick={handlePlusCount}>+</button>
            <button onClick={handleMinusCount}>-</button>
        </div>
    )
}
export default Action;