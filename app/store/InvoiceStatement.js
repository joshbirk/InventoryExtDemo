Ext.define('Warehouse.store.InvoiceStatement',
    {
    extend: 'Ext.data.Store',
    config: {
        model: 'Warehouse.model.Line_Item'
    },
	autoLoad:false,
	submit: function() {
		console.log(Ext.encode(Ext.pluck(Ext.getStore('InvoiceStatement').data.items, 'data')));
		Ext.Ajax.request({
		   url: '/InventorySubmit',
		   method: 'POST',
		   jsonData: '{"items":'+Ext.encode(Ext.pluck(Ext.getStore('InvoiceStatement').data.items, 'data'))+'}',
		   success: function(response, opts) {
		      var obj = Ext.decode(response.responseText);
		      console.dir(obj);
			  Ext.getStore('InvoiceStatement').loadData([],false);
		   },
		   failure: function(response, opts) {
		      console.log('server-side failure with status code ' + response.status);
		   }
		});
	}
});