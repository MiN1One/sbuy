
const Backdrop = (props) => {
    return (
        <div className={`backdrop ${props.class ? props.class : ''}`} onClick={() => props.click()} style={{zIndex: props.z}}></div>
    )
};

export default Backdrop;