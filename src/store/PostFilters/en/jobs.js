const filter = {
    items: {
        retail_sales: {
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
        logistics: {
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
        construction: {
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
        accounting: {
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
        security_safety: {
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
        home_staff: {
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
        beauty_fitness_sports: {
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
        tourism: {
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
        education: {
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
        restaurants: {
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
        culture_art: {
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
        medicine_pharmacy: {
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
        it_telecom: {
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
        the_property: {
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
        marketing: {
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
        production_energy: {
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
        secretariat: {
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
        for_students: {
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
        other_areas_of_occupation: {
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
        part_time_employment: {
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