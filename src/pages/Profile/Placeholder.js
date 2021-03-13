import { FcFeedback } from 'react-icons/fc';

const Placeholder = ({ t }) => (
    <div className="profile__empty">
        <div>
            <FcFeedback className="profile__icon--large mb-1" />
            {t('ad:nothing ')}
        </div>
    </div>
);

export default Placeholder;