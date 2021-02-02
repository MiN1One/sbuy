const filter = {
    real_estate: {
        title: 'Real estate',
        items: {
            apartments: {
                title: 'Apartments',
                counters: [
                    {
                        title: 'Number of rooms',
                        val: 'num_rooms',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Total area',
                        val: 'total_area',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Floor',
                        val: 'floor',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
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
            houses: {
                title: 'Houses',
                counters: [
                    {
                        title: 'Price',
                        val: 'price',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Total area',
                        val: 'total_area',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Number of rooms',
                        val: 'num_rooms',
                        start: 0,
                        end: 1
                    },
                    {
                        title: 'Land area',
                        val: 'land_area',
                        start: 0,
                        end: 1
                    }
                ],
                sub: [
                    {
                        title: 'Type of house',
                        val: 'house_type', 
                        items: [
                            { val: 'business', title: 'Business' }, 
                            { val: 'private', title: 'Private' }, 
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
            fields: {
                title: 'Fields',
                counters: [
                    {
                        title: 'Total area',
                        val: 'total_area',
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
                        title: 'Disposition',
                        val: 'disposition', 
                        select: true,
                        items: [
                            { val: 'center', title: 'In city' }, 
                            { val: 'suburb', title: 'In the suburbs' }, 
                            { val: 'countryside', title: 'In the countryside' },
                            { val: 'foothills', title: 'In the foothills' },
                            { val: 'closed', title: 'In a closed area' }
                        ]
                    },
                    {
                        title: 'Field for',
                        val: 'field_for',
                        select: true,
                        items: [
                            { val: 'construction', title: 'For construction' }, 
                            { val: 'garden', title: 'For garden' }, 
                            { val: 'industrial', title: 'Industrial' },
                            { val: 'garden', title: 'For garden' }, 
                            { val: 'other', title: 'Other' }
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
            commercial_premises: {
                title: 'Commercial premises',
                counters: [
                    {
                        title: 'Total area',
                        val: 'total_area',
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
                        title: 'Type of property',
                        val: 'property_type',
                        select: true,
                        items: [
                            { val: 'shop', title: 'Shop' }, 
                            { val: 'salon', title: 'Salon' }, 
                            { val: 'warehouse', title: 'Warehouse' },
                            { val: 'recreation', title: 'Recreation premise' },
                            { val: 'universal', title: 'Universal premise' },
                            { val: 'architecture', title: 'Small architectural form' },
                            { val: 'part', title: 'Part of building' },
                            { val: 'industry', title: 'Industrial premise' },
                            { val: 'other', title: 'Other' }
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
            garages: {
                title: 'Garages',
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
                        title: 'Type',
                        val: 'type', 
                        items: [
                            { val: 'garage', title: 'Garage' }, 
                            { val: 'parking', title: 'Parking place' }, 
                            { val: 'parkin_space', title: 'Parking space' }
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