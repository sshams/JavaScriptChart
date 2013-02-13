/**
* @author Saad Shams :: saad@muizz.com
* Manages and listens to TagComponent Fields
* */

puremvc.define(
{
    name: 'view.mediators.FieldsMediator',
    parent: puremvc.Mediator,
    
    constructor: function(component) {
        puremvc.Mediator.call(this, this.constructor.NAME, component);
    }
},
{
    /* Instance Methods and variables */
    
    onRegister: function() { //listen for SCROLL custom event from the Menu Component
        this.viewComponent.addEventListener(view.components.Fields.SCALE, Delegate.create(this, this.scaleHandler));
        this.viewComponent.dispatchValues();
    },
        
    /**
     * @param {Object} event
     * handler for BLUR custom event
     * which in turns sends BLUR notification 
     */        
        
    scaleHandler: function(event) {
        this.facade.sendNotification(ApplicationFacade.SCALE, event.body); //Send Scroll Notification
    },

    /**
    * Notification List of it's Interests
    * @return {Array}
    */
    listNotificationInterests: function() {
        return [
            ApplicationFacade.DRAG,
        ];
    },
            
    handleNotification: function(notification) { //body - 0=>group, 1=>index, 2=>value
        switch(notification.getName()) {
            case ApplicationFacade.DRAG:
                this.viewComponent.setField(notification.getBody()[0], notification.getBody()[1], notification.getBody()[2]);
                break;
        }
    }
},
{
    /* Static methods and variables */
    NAME: "FieldsMediator"
}
);