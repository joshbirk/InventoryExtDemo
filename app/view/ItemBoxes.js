Ext.define("Warehouse.view.ItemBoxes", {
    extend: 'Ext.panel.Panel',
    layout: 'vbox',
	autoScroll: true,
	xtype: 'itemboxes',
	title: 'Inventory',
	updatePanels: function(items) {
		var panels = [];
		for(var i = 0; i < items.length; i++) {
				console.log(items[i]);
				var panel = Ext.create('Warehouse.view.ItemBox',{data:items[i].data,recordId:items[i].data.Id});
				panels.push(panel);
			}
		this.removeAll(true);
		this.add(panels);
		this.doLayout();
	},
	updatePanel: function(index, item) {
		var panel = Ext.create('Warehouse.view.ItemBox',{data:item,recordId:item.Id});
		this.remove(index);
		this.insert(index,panel);
		this.doLayout();
	}
});