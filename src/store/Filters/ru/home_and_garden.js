const filter = {
    home_and_garden: {

        title: 'Home and garden',
        items: {
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
                        method: 'onFilterByCondition'
                    }
                ]
            },
            garden: {
                title: 'Garden',
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
            construction: {
                title: 'Construction',
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
            tools: {
                title: 'Tools',
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
            houseplants: {
                title: 'Houseplants',
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
            dishes_kitchen_utensils: {
                title: 'Dishes / Kitchen Utensils',
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
            household_supplies: {
                title: 'Household Supplies',
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
            garden_tools: {
                title: 'Garden tools',
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
            stationery: {
                title: 'Stationery',
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
                        method: 'onFilterByCondition'
                    }
                ]
            },
            other_household_goods: {
                title: 'Other household goods',
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