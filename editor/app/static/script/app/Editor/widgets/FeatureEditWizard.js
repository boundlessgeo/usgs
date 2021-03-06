/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

Ext.ns("Editor");

/**
 * @requires Editor.js
 */

/** api: (define)
 *  module = app
 *  class = FeatureEditWizard
 *  extends = Ext.Window
 */

/** api: constructor
 *  .. class:: FeatureEditWizard(config)
 *
 *      Create a new popup which displays the attributes of a feature and
 *      makes the feature editable,
 *      using an ``OpenLayers.Control.ModifyFeature``.
 */
Editor.FeatureEditWizard = Ext.extend(Ext.Window, {
    
    /** i18n **/
    closeMsgTitle: 'Undo changes?',
    closeMsg: 'Any changes will be lost. Are you sure you want to cancel and close the window?',
    deleteMsgTitle: 'Delete Feature?',
    deleteMsg: 'Are you sure you want to delete this feature?',
    deleteButtonText: 'Delete',
    deleteButtonTooltip: 'Delete this feature',
    saveButtonText: 'Save',
    saveButtonTooltip: 'Save changes',
    cancelButtonText: 'Cancel',
    previousButtonText: 'Previous',
    nextButtonText: 'Next',
    /** end i18n */
    
    /** private config overrides **/
    autoScroll: true,
    shadow: false,
        
    /** api: config[vertexRenderIntent]
     *  ``String`` renderIntent for feature vertices when modifying. Undefined
     *  by default.
     */
    
    /** api: config[feature]
     *  ``GeoExt.data.FeatureRecord`` The feature being edited
     */
    feature: null,
    
    /** api: config[schema]
     *  ``GeoExt.data.AttributeStore`` Optional. If provided, available
     *  feature attributes will be determined from the schema instead of using
     *  the attributes that the feature has currently set.
     */
    schema: null,
    
    /** api: config[excludeFields]
     *  ``Array`` Optional list of field names (case insensitive) that are to be
     *  excluded from the attributeForm.
     */
    
    /** private: property[excludeFields]
     */
    
    /** private: property[modifyControl]
     *  ``OpenLayers.Control.ModifyFeature`` control for editing the geometry.
     */
    modifyControl: null,
    
    /** private: property[geometry]
     *  ``OpenLayers.Geometry`` The original geometry of the feature we are
     *  editing.
     */
    geometry: null,
    
    /** private: property[attributes]
     *  ``Object`` The original attributes of the feature we are editing.
     */
    attributes: null,
    
    /** private: property[saveButton]
     *  ``Ext.Button``
     */
    saveButton: null,
    
    /** private: property[deleteButton]
     *  ``Ext.Button``
     */
    deleteButton: null,

    /** private: property[postDeleteButton]
     *  ``Ext.Button``
     */
    postDeleteButton: null,
    
    /** private: property[store]
     *  ``GeoExt.data.FeatureStore`` The store holding the feature being edited
     */
        
    /** api: config[metadataSource]
     *  ``Object``
     */

    /** private: property[metadataForm]
     *  ``Editor.MetadataForm``
     */     
    metadataForm: null,

    /** private: property[attributeForm]
     *  ``Editor.AttributeForm``
     */
    attributeForm: null,

    /** private: property[exceptionPanel]
     *  ``Editor.ExceptionPanel``
     */
    exceptionPanel: null,
     
    /** private: method[initComponent]
     */
    initComponent: function() {
        
        this.store = this.feature.store;
        var feature = this.feature;
        if (feature instanceof GeoExt.data.FeatureRecord) {
            feature = this.feature = feature.getFeature();
        }
        
        /**
         * Working around what looks like an issue with deletes and feature ids
         * that include a hash corresponding to a feature version.
         * TODO: https://github.com/opengeo/usgs/issues/115
         */
        if (feature.fid) {
            feature.fid = feature.fid.split("@").shift();
        }

        if(!this.title && feature.fid) {
            this.title = feature.fid;
        }
        
        this.deleteButton = new Ext.Button({
            text: this.deleteButtonText,
            tooltip: this.deleteButtonTooltip,
            iconCls: "delete",
            hidden: !this.allowDelete,
            handler: this.preDeleteFeature,
            scope: this
        });

        this.postDeleteButton = new Ext.Button({
            text: this.deleteButtonText,
            tooltip: this.deleteButtonTooltip,
            iconCls: "delete",
            hidden: true,
            handler: this.deleteFeature,
            scope: this
        });
        
        this.saveButton = new Ext.Button({
            text: this.saveButtonText,
            iconCls: "save",
            tooltip: this.saveButtonTooltip,
            hidden: !Editor.metadataRecord,
            disabled: true,
            handler: function() {
                if (!Editor.metadataRecord) {
                    this.metadataForm.saveEntry();
                } else {
                    this.stopEditing(true);
                }
            },
            scope: this
        });

        this.cancelButton = new Ext.Button({
            text: this.cancelButtonText,
            iconCls: "cancel",
            handler: function() {
                this.close();
            },
            scope: this
        });
        
        this.previousButton = new Ext.Button({
            text: this.previousButtonText,
            iconCls: "gxp-icon-zoom-previous",
            hidden: true,
            handler: function() {
                this.metadataForm.hide();
                this.attributeForm.show();
                this.previousButton.hide();
                if (!Editor.metadataRecord) {
                    this.saveButton.hide();
                }
                if (this.exceptionPanel) {
                    this.exceptionPanel.hide();
                } else {
                    this.nextButton.show();
                }
                this.deleteButton.show();
                this.correctHeight(this.attributeForm);
            },
            scope: this
        });
        this.nextButton = new Ext.Button({
            text: this.nextButtonText,
            iconCls: "gxp-icon-zoom-next",
            disabled: true,
            handler: function() {
                this.attributeForm.hide();
                var child = this.exceptionPanel || this.metadataForm;
                child.show();
                this.nextButton.hide();
                this.saveButton.show();
                this.deleteButton.hide();
                this.previousButton.show();
                this.correctHeight(child);
            },
            scope: this
        });
        
        this.attributeForm = new Editor.AttributeForm({
            feature: feature,
            monitorValid: true,
            listeners: {
                clientvalidation: function(panel, valid) {
                    this.nextButton.setDisabled(!valid);
                    this.attributesValid = valid;
                    this.saveButton.setDisabled(!(this.attributesValid && this.metadataValid));
                },
                scope: this
            },
            schema: this.schema,
            excludeFields: this.excludeFields || [],
            padding: 5,
            border: false
        });
        
        this.metadataForm = new Editor.MetadataForm({
            hidden: true,
            padding: 5,
            border: false,
            monitorValid: true,
            url: this.metadataSource.url,
            featureType: this.metadataSource.featureType,
            featureNS: this.metadataSource.featureNS,
            listeners: {
                "clientvalidation": function(panel, valid) {
                    this.metadataValid = valid || Editor.metadataRecord;
                    this.saveButton.setDisabled(!(this.attributesValid && this.metadataValid));
                },
                "metadatasaved": function(cmp, record) {
                    Editor.setMetadataRecord(record);
                    var map = this.feature.layer.map;
                    var id = record.get("feature").fid;
                    this.store.addListener('beforewrite', function(store, action, rs, options) {
                        options.params.handle = id;
                    } , this);
                    // TODO there must be some better way to determine if we are deleting or updating
                    if (this.postDeleteButton.isVisible() === true) {
                        this.deleteFeature();
                    } else {
                        this.stopEditing(true);
                    }
                },
                "metadataopened": function(cmp, record) {
                    Editor.setMetadataRecord(record);
                    var map = this.feature.layer.map;
                    var id = record.getFeature().fid;
                    this.store.addListener('beforewrite', function(store, action, rs, options) {
                        options.params.handle = id;
                    } , this);
                },
                scope: this
            }
        });
        
        this.items = [
            this.attributeForm,
            this.metadataForm
        ];

        this.bbar = new Ext.Toolbar({
            items: [
                this.deleteButton,
                "->",
                this.previousButton,
                this.cancelButton,
                this.saveButton,
                this.nextButton,
                this.postDeleteButton
            ]
        });
        
        Editor.FeatureEditWizard.superclass.initComponent.call(this);
        
        this.store.on({
            "exception": this.handleStoreException,
            "write": this.handleStoreWrite,
            scope: this
        });
        
        this.on({
            "show": function() {
                this.preferredHeight = this.getHeight();
                this.correctHeight(this.attributeForm);
                this.startEditing();
            },
            "resize": function() {
                // keep track of user changes to the height
                if (!this.correctingHeight) {
                    this.preferredHeight = this.getHeight();
                }
            },
            "beforeclose": this.handleBeforeClose,
            "beforedestroy": function() {
                this.store.un("exception", this.handleStoreException, this);
                this.store.un("write", this.handleStoreWrite, this);
                this.store.commitChanges();
                this.editing = false;
            },
            scope: this
        });
    },
    
    /** private: method[correctHeight]
     *  :arg child: ``Ext.Component``
     * 
     *  Adjust the window height to fit within the map portal.  This makes the
     *  window shorter to fit the child height when possible and respects the 
     *  user set height.
     */
    correctHeight: function(child) {
        this.correctingHeight = true;
        this.setHeight(Math.min(
            this.preferredHeight, // set on user resize and first show
            this.ownerCt.getHeight() - 20, // map portal height
            this.getHeight() - this.body.getHeight() + child.getHeight()
        ));
        this.doLayout();
        this.correctingHeight = false;
    },

    /** private: method[handleBeforeClose]
     *  beforeclose handler of this window.
     */    
    handleBeforeClose: function() {
        this.updateFeature();
        if(this.feature.state === this.getDirtyState()) {
            Ext.Msg.show({
                title: this.closeMsgTitle,
                msg: this.closeMsg,
                buttons: Ext.Msg.YESNO,
                fn: function(button) {
                    if(button && button === "yes") {
                        this.un("beforeclose", this.handleBeforeClose, this);
                        this.stopEditing(false);
                        this.close();
                    } else {
                        this.fireEvent("cancelclose", this);
                    }
                },
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                animEl: this.getEl()
            });
            return false;
        } else {
            this.stopEditing(false);
        }
        return true;
    },
    
    /** private: method[handleStoreException]
     *  Handler that shows an exception report in the wizard after an
     *  unsuccessful write that caused an exception.
     *
     *  :arg proxy: ``gxp.data.WFSProtocolProxy`` The proxy of the store.
     *  :arg type: ``String`` remote or response
     *  :arg action: ``String`` Name of the action.
     *  :arg options: ``Object`` The options for the action that were specified.
     *  :arg response: ``Object``
     */
    handleStoreException: function(proxy, type, action, options, response) {
        this.attributeForm.hide();
        this.metadataForm.hide();
        this.nextButton.hide();
        this.previousButton.show();
        if (this.exceptionPanel !== null) {
            this.remove(this.exceptionPanel);
        }
        this.exceptionPanel = new Editor.ExceptionPanel({
            padding: 5,
            border: false,
            store: this.store,
            labelWidth: 115,
            exceptionReport: response.exceptionReport
        });
        this.add(this.exceptionPanel);
        this.doLayout();
        this.correctHeight(this.exceptionPanel);
    },
    
    /** private: method[handleStoreWrite]
     *  Handler that closes the wizard popup after a successful write that
     *  resolves an exception
     */
    handleStoreWrite: function() {
        this.un("beforeclose", this.handleBeforeClose, this);
        this.close();
    },
        
    /** private: method[getDirtyState]
     *  Get the appropriate OpenLayers.State value to indicate a dirty feature.
     *  We don't cache this value because the popup may remain open through
     *  several state changes.
     *
     * :returns: ``OpenLayers.State``
     */
    getDirtyState: function() {
        return this.feature.state === OpenLayers.State.INSERT ?
            this.feature.state : OpenLayers.State.UPDATE;
    },
    
    /** private: method[startEditing]
     *  Starts the editing process using the ModifyFeature Control.
     */
    startEditing: function() {
        this.geometry = this.feature.geometry.clone();
        this.attributes = Ext.apply({}, this.feature.attributes);

        this.modifyControl = new OpenLayers.Control.ModifyFeature(
            this.feature.layer,
            {standalone: true, vertexRenderIntent: this.vertexRenderIntent}
        );
        this.feature.layer.map.addControl(this.modifyControl);
        this.modifyControl.activate();
        this.modifyControl.selectFeature(this.feature);
    },

    /** private: method[updateFeature]
     *  Update the feature from the attribute form values.
     */    
    updateFeature: function() {
        var feature = this.feature;
        var fields = this.attributeForm.getForm().items;
        var modified = false;
        fields.each(function(f) {
            if (f.isDirty()) {
                modified = true;
                var value = f.getValue();
                // set original value so that the next time the field is not dirty
                f.originalValue = value;
                feature.attributes[f.getName()] = value;
            }
        });
        if (modified) {
            this.setFeatureState(this.getDirtyState());
        }
    },
    
    /** private: method[stopEditing]
     *  Stop the editing process.
     *
     *  :arg save: ``Boolean`` If set to true, changes will be saved and the
     *      ``featuremodified`` event will be fired.
     */
    stopEditing: function(save) {
        if (save) {
            this.updateFeature();
        }
        
        //TODO remove the line below when
        // http://trac.openlayers.org/ticket/2210 is fixed.
        this.modifyControl.deactivate();
        this.modifyControl.destroy();
        
        var feature = this.feature;
        if (feature.state === this.getDirtyState()) {
            if (save === true) {
                //TODO When http://trac.osgeo.org/openlayers/ticket/3131
                // is resolved, remove the if clause below
                if (this.schema) {
                    var attribute, rec;
                    for (var i in feature.attributes) {
                        rec = this.schema.getAt(this.schema.findExact("name", i));
                        attribute = feature.attributes[i];
                        if (attribute instanceof Date) {
                            var type = rec.get("type").split(":").pop();
                            feature.attributes[i] = attribute.format(
                                type == "date" ? "Y-m-d" : "c");
                        }
                    }
                }
                this.fireEvent("featuremodified", this, feature);
            } else if(feature.state === OpenLayers.State.INSERT) {
                this.editing = false;
                feature.layer.destroyFeatures([feature]);
                this.fireEvent("canceledit", this, null);
            } else {
                var layer = feature.layer;
                layer.drawFeature(feature, {display: "none"});
                feature.geometry = this.geometry;
                feature.attributes = this.attributes;
                this.setFeatureState(null);
                layer.drawFeature(feature);
                this.fireEvent("canceledit", this, feature);
            }
        }
    },

    /** private: method[preDeleteFeature]
     *  Handler for the delete button. Hide appropriate elements and show
     *  the button that will handle the actual delete process.
     */    
    preDeleteFeature: function() {
        if (this.feature.state == OpenLayers.State.INSERT) {
            this.close();
        } else {
            this.attributeForm.hide();
            this.metadataForm.deleteLabel.show();
            this.metadataForm.show();
            this.nextButton.hide();
            this.saveButton.hide();
            this.deleteButton.hide();
            this.previousButton.hide();
            this.postDeleteButton.show();
            this.correctHeight(this.metadataForm);
        }
    },

    /** private: method[deleteFeature]
     *  Actually delete the feature.
     */
    deleteFeature: function() {
        if (!Editor.metadataRecord) {
            this.metadataForm.saveEntry();
        } else {
            this.setFeatureState(OpenLayers.State.DELETE);
            this.fireEvent("featuremodified", this, this.feature);
        }
    },
    
    /** private: method[setFeatureState]
     *  Set the state of this popup's feature and trigger a featuremodified
     *  event on the feature's layer.
     *
     *  :arg state: ``OpenLayers.State``
     */
    setFeatureState: function(state) {
        this.feature.state = state;
        var layer = this.feature.layer;
        if (layer) {
            layer.events.triggerEvent("featuremodified", {
                feature: this.feature
            });
        }
    }

});

/** api: xtype = app_featureeditwizard */
Ext.reg('app_featureeditwizard', Editor.FeatureEditWizard);
