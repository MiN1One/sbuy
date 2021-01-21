const filter = {
    items: {
        construction_cleaning: {
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
        financial_services: {
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
        transportation_transport_rental: {
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
        advertising_marketing: {
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
        babysitters_nurses: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        beauty_health: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        equipment: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        education_sports: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        services_for_animals: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        business_sale: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        entertainment_arts: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        translation_services_typing: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        auto_services: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        maintenance_repair_of_equipment: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        legal_services: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        rental_of_goods: {
            title: 'Rental of goods',
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        other_services: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
        tourism: {
            inputs: [
                {
                    title: 'Year of manufacture',
                    val: 'onInputYearOfManufacture'
                },
                {
                    title: 'Mileage',
                    val: 'onInputMileage'
                }
            ],
            sub: [
                {
                    title: 'Condition',
                    items: [
                        { val: 'used', title: 'Used' }, 
                        { val: 'new', title: 'New' }, 
                        { val: 'all', title: 'All' }
                    ],
                    val: 'onFilterByCondition'
                }
            ]
        },
    }
};

export default filter;