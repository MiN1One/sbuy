const filter = {
    for_kids: {
        title: 'For kids',
        items: {
            clothing: {
                title: 'Clothing',
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
                        ]
                    },
                    {
                        title: 'Type of clothing',
                        val: 'type', 
                        items: [
                            { val: 'boys', title: 'For boys' }, 
                            { val: 'girls', title: 'For girls' }, 
                            { val: 'all', title: 'All' }
                        ]
                    },
                    {
                        title: 'Type of business',
                        val: 'business_type', 
                        items: [
                            { val: 'business', title: 'Business' }, 
                            { val: 'private', title: 'Private' }, 
                            { val: 'all', title: 'All' }
                        ]
                    }
                ]
            },
            shoes: {
                title: 'Shoes',
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
                        ]
                    },
                    {
                        title: 'Type of business',
                        val: 'business_type', 
                        items: [
                            { val: 'business', title: 'Business' }, 
                            { val: 'private', title: 'Private' }, 
                            { val: 'all', title: 'All' }
                        ]
                    }
                ]
            },
            furniture: {
                title: 'Furniture',
                counters: [
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
                        ]
                    },
                    {
                        title: 'Type of business',
                        val: 'business_type', 
                        items: [
                            { val: 'business', title: 'Business' }, 
                            { val: 'private', title: 'Private' }, 
                            { val: 'all', title: 'All' }
                        ]
                    }
                ]
            },
            toys: {
                title: 'Toys',
                counters: [
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
                        ]
                    },
                    {
                        title: 'Type of business',
                        val: 'business_type', 
                        items: [
                            { val: 'business', title: 'Business' }, 
                            { val: 'private', title: 'Private' }, 
                            { val: 'all', title: 'All' }
                        ]
                    }
                ]
            },
            educational_assets: {
                title: 'Educational assets',
                counters: [
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
                        ]
                    },
                    {
                        title: 'Type of business',
                        val: 'business_type', 
                        items: [
                            { val: 'business', title: 'Business' }, 
                            { val: 'private', title: 'Private' }, 
                            { val: 'all', title: 'All' }
                        ]
                    }
                ]
            },
            carriages: {
                title: 'Carriages',
                counters: [
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
                        ]
                    },
                    {
                        title: 'Type of business',
                        val: 'business_type', 
                        items: [
                            { val: 'business', title: 'Business' }, 
                            { val: 'private', title: 'Private' }, 
                            { val: 'all', title: 'All' }
                        ]
                    }
                ]
            },
            food: {
                title: 'Food',
                counters: [
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
                        ]
                    },
                    {
                        title: 'Type of business',
                        val: 'business_type', 
                        items: [
                            { val: 'business', title: 'Business' }, 
                            { val: 'private', title: 'Private' }, 
                            { val: 'all', title: 'All' }
                        ]
                    }
                ]
            },
            others: {
                title: 'Others',
                counters: [
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
                        ]
                    },
                    {
                        title: 'Type of business',
                        val: 'business_type', 
                        items: [
                            { val: 'business', title: 'Business' }, 
                            { val: 'private', title: 'Private' }, 
                            { val: 'all', title: 'All' }
                        ]
                    }
                ]
            }
        }
    }
};

export default filter;