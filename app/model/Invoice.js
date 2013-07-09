Ext.define('Warehouse.model.Invoice', {
    extend: 'Ext.data.Model',   
    fields: [
        { name: 'Id', type: 'auto' },
        { name: 'Name', type: 'auto' },
        { name: 'Status__c', type: 'auto' }
    ]
});