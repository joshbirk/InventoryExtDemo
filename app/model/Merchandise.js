Ext.define('Warehouse.model.Merchandise', {
    extend: 'Ext.data.Model',   
    fields: [
        { name: 'Id', type: 'auto' },
        { name: 'Name', type: 'auto' },
        { name: 'Price__c', type: 'auto' },
        { name: 'Quantity__c', type: 'auto' },
        { name: 'Description__c', type: 'auto' },
        { name: 'Price_Reduction__c', type: 'auto' }
    ]
});

