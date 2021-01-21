const filter = {
    items: {
        apartments: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'year'
                },
                {
                    title: 'Mileage',
                    val: 'mileage'
                }
            ],
            sub: [
                {
                    title: 'Condition', 
                    items: [
                        { val: 'used', title: 'Used' },
                        { val: 'new', title: 'New' }, 
                    ],
                    val: 'condition'
                },
                {
                    title: 'Type',
                    items: [
                        { val: 'boys', title: 'For boys' }, 
                        { val: 'girls', title: 'For girls' }, 
                    ],
                    val: 'type'
                }
            ]
        },
        houses: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'year'
                },
                {
                    title: 'Mileage',
                    val: 'mileage'
                }
            ],
            sub: [
                {
                    title: 'Condition', 
                    items: [
                        { val: 'used', title: 'Used' },
                        { val: 'new', title: 'New' }, 
                    ],
                    val: 'condition'
                },
                {
                    title: 'Type',
                    items: [
                        { val: 'boys', title: 'For boys' }, 
                        { val: 'girls', title: 'For girls' }, 
                    ],
                    val: 'type'
                }
            ]
        },
        fields: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'year'
                },
                {
                    title: 'Mileage',
                    val: 'mileage'
                }
            ],
            sub: [
                {
                    title: 'Condition', 
                    items: [
                        { val: 'used', title: 'Used' },
                        { val: 'new', title: 'New' }, 
                    ],
                    val: 'condition'
                },
                {
                    title: 'Type',
                    items: [
                        { val: 'boys', title: 'For boys' }, 
                        { val: 'girls', title: 'For girls' }, 
                    ],
                    val: 'type'
                }
            ]
        },
        commercial_premises: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'year'
                },
                {
                    title: 'Mileage',
                    val: 'mileage'
                }
            ],
            sub: [
                {
                    title: 'Condition', 
                    items: [
                        { val: 'used', title: 'Used' },
                        { val: 'new', title: 'New' }, 
                    ],
                    val: 'condition'
                },
                {
                    title: 'Type',
                    items: [
                        { val: 'boys', title: 'For boys' }, 
                        { val: 'girls', title: 'For girls' }, 
                    ],
                    val: 'type'
                }
            ]
        },
        garages: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'year'
                },
                {
                    title: 'Mileage',
                    val: 'mileage'
                }
            ],
            sub: [
                {
                    title: 'Condition', 
                    items: [
                        { val: 'used', title: 'Used' },
                        { val: 'new', title: 'New' }, 
                    ],
                    val: 'condition'
                },
                {
                    title: 'Type',
                    items: [
                        { val: 'boys', title: 'For boys' }, 
                        { val: 'girls', title: 'For girls' }, 
                    ],
                    val: 'type'
                }
            ]
        }
    }
};

export default filter;