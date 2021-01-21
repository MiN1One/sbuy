const filter = {
    electronics: {
        title: 'Electronics',
        items: {
            mobile_phones: {
                title: 'Mobile phones',
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
                    }
                ]
            },
            computers: {
                title: 'Computers',
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
                    }
                ]
            },
            media_devices: {
                title: 'Media devices',
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
                    }
                ]
            },
            games_consoles: {
                title: 'Games / Consoles',
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
                    }
                ]
            },
            tvs: {
                title: 'TVs',
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
                    }
                ]
            },
            home_appliances: {
                title: 'Home Appliances',
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
                    }
                ]
            },
            climatic_equipment: {
                title: 'Climatic equipment',
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
                    }
                ]
            },
            accessories_and_components: {
                title: 'Accessories and components',
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
                    }
                ]
            }
        }
    }
};

export default filter;