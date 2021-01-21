const filter = {
    items: {
        furniture: {
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
        garden: {
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
        tools: {
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
        houseplants: {
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
        dishes_kitchen_utensils: {
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
        garden_tools: {
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
        household_supplies: {
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
        stationery: {
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
        food: {
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
        other_household_goods: {
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