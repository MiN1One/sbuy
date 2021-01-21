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
                        ],
                        method: 'onFilterByCondition'
                    },
                    {
                        title: 'Type',
                        val: 'type', 
                        items: [
                            { val: 'boys', title: 'For boys' }, 
                            { val: 'girls', title: 'For girls' }, 
                            { val: 'all', title: 'All' }
                        ],
                        method: 'onFilterByCondition'
                    },
                ]
            },
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