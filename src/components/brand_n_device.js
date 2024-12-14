const devices = [
    { name: 'Laptop', icon: '/logo/laptop.png' },
    { name: 'Desktop', icon: '/logo/desktop.png' },
    { name: 'Accessories', icon: '/logo/accessories.png' },
    { name: 'Monitor', icon: '/logo/monitor.png' },
    { name: 'Server', icon: '/logo/server.png' },
];

const brands = [
    { name: 'Dell', logo: '/logo/dell-logo.svg', supportLink: 'https://www.dell.com/support/contents/en-us/Category/product-support/self-support-knowledgebase/locate-service-tag/', identifier: 'Service Tag' },
    { name: 'Asus', logo: '/logo/asus-logo.svg', supportLink: 'https://www.asus.com/us/support/article/566/', identifier: 'Serial Number' },
    { name: 'Gigabyte', logo: '/logo/gigabyte-logo.svg', supportLink: 'https://www.gigabyte.com/Support/Consumer/Identification/Product-Model-and-Serial-Number/', identifier: 'Serial Number' },
    { name: 'HP', logo: '/logo/hp-logo.svg', supportLink: 'https://support.hp.com/si-en/document/ish_2039298-1862169-16', identifier: 'Serial Number' },
    { name: 'Lenovo', logo: '/logo/lenovo-logo.svg', supportLink: 'https://support.lenovo.com/us/en/solutions/ht510152-how-to-find-serial-numbers-pc', identifier: 'Serial Number' },
    { name: 'MSI', logo: '/logo/msi-logo.svg', supportLink: 'https://www.msi.com/support/technical-details', identifier: 'Serial Number' },
    { name: 'Other', logo: '', supportLink: null, identifier: 'Serial Number' },
];

export { devices, brands };
