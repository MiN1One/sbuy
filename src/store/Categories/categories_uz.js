const categories = {
    kids: {
        val: 'for_kids',
        title: 'Bolalar uchun',
        subCategories: [
            { title: 'Kiyim kechak', val: 'clothing' },
            { title: 'Oyoq kiyim', val: 'shoes' },
            { title: 'Mebel', val: 'furniture' }, 
            { title: 'Oyinchoqlar', val: 'toys' }, 
            { title: 'O\'quv qurollar', val: 'educational_assets' }, 
            { title: 'Kolyaskalar', val: 'carriages' }, 
            { title: 'Oziq ovqatlar', val: 'food' },
            { title: 'Boshqalar', val: 'others' }
        ],
        icon: 'child_friendly'
    },
    real: {
        val: 'real_estate',
        title: 'Недвижимость',
        subCategories: [
            { title: 'Квартиры', val: 'apartments' },
            { title: 'Дома', val: 'houses' },
            { title: 'Земельные участки', val: 'fields' },
            { title: 'Коммерческое помещение', val: 'commercial_premises' },
            { title: 'Гаражи', val: 'garages'}
        ],
        icon: 'home'
    },
    tech: {
        val: 'electronics',
        title: 'Электроника',
        subCategories: [
            { title: 'Мобильные телефоны', val: 'mobile_phones' },
            { title: 'Компьютеры', val: 'computers' },
            { title: 'Sim cards', val: 'sim_cards' },
            { title: 'Медиаустройства', val: 'media_devices' },
            { title: 'Landline phones', val: 'landline_phones' },
            { title: 'Игровые приставки', val: 'games_consoles' },
            { title: 'Телевизоры', val: 'tvs' },
            { title: 'Бытовая техника', val: 'home_appliances' },
            { title: 'Климатическое оборудование', val: 'climatic_equipment' },
            { title: 'Аксессуары и компоненты', val: 'accessories_and_components' },
            { title: 'Прочая электроника', val: 'other' }
        ],
        icon: 'devices'
    },
    trans: {
        val: 'transport_auto',
        title: 'Транспорт / Авто',
        subCategories: [
            { title: 'Автомобили', val: 'cars' },
            { title: 'Запчасти и аксессуары', val: 'parts_and_accessories' },
            { title: 'Шины, диски и диски', val: 'tires_disks_and_wheels' },
            { title: 'Мотоциклы', val: 'moto' },
            { title: 'Другой транспорт', val: 'other_transport' },
            { title: 'Автобусы', val: 'buses' },
            { title: 'Грузовики', val: 'trucks' },
            { title: 'Трейлеры', val: 'trailers' },
            { title: 'Специальное оборудование', val: 'special_equipment' },
            { title: 'Сельскохозяйственная техника', val: 'agricultural_machinery' },
            { title: 'Водный транспорт', val: 'water_transport' }
        ],
        icon: 'car-sport'
    },
    jobs: {
        val: 'jobs',
        title: 'Jobs',
        subCategories: [
            { title: 'Sales', val: 'sales' },
            { title: 'Logistics', val: 'logistics' },
            { title: 'Construction', val: 'construction' },
            { title: 'Restaurants', val: 'restaurants' },
            { title: 'Accounting', val: 'accounting' },
            { title: 'Security', val: 'security' },
            { title: 'Home staff', val: 'home_staff' },
            { title: 'Beauty / fitness / sports', val: 'beauty_fitness_sports' },
            { title: 'Tourism', val: 'tourism' },
            { title: 'Education', val: 'education' },
            { title: 'Culture / art', val: 'culture_art' },
            { title: 'Medicine / Pharmacy', val: 'medicine_pharmacy' },
            { title: 'IT / telecom', val: 'it_telecom' },
            { title: 'The property', val: 'the_property' },
            { title: 'Marketing', val: 'marketing' },
            { title: 'Production', val: 'production' },
            { title: 'Secretariat', val: 'secretariat' },
            { title: 'For students', val: 'for_students' },
            { title: 'Other areas of occupation', val: 'other_areas_of_occupation' },
            { title: 'Part-time employment', val: 'part_time_employment' }
        ],
        icon: 'suitcase'
    },
    pets: {
        val: 'pets',
        title: 'Pets',
        subCategories: [
            { title: 'Cats', val: 'cats' }, 
            { title: 'Dogs', val: 'dogs' }, 
            { title: 'Aquarium', val: 'aquarium' }, 
            { title: 'Birds', val: 'birds' }, 
            { title: 'Rodents', val: 'rodents' }, 
            { title: 'Farm animals', val: 'farm_animals' }, 
            { title: 'Pet supplies', val: 'pet_supplies' }, 
            { title: 'Knitting', val: 'knitting' }, 
            { title: 'Lost and found', val: 'lost_and_found' }, 
            { title: 'Other animals', val: 'other_animals' }, 
            { title: 'Animals for free', val: 'animals_for_free'}
        ],
        icon: 'paw',
    },
    home: {
        val: 'home_and_garden',
        title: 'Home & garden',
        subCategories: [
            { title: 'Furniture', val: 'furniture' }, 
            { title: 'Garden', val: 'garden' }, 
            { title: 'Construction', val: 'construction' }, 
            { title: 'Tools', val: 'tools' }, 
            { title: 'Houseplants', val: 'houseplants' }, 
            { title: 'Dishes / Kitchen Utensils', val: 'dishes_kitchen_utensils' }, 
            { title: 'Garden tools', val: 'garden_tools' }, 
            { title: 'Household supplies', val: 'household_supplies' }, 
            { title: 'Stationery', val: 'stationery' }, 
            { title: 'Food', val: 'food' }, 
            { title: 'Other household goods', val: 'other_household_goods' }
        ],
        icon: 'tree'
    },
    business: {
        val: 'business_and_services',
        title: 'Business & services',
        subCategories: [
            { title: 'Construction / cleaning', val: 'construction_cleaning' }, 
            { title: 'Financial services', val: 'financial_services' }, 
            { title: 'Transportation / transport rental', val: 'transportation_transport_rental' }, 
            { title: 'Advertising / marketing', val: 'advertising_marketing' }, 
            { title: 'Babysitters / Nurses', val: 'babysitters_nurses' }, 
            { title: 'Beauty / health', val: 'beauty_health' }, 
            { title: 'Equipment', val: 'equipment' }, 
            { title: 'Education / Sports', val: 'education_sports' }, 
            { title: 'Services for animals', val: 'services_for_animals' }, 
            { title: 'Business sale', val: 'business_sale' }, 
            { title: 'Entertainment / Arts', val: 'entertainment_arts' }, 
            { title: 'Tourism', val: 'tourism' }, 
            { title: 'Translation services / typing', val: 'translation_services_typing' }, 
            { title: 'Auto services', val: 'auto_services' }, 
            { title: 'Maintenance, repair of equipment', val: 'maintenance_repair_of_equipment' }, 
            { title: 'Legal services', val: 'legal_services' }, 
            { title: 'Rental of goods', val: 'rental_of_goods' }, 
            { title: 'Other services', val: 'other_services' }
        ],
        icon: 'truck2'
    },
    fashion: {
        val: 'fashion_and_style',
        title: 'Fashion & style',
        subCategories: [
            { title: 'Clothes, shoes', val: 'clothes_shoes' },
            { title: 'For wedding', val: 'for_wedding' },
            { title: 'Wrist Watch', val: 'wrist_watches' },
            { title: 'Accessories', val: 'accessories' },
            { title: 'Presents', val: 'presents' },
            { title: 'Beauty / health', val: 'beauty_health' }
        ],
        icon: 'black-tie'
    },
    sports: {
        val: 'sports_hobby_and_comfort',
        title: 'Sports / Hobby & Comfort',
        subCategories: [
            { title: 'Antiques / Collections', val: 'antiques_collections' },
            { title: 'Musical instruments', val: 'musical_instruments' },
            { title: 'Other', val: 'other' },
            { title: 'Sports / Leisure', val: 'sports_Leisure' },
            { title: 'Books / magazines', val: 'books_magazines' },
            { title: 'CD / DVD / records / cassettes', val: 'cd_dvd_records_cassettes' },
            { title: 'Tickets', val: 'tickets' }
        ],
        icon: 'futbol-o'
    }
};

export default categories;