Ext.define('Warehouse.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Border',
		'Ext.view.View',
		'Ext.grid.Panel'
    ],
    layout: {
        type: 'border'
    },

    items: [{
        region: 'north',
        xtype: 'reducedbox',
        title: 'Reduced Items',
        height: 50,
		id: 'reducedbox'
    },{
        region: 'west',
        xtype: 'itemboxes',
		id: 'itemboxes',
		width: 350
    },{
		region: 'center',
		id: 'invoicegrid',
		xtype:'invoicegrid'
	}
	]
});