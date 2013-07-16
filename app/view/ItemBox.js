Ext.define("Warehouse.view.ItemBox", {
    extend: 'Ext.Panel',
	recordId: null,
    xtype: 'itembox',
	width: 350,
	tpl: Ext.create('Ext.XTemplate','<div style="padding: 10px; border-bottom: 1px solid black;"><h1>{Name}</h1><h2>${Price__c}</h2><P>{Description__c}</P><br />' +
						'</div'),
	buttons: [
	        {
	            text: 'Add To Invoice',
				itemid: 'addinvoice'
	        }]
						
});