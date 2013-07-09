Ext.define('Warehouse.model.Line_Item', {
    extend: 'Ext.data.Model',   
    fields: [
        { name: 'Name', type: 'auto' },
        { name: 'Merchandise', type: 'auto' },
        { name: 'Quantity', type: 'auto' },
        { name: 'Unit_Price', type: 'auto' }
    ]
});