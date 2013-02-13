/**
* @author Saad Shams :: saad@muizz.com
* Commands resides in the controller section of the system, and are used are for
* system wide operations, like system startup, retrieving a proxy, fetching data, 
* and passing on to View Tier (Mediators/Components) for display of data. 
* Commands are instantiated on the notification and execute function gets called.
* */

puremvc.define(
{
    name: "controller.commands.StartupCommand",
    parent: puremvc.SimpleCommand
},
{
     /**
     * @param {Object} notification
     */
	
    execute: function(notification) {
        
        for(var i=0; i<4; i++) {
            this.facade.registerMediator(new view.mediators.BarsMediator(new view.components.Bars("bars_" + i)));
        }
        
        //fields have to be after bars because of the reset command
        this.facade.registerMediator(new view.mediators.FieldsMediator(new view.components.Fields("fields"))); //id fields of the HTML element        
        
    }
}
);
