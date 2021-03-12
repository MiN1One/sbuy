import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import imageCompression from 'browser-image-compression';
import { connect } from 'react-redux';

import *  as utils from '../../utilities/utilities';
import './MobilePost.scss';
import MobileCats from '../../components/MobileCats/MobileCats';
import { setLoading } from '../../store/actions';
import Modal from '../../components/Modal';
import LoadingScreen from '../../UI/LoadingScreen';

const MobilePost = (props) => {
    const { i18n, t } = useTranslation(['ad', 'translation']);

    const filesRef = useRef();

    const [loading, setLoding] = useState(false);
    const [showCats, setShowCats] = useState(false);

    const [activeCategory, setActiveCategory] = useState(null);
    const [activeCategoryAfter, setActiveCategoryAfter] = useState(null);
    const [activeSubcategory, setActiveSubcategory] = useState(null);
    const [activeOptionsView, setActiveOptionsView] = useState(null);

    const [postFilters, setPostFilters] = useState({ items: {} });

    const [data, setData] = useState({
        images: [],
        mileage: '',
        year: '',
        condition: 'new',
        type: 'boys',
        description: '',
        title: '',
        name: '',
        email: '',
        phoneNumbers: ['+511541515']
    });

    let numOfImagesAllowed = postFilters.imagesAllowed || 5;
    
    useEffect(() => {
        if (activeCategory) {
            import(`../../store/PostFilters/${i18n.language}/${activeCategory}`)
                .then((filters) => setPostFilters({ ...filters.default }))
                .catch(er => console.error(er));
        }
    }, [i18n.language, activeCategory, postFilters.items]);

    const filter = postFilters.items[activeSubcategory];
    let options = null,
        categoryTitle = null,
        inputs = null,
        category = null,
        subcategory = null,
        optionItems = null;

    if (filter && activeCategoryAfter) {
        options = filter.sub.map((el, i) => {
            const defTitle = el.items.find(item => item.val === data[el.val]).title;
            return (
                <div className="m-post__item" key={i}>
                    <span className="m-post__title">{el.title}</span>
                    <div className="m-post__input" onClick={() => setActiveOptionsView(i)}>
                        {defTitle}
                        <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                    </div>
                </div>
            );
        });

        inputs = filter.inputs.map((el, i) => {
            return (
                <div className="m-post__item" key={i}>
                    <span className="m-post__title">{el.title}</span>
                    <input 
                        type="text" 
                        placeholder={`${t('tranlsation:input.enter')} ${utils.toLower(el.title)}`} 
                        onChange={(e) => setData({
                            ...data,
                            [el.val]: e.target.val
                        })} 
                        className="m-post__input" />
                </div>
            );
        });

        optionItems = activeOptionsView !== null && filter.sub[activeOptionsView].items.map((el, i) => {
            const isActive = el.val === data[filter.sub[activeOptionsView].val];
            return (
                <li 
                    key={i}
                    className={`modal__item ${isActive ? 'modal__item--active' : ''}`} 
                    onClick={() => {
                        setData({
                            ...data,
                            [filter.sub[activeOptionsView].val]: el.val
                        });
                        setActiveOptionsView(null);
                    }}>
                        <div className="d-flex ac">
                            {isActive &&
                                <utils.use styleClass="icon--7 mr-5" svg="check" />
                            }
                            {el.title}
                        </div>
                </li>
            );
        });

        category = props.categories && props.categories[activeCategoryAfter];
        subcategory = category && category.subCategories.find(el => el.val === activeSubcategory);
    }

    const appendImage = (el, files) => {
        const reader = new FileReader();

        reader.readAsDataURL(files);
        reader.onload = () => {
            const imgInitial = el.querySelector('.m-post__img');
            if (imgInitial) imgInitial.remove();

            const img = document.createElement('img');
            img.classList.add('m-post__img');
            img.src = reader.result;
            el.appendChild(img);
        };
    };

    const onDeleteImage = (index) => {
            const images = data.images.filter((el, i) => i !== index);
            setData(prevState => ({
                ...prevState,
                images
            }));

            const photoContainers = Array.from(document.querySelectorAll('.m-post__figure'));
            photoContainers[index].querySelector('.m-post__img').remove();

            images.forEach((el, i) => appendImage(photoContainers[i], el));

            const imageAfter = photoContainers[index + 1].querySelector('.m-post__img');
            if (imageAfter) imageAfter.remove();

            const imageLast = photoContainers[images.length].querySelector('.m-post__img');
            if (imageLast) imageLast.remove();
    };

    const onAddNumber = () => {
        if (data.phoneNumbers.length < 3) {
            const newList = [...data.phoneNumbers, ''];
            setData(prevState => ({
                ...prevState,
                phoneNumbers: newList
            }));
        }
    };

    const onEnterNumber = (val, index) => {
        if (utils.isNum(parseInt(val)) ||
            val === '' ||
            val === '+'
           ) 
        {
            const newList = data.phoneNumbers.map((el, i) => {
                console.log(val);
                if (index === i) return el = val;
                else return el;
            });
    
            setData(prevState => ({
                ...prevState,
                phoneNumbers: newList
            }));
        }
    };  

    const onImageUpload = () => {
        const files = filesRef.current.files;

        if (data.images.length < numOfImagesAllowed) {
            let photos = Array.from(files).slice(0, numOfImagesAllowed);

            const largeFile = photos.find(el => el.size > 3000000); //3500000

            if (!largeFile) {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true
                };
                
                setLoading(true);
                for (let i = 0; i < photos.length; i++) {
                    imageCompression(photos[i], options)
                        .then(cimage => {
                            const file = new File([cimage], cimage.name);
                            
                            setData(prevState => ({
                                ...prevState,
                                images: [...prevState.images, file]
                            }));
                            
                            const photoContainers = Array.from(document.querySelectorAll('.m-post__figure'));
                            [...data.images, file].forEach((el, i) => appendImage(photoContainers[i], el));
            
                            filesRef.current.value = '';
                            setLoading(false);
                        })
                        .catch(er => {
                            setLoading(false);
                            console.error(er);
                            filesRef.current.value = '';
                        });
                }
            } else console.error(t('ad:image size warning'));
        }
    };

    const imageFields = Array.from(Array(numOfImagesAllowed).keys()).map((el, i) => (
        <div className="m-post__img-group" key={i}>
            <figure 
                className="m-post__figure" 
                onClick={() => filesRef.current.click()}>
                    <utils.use 
                        styleClass="icon icon--dark" 
                        svg={i === 0 ? 'image' : 'plus'} />
            </figure>
            {data.images[i] &&
                <button 
                    className="m-post__img-btn" 
                    onClick={() => onDeleteImage(i)}>
                        <utils.use styleClass="icon--7 icon--dark" svg="x" />
                </button>
            }
        </div>
    ));

    const numberFields = data.phoneNumbers.slice(1).map((el, i) => {
        return (
            <input 
                key={i}
                className="m-post__input mt-1" 
                value={data.phoneNumbers[i+1]} 
                type="text"
                placeholder={t('translation:input.enter number')}
                onChange={(e) => onEnterNumber(e.target.value, i+1)}
                maxLength="15" />
        );
    });

    return (
        <>
            {loading && <LoadingScreen class="loadingScreen--abs" />}
            <div className="m-post">
                <div className="container">
                    <div className="m-post__head">
                        <h2 className="heading heading__2">{t('ad:post ad')}</h2>
                        <p className="m-post__text">
                            {t('ad:post warning')}
                        </p>
                    </div>
                    <div className="list w-100">
                        <div className="m-post__item">
                            <span className="m-post__title">{t('ad:enter title')}</span>
                            <input 
                                className="m-post__input" 
                                type="text" 
                                maxLength="30"
                                value={data.title}
                                placeholder={t('ad:enter title')}
                                onChange={(e) => setData({
                                    ...data,
                                    title: e.target.value
                                })} />
                            {data.title !== '' &&
                                <span className="m-post__title m-0 mt-1">{30 - data.title.length} {t('translation:input.chars left')}</span>
                            }
                        </div>
                        <div className="m-post__item">
                            <span className="m-post__title">{t('ad:upload img')}</span>
                            <div className="list w-100">
                                {imageFields}
                            </div>
                            <input 
                                type="file" 
                                accept="image/*" 
                                ref={filesRef} 
                                multiple
                                className="d-none" 
                                onChange={() => onImageUpload()} />
                        </div>
                        <div className="m-post__item">
                            <span className="m-post__title">{t('translation:main.cats')}</span>
                            <button className="m-post__input d-flex sb" onClick={() => setShowCats(true)}>
                                {category 
                                    ? <>
                                        {category.title} / {subcategory.title}
                                        <utils.useCat styleClass="icon--7 icon--dark" svg={category.icon} />
                                    </>
                                    : <>
                                        {t('ad:select category')}
                                        <utils.use styleClass="icon--7 icon--dark" svg="chevron-right" />
                                    </>
                                }
                            </button>
                        </div>
                        {options}
                        {inputs}
                        <div className="m-post__item">
                            <span className="m-post__title">{t('ad:description')}</span>
                            <textarea 
                                className="m-post__input m-post__input--description" 
                                type="text"
                                value={data.description}
                                onChange={(e) => setData({
                                    ...data,
                                    description: e.target.value
                                })}
                                maxLength="4500" />
                            {data.description !== '' &&
                                <span className="m-post__title m-0 mt-1">{4500 - data.description.length} {t('translation:input.chars left')}</span>
                            }
                        </div>
                        <div className="m-post__item">
                            <span className="m-post__title">{t('ad:name')}</span>
                            <input 
                                className="m-post__input"
                                type="text"
                                value={data.name}
                                onChange={(e) => {
                                    setData(prevState => ({
                                        ...prevState,
                                        name: e.target.value
                                    }));
                                }} 
                                placeholder={t('translation:input.enter name')} />
                        </div>
                        <div className="m-post__item">
                            <span className="m-post__title">{t('ad:email')}</span>
                            <input 
                                className="m-post__input"
                                type="email"
                                value={data.email}
                                onChange={(e) => {
                                    setData(prevState => ({
                                        ...prevState,
                                        email: e.target.value
                                    }));
                                }} 
                                placeholder={t('translation:input.enter email')} />
                        </div>
                        <div className="m-post__item">
                            <span className="m-post__title">{t('ad:phone number')}</span>
                            <div className="d-flex">
                                <input 
                                    className="m-post__input mr-5" 
                                    value={data.phoneNumbers[0]} 
                                    type="text"
                                    placeholder={t('translation:input.enter number')}
                                    onChange={(e) => onEnterNumber(e.target.value, 0)}
                                    maxLength="15" />
                                <button className="m-post__input jc w-50" onClick={() => onAddNumber()}>
                                    <utils.use styleClass="icon--7 icon--dark" svg="plus" />
                                </button>
                            </div>
                            {numberFields}
                        </div>
                    </div>
                    <div className="m-post__footer">
                        <button 
                            className="btn btn__primary btn__primary--outline"
                            onClick={() => console.log(data.images)}>
                            {t('ad:post')}
                            <utils.use styleClass="ml-5 icon--dark icon--7" svg="check" />
                        </button>
                    </div>
                </div>
            </div>
            {showCats &&
                <MobileCats
                    categories={props.categories}
                    fixed
                    clickMain={setActiveCategory}
                    clickSub={(sub) => {
                        setActiveSubcategory(sub);
                        setActiveCategoryAfter(activeCategory);
                        setActiveCategory(null);
                        setShowCats(false);
                    }} 
                    close={() => setShowCats(false)} />
            }
            {optionItems &&
                <Modal 
                    click={() => setActiveOptionsView(null)}
                    title={filter.sub[activeOptionsView].title}>
                        <div className="modal__body">
                            <ul className="modal__list">
                                {optionItems}
                            </ul>
                        </div>
                </Modal>
            }
        </>
    ); 
};

const mapStateToProps = state => ({
    lang: state.localization.lang,
    token: state.user.token,
    categories: state.localization.translations.categoriesList,
    mobile: state.data.mediaSmall
});

export default connect(mapStateToProps)(MobilePost);