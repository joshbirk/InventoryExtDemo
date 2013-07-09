Ext.define("Warehouse.view.ReducedItems", {
    extend: 'Ext.panel.Panel',
    xtype: 'reduceditems',
	title: 'Example Wizard',
	        width: 300,
	        height: 200,
	        bodyStyle: 'padding:15px',
	        defaults: {
	            // applied to each contained panel
	            border: false
	        },
	        // just an example of one possible navigation scheme, using buttons
	        bbar: [{
	            id: 'move-prev',
	            text: 'Back',
	            handler: function (btn) {
	                warehouseapp.getController('Main').navigate(btn.up("panel"), "prev");
	            }
	        }, '->', // greedy spacer so that the buttons are aligned to each side
	        {
	            id: 'move-next',
	            text: 'Next',
	            handler: function (btn) {
	                warehouseapp.getController('Main').navigate(btn.up("panel"), "next");
	            }
	        }],
	        // the panels (or "cards") within the layout
	        items: [{
			    id: 'card-0',
			    html: 'Waiting for specials'
			}] 
});