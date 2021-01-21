const filter = {
    home_and_garden: {
        title: 'Home and garden',
        items: {
            furniture: {
                title: 'Furniture',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Used' }, 
                            { val: 'new', title: 'New' }, 
                            { val: 'all', title: 'All' }
                        ],
                        method: 'onFilterByCondition'
                    }
                ]
            },
            garden: {
                title: 'Garden',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Used' }, 
                            { val: 'new', title: 'New' }, 
                            { val: 'all', title: 'All' }
                        ],
                        method: 'onFilterByCondition'
                    }
                ]
            },
            construction: {
                title: 'Construction',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Used' }, 
                            { val: 'new', title: 'New' }, 
                            { val: 'all', title: 'All' }
                        ],
                        method: 'onFilterByCondition'
                    }
                ]
            },
            tools: {
                title: 'Tools',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Used' }, 
                            { val: 'new', title: 'New' }, 
                            { val: 'all', title: 'All' }
                        ],
                        method: 'onFilterByCondition'
                    }
                ]
            },
            houseplants: {
                title: 'Houseplants',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Used' }, 
                            { val: 'new', title: 'New' }, 
                            { val: 'all', title: 'All' }
                        ],
                        method: 'onFilterByCondition'
                    }
                ]
            },
            dishes_kitchen_utensils: {
                title: 'Dishes / Kitchen Utensils',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Used' }, 
                            { val: 'new', title: 'New' }, 
                            { val: 'all', title: 'All' }
                        ],
                        method: 'onFilterByCondition'
                    }
                ]
            },
            household_supplies: {
                title: 'Household Supplies',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Used' }, 
                            { val: 'new', title: 'New' }, 
                            { val: 'all', title: 'All' }
                        ],
                        method: 'onFilterByCondition'
                    }
                ]
            },
            garden_tools: {
                title: 'Garden tools',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Used' }, 
                            { val: 'new', title: 'New' }, 
                            { val: 'all', title: 'All' }
                        ],
                        method: 'onFilterByCondition'
                    }
                ]
            },
            stationery: {
                title: 'Stationery',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Used' }, 
                            { val: 'new', title: 'New' }, 
                            { val: 'all', title: 'All' }
                        ],
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
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Used' }, 
                            { val: 'new', title: 'New' }, 
                            { val: 'all', title: 'All' }
                        ],
                        method: 'onFilterByCondition'
                    }
                ]
            },
            other_household_goods: {
                title: 'Other household goods',
                counters: [
                    {
                        title: 'Size',
                        val: 'size',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Condition',
                        val: 'condition', 
                        items: [
                            { val: 'used', title: 'Used' }, 
                            { val: 'new', title: 'New' }, 
                            { val: 'all', title: 'All' }
                        ],
                        method: 'onFilterByCondition'
                    }
                ]
            }
        }
    }
};

export default filter;