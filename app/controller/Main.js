Ext.define('Warehouse.controller.Main', {
    extend: 'Ext.app.Controller',	
	refs: [{
	    selector: '#reducedbox',
	    ref: 'reducedbox'
		},
		{
	    selector: '#itemboxes',
	    ref: 'itemboxes'
		},
		{
	    selector: '#invoicegrid',
	    ref: 'invoicegrid'
		},
		{
	    selector: '#addinvoice',
	    ref: 'addInvoice'
		},
		],
	init: function() {
				console.log('Hello Init');
		        this.control({
		            "#itemboxes button": {
		                click: function(button) {
							this.addItemtoInvoice(button.up('itembox').recordId);
							}
		            }
		        });
		    },
	
	pushItems: function(items) {
		this.getItemboxes().updatePanels(items);
		},
	
	pushReduction: function(item) {
		console.log(item);
		warehouseapp.fireEvent('reduction');
		this.getReducedbox().updateBox(item);	
	
		console.log('Checking current list');
		var current_record_index = warehouseapp.getInventoryStore().find('Name',item.Name);
		console.log(current_record_index);
		if(current_record_index >= 0) {
			//update store
			current_record = warehouseapp.getInventoryStore().getAt(current_record_index);
			current_record.set({Price__c:item.Price__c});
			item.Description__c = current_record.data.Description__c;
			this.getItemboxes().updatePanel(current_record_index,item);
		} 
		var current_line = warehouseapp.getInvoiceStatementStore().find('Name',item.Name);
		if(current_line >= 0) {
			var current_item = warehouseapp.getInvoiceStatementStore().getAt(current_line);
			if(item.Price__c < current_item.data.Price__c) {
				current_item.set({Price__c : item.Price__c});
			} 			
		}
		
	},
	
	addItemtoInvoice: function(recordId) {
		var index = warehouseapp.getInventoryStore().find('Id',recordId);
		var record = warehouseapp.getInventoryStore().getAt(index);
		var current_line = warehouseapp.getInvoiceStatementStore().find('Name',record.data.Name);
		console.log(current_line);
		if(current_line == -1) {
			var line_item = Ext.create('Warehouse.model.Merchandise',{Name:record.data.Name,Id:record.data.Id,Price__c:record.data.Price__c,Quantity__c:1});
			warehouseapp.getInvoiceStatementStore().add(line_item);
		} else {
			var current_item = warehouseapp.getInvoiceStatementStore().getAt(current_line);
			current_quantity = current_item.data.Quantity__c;
			current_quantity++;
			current_item.set({Quantity__c:current_quantity});
		}
		// this.getInvoiceGrid().refresh();
	}
});


now.receiveMessage = function(message) {
       console.log('INCOMING MESSAGE');
	   console.log(message);
	   warehouseapp.getController('Main').pushReduction(message.sobject);
      }