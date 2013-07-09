Ext.define('Warehouse.view.InvoiceGrid',
{   extend: 'Ext.grid.Panel',
    height: 250,
    width: 350,
    title: 'Invoice Statement',
    store: 'InvoiceStatement',
	xtype: 'invoicegrid',
	renderTo: Ext.getBody(),
	features: [{
        ftype: 'summary'
    }],
	plugins: [
			        Ext.create('Ext.grid.plugin.CellEditing', {
			            clicksToEdit: 1
			        })
			    ],
			columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Name',
                    text: 'Merchandise',
					sortable: true,
					summaryType: 'count',
		            summaryRenderer: function(value, summaryData, dataIndex) {
		                return ((value === 0 || value > 1) ? '(' + value + ' Items)' : '(1 Item)');
		            }
                },
				{
                    xtype: 'gridcolumn',
                    dataIndex: 'Quantity',
                    text: 'Quantity',
					field: {xtype: 'numberfield'},
					editor: {allowBlank: false},
					summaryRenderer: Ext.util.Format.Decimal,
					summaryType: 'sum'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Unit_Price',
                    text: 'Unit Price',
					field: {xtype: 'numberfield'},
					editor: {allowBlank: false},
					renderer : function(value, metaData, record, rowIdx, colIdx, store, view) {
						    return Ext.util.Format.usMoney(value);
					        },
					summaryRenderer: Ext.util.Format.usMoney,
					summaryType: 'average'
		        },
				{
                    xtype: 'gridcolumn',
                    text: 'Total',
					renderer : function(value, metaData, record, rowIdx, colIdx, store, view) {
						    return Ext.util.Format.usMoney(record.get('Unit_Price') * record.get('Quantity'));
					        },
					summaryType: function(records){
			                var i = 0,
			                    length = records.length,
			                    total = 0,
			                    record;

			                for (; i < length; ++i) {
			                    record = records[i];
			                    total += record.get('Unit_Price') * record.get('Quantity');
			                }
			                return total;
			            },
			        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.usMoney(value); 
					        }
                } 
            ],
			tbar: [
					{
			            text: 'Send Invoice',
			            handler : function(){
			            //    Ext.getStore('InvoiceStatement').submitInvoice();
							  Ext.getStore('InvoiceStatement').submit();
			            }
			        },
					{
					    text: 'Delete Invoice',
			            handler : function(){
			                Ext.getStore('InvoiceStatement').loadData([],false);
			            }
			        }			
			]
});
