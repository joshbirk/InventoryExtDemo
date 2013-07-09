Ext.define('Warehouse.controller.Main', {
    extend: 'Ext.app.Controller',	
	pushItems: function(items) {
		console.log('in controller');
		var panels = [];
		for(var i = 0; i < items.length; i++) {
				var panel = Ext.create('Warehouse.view.ItemBox',{data:items[i]});
				panels.push(panel);
			}
		Ext.getCmp('itemboxes').removeAll(true);
		Ext.getCmp('itemboxes').add(panels);
		Ext.getCmp('itemboxes').doLayout();
		},
	
	pushReduction: function(item) {
		Ext.getCmp('reducedbox').removeAll(true);
		Ext.getCmp('reducedbox').add({html:"<div style='height:50px;'><b>"+item.Name + " is now: $"+item.Price__c+"</b></div>"});
		Ext.getCmp('reducedbox').doLayout();		
		console.log('Checking current list');
		var current_record = Ext.getStore('Inventory').find('Name',item.Name);
		console.log(current_record);
		if(current_record >= 0) {
			var record = Ext.getStore('Inventory').getAt(current_record);
			record.data.Price__c = item.Price__c;
			var new_item = {recordId:record.data.Id,title:record.data.Name,desc:record.data.Description__c,price:item.Price__c};
			var panel = Ext.create('Warehouse.view.ItemBox',{data:new_item});
			Ext.getCmp('itemboxes').remove(current_record);
			Ext.getCmp('itemboxes').insert(current_record,panel);
			Ext.getCmp('itemboxes').doLayout();
		} 
		var current_line = Ext.getStore('InvoiceStatement').find('Name',item.Name);
		if(current_line >= 0) {
			var current_item = Ext.getStore('InvoiceStatement').getAt(current_line);
			console.log(current_item.data.Unit_Price);
			if(item.Price__c < current_item.data.Unit_Price) {
				current_item.data.Unit_Price = item.Price__c;
				console.log(current_item.data.Unit_Price);
				Ext.getCmp('invoicegrid').getView().refresh();
			} 			
		}
		
	},
	
	addItemtoInvoice: function(recordId) {
		var index = Ext.getStore('Inventory').find('Id',recordId);
		var record = Ext.getStore('Inventory').getAt(index);
		var current_line = Ext.getStore('InvoiceStatement').find('Name',record.data.Name);
		console.log(current_line);
		if(current_line == -1) {
			var line_item = Ext.create('Warehouse.model.Line_Item',{Name:record.data.Name,Merchandise:record.data.Id,Unit_Price:record.data.Price__c,Quantity:1});
			Ext.getStore('InvoiceStatement').add(line_item);
		} else {
			var current_item = Ext.getStore('InvoiceStatement').getAt(current_line);
			current_item.data.Quantity++;
		}
		Ext.getCmp('invoicegrid').getView().refresh();
	}
});


now.receiveMessage = function(message) {
       console.log('INCOMING MESSAGE');
	   console.log(message);
	   warehouseapp.getController('Main').pushReduction(message.sobject);
      }