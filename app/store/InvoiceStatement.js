Ext.define('Warehouse.store.InvoiceStatement',
    {
    extend: 'Ext.data.Store',
    model: 'Warehouse.model.Merchandise',
	autoLoad:false,
	proxy: {
	            type: 'rest',
				batchActions: true,
				url: '/InventorySubmit',
	            reader: {
	                type: 'json',
	                root: 'data'
	            },
	            writer: {
	                type: 'json'
	            }
	        },
	submit: function() {
		this.each(function(record){
		    record.setDirty();
		});

		this.sync();
		this.loadData([],false);
	}
});