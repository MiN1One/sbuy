const Dropdown = (props) => (
    <div className={`dropdown ${props.class ? props.class : ''}`}>
        {props.children}
    </div>
);

export default Dropdown;