Ext.define("Warehouse.view.ItemBox", {
    extend: 'Ext.Container',
    xtype: 'itembox',
	width: 350,
	config: {
		recordId: null,
		title: null,
		price: null,
		desc: null,
		tpl: Ext.create('Ext.XTemplate','<div style="padding: 10px; border-bottom: 1px solid black;"><h1>{title}</h1><h2>${price}</h2><P>{desc}</P><br />' +
						'<input type="button" onclick=warehouseapp.getController("Main").addItemtoInvoice("{recordId}") value="Add To Invoice" /></div')
	},
	listeners: {
	        click: {
	           element: 'el', // could be 'body', or any other Ext.Elements 
	                          // that are available from the component
	           fn: function() { console.log(arguments); }
	        }
	    }
});