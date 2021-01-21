const filter = {
    transport_auto: {
        title: 'Transport / auto',
        items: {
            cars: {
                title: 'Cars',
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
            parts_and_accessories: {
                title: 'Parts and accessories',
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
            tires_disks_and_wheels: {
                title: 'Tires, disks and wheels',
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
            buses: {
                title: 'Buses',
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
            moto: {
                title: 'Moto',
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
            other_transport: {
                title: 'Other transport',
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
            trucks: {
                title: 'Trucks',
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
            trailers: {
                title: 'Trailers',
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
            special_equipment: {
                title: 'Special equipment',
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
            agricultural_machinery: {
                title: 'Agricultural machinery',
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
            water_transport: {
                title: 'Water transport',
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