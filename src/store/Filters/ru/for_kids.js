const filter = {
    for_kids: {
        title: 'Для детей',
        items: {
            clothing: {
                title: 'Одежда',
                counters: [
                    {
                        title: 'Размер',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Цена',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Состояние',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Б/у' }, 
                            { val: 'new', title: 'Новые' }, 
                            { val: 'all', title: 'Все' }
                        ],
                        method: 'onFilterByCondition'
                    },
                    {
                        title: 'Тип',
                        val: 'type', 
                        items: [
                            { val: 'boys', title: 'Для мальчиков' }, 
                            { val: 'girls', title: 'Для девочек' }, 
                            { val: 'all', title: 'Все' }
                        ],
                        method: 'onFilterByCondition'
                    },
                ]
            },
            furniture: {
                title: 'Furniture',
                counters: [
                    {
                        title: 'Размер',
                        val: 'size',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition', 
                        items: ['used', 'new', 'all'], 
                        method: 'onFilterByCondition'
                    }
                ]
            },
            toys: {
                title: 'Toys',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    { 
                        title: 'Condition', 
                        items: ['used', 'new', 'all'], 
                        method: 'onFilterByCondition'
                    }
                ]
            },
            educational_assets: {
                title: 'Educational assets',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    { 
                        title: 'Condition', 
                        items: ['used', 'new', 'all'], 
                        method: 'onFilterByCondition'
                    }
                ]
            },
            carriages: {
                title: 'Carriages',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        items: ['used', 'new', 'all'],
                        method: 'onFilterByCondition'
                    }
                ]
            },
            food: {
                title: 'Food',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition', 
                        items: ['used', 'new', 'all'], 
                        method: 'onFilterByCondition'
                    }
                ]
            },
            child_car_seats: {
                title: 'Child car seats',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    { 
                        title: 'Condition', 
                        items: ['used', 'new', 'all'], 
                        method: 'onFilterByCondition'
                    }
                ]
            },
            others: {
                title: 'Others',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    { 
                        title: 'Condition', 
                        items: ['used', 'new', 'all'], 
                        method: 'onFilterByCondition'
                    }
                ]
            }
        }
    }
};

export default filter;