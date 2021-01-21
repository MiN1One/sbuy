const filter = {
    items: {
        cats: {
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
        dogs: {
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
        aquarium: {
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
        birds: {
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
        rodents: {
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
        farm_animals: {
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
        pet_supplies: {
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
        knitting: {
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
        lost_and_found: {
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
        animals_for_free: {
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
        other_animals: {
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
    }
};

export default filter;