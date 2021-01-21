const Tooltip = (props) => {

    return (
        <div className={`tooltip ${props.class ? props.class : ''}`} style={{zIndex: props.z}} onClick={props.click}>
            {props.children}
        </div>
    );
};

export default Tooltip;