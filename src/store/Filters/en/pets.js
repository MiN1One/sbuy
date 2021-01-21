const filter = {
    pets: {

        title: 'Pets',
        items: {
            cats: {
                title: 'Cats',
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
            dogs: {
                title: 'Dogs',
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
            aquarium: {
                title: 'Aquarium',
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
            birds: {
                title: 'Birds',
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
            rodents: {
                title: 'Rodents',
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
            farm_animals: {
                title: 'Farm animals',
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
            pet_supplies: {
                title: 'Pet supplies',
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
            knitting: {
                title: 'Knitting',
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
            lost_and_found: {
                title: 'Lost and found',
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
            animals_for_free: {
                title: 'Animals for free',
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
            other_animals: {
                title: 'Other animals',
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
        }
    }
};

export default filter;