import Dropdown from './Dropdown';

const RegionsDropdown = (props) => {
    const locationsArr = ['Andijan', 'Bukhara', 'Jizzakh', 'Kashkadarya', 'Navoi', 'Namangan', 'Samarkand', 'Surkhandarya', 'Sirdarya', 'Tashkent region', 'Fergana', 'Khorezm', 'Karakalpakistan', 'Tashkent'];

    const locations = locationsArr.map((el, i) => {
        return (
            <li className="dropdown__item dropdown__item--grid" key={i} onClick={() => props.click(el)}>{el}</li>
        );
    });
    return (
        <Dropdown class={props.class}>
            <ul className="dropdown__wrap">
                {locations}
            </ul>
        </Dropdown>
    )
};

export default RegionsDropdown;