/**
* @author Saad Shams :: saad@muizz.com
* Manages and listens to TagComponent Bars
* */

puremvc.define(
{
    name: 'view.mediators.BarsMediator',
    parent: puremvc.Mediator,
    
    constructor: function(component) {
        puremvc.Mediator.call(this, this.constructor.NAME + "_" + component.id.split("_")[1], component);
    }
},
{
    /* Instance Methods and variables */
    onRegister: function() { //listen for SCROLL custom event from the Menu Component
        this.viewComponent.addEventListener(view.components.Bars.DRAG, Delegate.create(this, this.dragHandler));
    },

     /**
     * @param {Object} event
     * handler for DRAG custom event
     * which in turns sends DRAG notification 
     */        
        
    dragHandler: function(event) {
        this.facade.sendNotification(ApplicationFacade.DRAG, event.body); //Send Scroll Notification
    },
    
    /**
    * Notification List of it's Interests
    * @return {Array}
    */
    listNotificationInterests: function() {
        return [
            ApplicationFacade.SCALE,
        ];
    },
            
    handleNotification: function(notification) { //body - 0=>group, 1=>index, 2=>value
        switch(notification.getName()) {
            case ApplicationFacade.SCALE:
                if(notification.getBody()[0] == this.mediatorName.split("_")[1]) {
                    this.viewComponent.scale(notification.getBody()[1], notification.getBody()[2]);
                }
                break;
        }
    }
},
{
    /* Static methods and variables */
    NAME: "BarsMediator"
}
);