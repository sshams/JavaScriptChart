/**
* @author Saad Shams :: saad@muizz.com
* Manages the functionality of textfields
* */

puremvc.define(
{
    name: "view.components.Fields",
    parent: view.components.TagObject,
    
    /**
    * @constructor
    * @extends {view.components.TagObject}
    * @param (Object) element
    */
   
    constructor: function(element) {
        view.components.TagObject.call(this, document.getElementById(element));
        
        //Event handlers for the textfields
        for(var i=0; i<this.total; i++) {
            var field = document.getElementById("field_" + i + "_" + 0);
            this.addEventHandler(field, events.MouseEvent.FOCUS, Delegate.create(this, this.fields_focusHandler)); //Delegate.create to set context (this)
            this.addEventHandler(field, events.MouseEvent.BLUR, Delegate.create(this, this.fields_blurHandler)); //Delegate.create to set context (this)            
            
            field = document.getElementById("field_" + i + "_" + 1)
            this.addEventHandler(field, events.MouseEvent.FOCUS, Delegate.create(this, this.fields_focusHandler)); //Delegate.create to set context (this)
            this.addEventHandler(field, events.MouseEvent.BLUR, Delegate.create(this, this.fields_blurHandler)); //Delegate.create to set context (this)
        }
    }
},
{
    /* Instance Methods and variables */
    lastValue: 0,
    maxValue: 260, //maxValue of the bar chart
    total: 4,      //total sets of textFields
    
    /**
     * @param {Object} event
     * blurHandler for each textField
     */
    
    fields_blurHandler: function(event) {
        view.components.Event.adapt(event); //adapting event.target with event.srcElement
        
        if(!this.validate(event.target)) {
            event.target.value = this.lastValue;
            return;
        }
        
        var ids = event.target.id.split("_"); //field_0_0, Note: +5 offset for the resize band
        this.dispatchEvent(new view.components.Event(this.constructor.SCALE, event.target, [parseInt(ids[1]), parseInt(ids[2]), parseInt(event.target.value) + 5]));
    },
        
    fields_focusHandler: function(event) {
        view.components.Event.adapt(event); //adapting event.target with event.srcElement
        this.lastValue = event.target.value;
    },

    validate: function(target) {
        if(isNaN(parseInt(target.value))) {
            return false;
        } else if(parseInt(target.value) > this.maxValue) {
            return false;
        } else {
            return true;
        }
    },
        
    setField: function(group, index, value) {
        document.getElementById("field_" + group + "_" + index).value = value;
    },
        
    dispatchValues: function() { //to populate bar dynamically  
        var defaultHeight = 5, ids, field;
        for(var i=0; i<this.total; i++) {
            field = document.getElementById("field_" + i + "_" + 0);
            ids = field.id.split("_");
            this.dispatchEvent(new view.components.Event(this.constructor.SCALE, field, [parseInt(ids[1]), parseInt(ids[2]), parseInt(field.value) + defaultHeight]));
            
            field = document.getElementById("field_" + i + "_" + 1);
            ids = field.id.split("_");
            this.dispatchEvent(new view.components.Event(this.constructor.SCALE, field, [parseInt(ids[1]), parseInt(ids[2]), parseInt(field.value) + defaultHeight]));            
        }
    }
}, 
{   
    /* Static methods and variables */
    
    //Custom type event name for dispatching events to it's Mediator (FieldsMediator)
    SCALE: "scale"
}
);
