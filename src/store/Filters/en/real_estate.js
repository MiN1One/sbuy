const filter = {
    real_estate: {
        title: 'Real estate',
        items: {
            apartments: {
                title: 'Apartments',
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
            houses: {
                title: 'Houses',
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
            fields: {
                title: 'Fields',
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
            commercial_premises: {
                title: 'Commercial premises',
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
            garages: {
                title: 'Garages',
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