const filter = {
    for_kids: {
        title: 'Bolalar uchun',
        items: {
            clothing: {
                title: 'Kiyim kechak',
                counters: [
                    {
                        title: 'Hajmi',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Narx',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Xolati',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Ishlatilgan' }, 
                            { val: 'new', title: 'Yangi' }, 
                            { val: 'all', title: 'Hammasi' }
                        ],
                    }
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
                    }
                ]
            },
            toys: {
                title: 'Toys',
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
                    }
                ]
            },
            educational_assets: {
                title: 'Educational assets',
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
                    }
                ]
            },
            carriages: {
                title: 'Carriages',
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
                    }
                ]
            },
            food: {
                title: 'Food',
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
                    }
                ]
            },
            child_car_seats: {
                title: 'Child car seats',
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
                    }
                ]
            },
            others: {
                title: 'Others',
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
                    }
                ]
            }
        }
    }
};

export default filter;