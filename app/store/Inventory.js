Ext.define('Warehouse.store.Inventory',
    {
    extend: 'Ext.data.Store',
    config: {
        model: 'Warehouse.model.Merchandise'
    },
	autoLoad:true,
	proxy: {
	            type: 'rest',
	            url: '/SELECT Id, Name, Price__c, Description__c, Quantity__c, Price_Reduction__c from Merchandise__c',
	            reader: {
	                type: 'json',
	                root: 'data'
	            },
	            writer: {
	                type: 'json'
	            }
	        },
	listeners: {
			        load :  function(store,records,options) {
					    var items = [];
						Ext.each(records, function(record, index){
						   items.push({recordId:record.data.Id,title:record.data.Name,desc:record.data.Description__c,price:record.data.Price__c});
			            }, this);
						warehouseapp.getController('Main').pushItems(items);
			        }
			    }
});