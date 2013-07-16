Ext.define('Warehouse.store.Inventory',
    {
    extend: 'Ext.data.Store',
    model: 'Warehouse.model.Merchandise',
	autoLoad:true,
	proxy: {
	            type: 'rest',
	            url: '/SELECT Id, Name, Price__c, Description__c, Quantity__c from Merchandise__c',
	            reader: {
	                type: 'json',
	                root: 'data'
	            },
	            writer: {
	                type: 'json'
	            }
	        } ,
	listeners: {
			        load :  function(store,records,options) {
						warehouseapp.getController('Main').pushItems(records);
			        }
			    } 
});