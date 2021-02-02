const filter = {
    electronics: {
        title: 'Electronics',
        items: {
            mobile_phones: {
                title: 'Mobile phones',
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
                        title: 'Brand',
                        val: 'brand',
                        select: true,
                        items: [
                            { val: 'all', title: 'All' }, 
                            { val: 'artel', title: 'Artel' }, 
                            { val: 'apple', title: 'Apple' },
                            { val: 'asus', title: 'ASUS' },
                            { val: 'blackberry', title: 'BlackBerry' },
                            { val: 'fly', title: 'Fly' },
                            { val: 'google', title: 'Google' },
                            { val: 'htc', title: 'HTC' },
                            { val: 'huawei', title: 'Huawei' },
                            { val: 'lenovo', title: 'Lenovo' },
                            { val: 'lg', title: 'LG' },
                            { val: 'meizu', title: 'Meizu' },
                            { val: 'nokia', title: 'Nokia' },
                            { val: 'pantech', title: 'Pantech' },
                            { val: 'samsung', title: 'Samsung' },
                            { val: 'sony', title: 'Sony' },
                            { val: 'vertu', title: 'Vertu' },
                            { val: 'xiaomi', title: 'Xiaomi' },
                            { val: 'other', title: 'other' },
                        ]
                    },
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
            sim_cards: {
                title: 'Sim cards',
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
            landline_phones: {
                title: 'Landline phones',
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
            desktop: {
                title: 'Desktop PCs',
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
            laptops: {
                title: 'Laptops',
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
                        title: 'Brand',
                        val: 'brand',
                        select: true,
                        items: [
                            { val: 'all', title: 'All' }, 
                            { val: 'acer', title: 'Acer' }, 
                            { val: 'apple', title: 'Apple' },
                            { val: 'asus', title: 'ASUS' },
                            { val: 'benq', title: 'BenQ' },
                            { val: 'sony', title: 'Sony' },
                            { val: 'compaq', title: 'Compaq' },
                            { val: 'htc', title: 'HTC' },
                            { val: 'dell', title: 'Dell' },
                            { val: 'lenovo', title: 'Lenovo' },
                            { val: 'desten', title: 'DESTEN' },
                            { val: 'emachines', title: 'eMachines' },
                            { val: 'fujitsusiemens', title: 'Fujitsu-Siemens' },
                            { val: 'gigabyte', title: 'GigaByte' },
                            { val: 'hp', title: 'HP' },
                            { val: 'ibm', title: 'IBM/ThinkPad' },
                            { val: 'samsung', title: 'Samsung' },
                            { val: 'toshiba', title: 'Toshiba' },
                        ]
                    },
                    {
                        title: 'Display diagonal',
                        val: 'ddiagonal',
                        select: true,
                        items: [
                            { val: 'to13', title: 'Up to 13' }, 
                            { val: '13to14', title: '13 to 14' }, 
                            { val: '15to17', title: '15 to 17' },
                            { val: 'from18', title: 'from18' },
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
            media_devices: {
                title: 'Media devices',
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
            games_consoles: {
                title: 'Games / Consoles',
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
            tvs: {
                title: 'TVs',
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
            other: {
                title: 'Other electronics',
            },
            home_appliances: {
                title: 'Home Appliances',
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
            climatic_equipment: {
                title: 'Climatic equipment',
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
            accessories_and_components: {
                title: 'Accessories and components',
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
            }
        }
    }
};

export default filter;