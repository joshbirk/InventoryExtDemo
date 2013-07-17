Ext.define("Warehouse.view.ReducedBox", {
    extend: 'Ext.panel.Panel',
    id:'reducedbox',
	xtype:'reducedbox',
	updateBox: function(item) {
		this.body.update("<div style='height:50px;'><b>"+item.Name+" is now: $"+item.Price__c+"</b></div>");		
	}
});