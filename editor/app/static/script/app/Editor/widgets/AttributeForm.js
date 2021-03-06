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
 * @requires Editor/data/FCode.js
 */

/** api: (define)
 *  module = Editor
 *  class = AttributeForm
 *  extends = Ext.form.FormPanel
 */

/** api: constructor
 *  .. class:: AttributeForm(config)
 *
 *    Entry form for feature types of NHD. Has special handling for adding
 *    lookup values for FType and FCode attributes.
 */
Editor.AttributeForm = Ext.extend(Ext.form.FormPanel, {

    /** api: config[feature]
     *  ``OpenLayers.Feature.Vector`` The feature for which to show the 
     *  attributes.
     */
    feature: null,

    /** api: config[schema]
     *  ``GeoExt.data.AttributeStore``
     *  The attribute store for the feature type to which feature belongs.
     */
    schema: null,

    /** api: config[autoScroll]
     *  ``Boolean` Should we automatically show scrollbars in this form?
     *  Defaults to true.
     */
    autoScroll: true,

    /** api: config[excludeFields]
     *  ``Array`` The fields not to show in this form.
     */    
    excludeFields: null,
    
    /** api: config[labelWidth]
     *  ``Number`` 
     *  Label width.  Default is 125.
     */
    labelWidth: 125,
    
    /** private: method[initComponent]
     */
    initComponent : function() {
        Editor.AttributeForm.superclass.initComponent.call(this);

        var fieldset = new Ext.form.FieldSet({
            title: "Attributes", defaults: {width: 150, anchor: '-5'}
        });

        var typeName = this.schema.reader.raw.featureTypes[0].typeName;
        var fTypeData = Editor.getFTypes(typeName);
        if (fTypeData) {
            var fTypeStore = new Ext.data.ArrayStore({
                fields: ['value', 'description'],
                data: fTypeData
            });
            var fCodeStore = new Ext.data.ArrayStore({
                fields: ['value', 'description'],
                data: Editor.getFCodes(typeName)
            });
            fCodeStore.sort("value");

            var ftype, fcode;
            this.schema.each(function(r) {
                var name = r.get("name");
                var lower = name.toLowerCase();
                if (lower === "ftype") {
                    ftype = name;
                } else if (lower === "fcode") {
                    fcode = name;
                }
            });

            // ftype field first - if it exists
            if (ftype) {
                fieldset.add({
                    xtype: "combo",
                    mode: "local",
                    forceSelection: true,
                    allowBlank: false,
                    name: ftype,
                    fieldLabel: "FType",
                    value: this.feature.attributes[ftype],
                    store: fTypeStore, 
                    triggerAction: "all",
                    displayField: "description",
                    valueField: "value",
                    listeners: {
                        valid: function(field) {
                            window.setTimeout(function() {
                                if (fCodeStore.getCount() > 0) {
                                    var value = field.getValue();
                                    fCodeStore.filterBy(function(r) {
                                        return r.get("value").indexOf(value) === 0;
                                    }, this);
                                    var fCode = field.ownerCt.fCode;
                                    if (fCodeStore.findExact("value", fCode.getValue()) == -1) {
                                        fCode.setValue(fCodeStore.getAt(0).get("value"));
                                    }
                                }
                            }, 0);
                        }
                    }
                });
            }

            // fcode field next - if it exists
            if (fcode) {
                fieldset.add({
                    xtype: "combo",
                    ref: "fCode",
                    allowBlank: false,
                    listWidth: 650,
                    mode: "local",
                    lastQuery: "",
                    forceSelection: true,
                    name: fcode,
                    fieldLabel: "FCode",
                    value: this.feature.attributes[fcode],
                    store: fCodeStore, 
                    triggerAction: "all",
                    displayField: "description",
                    valueField: "value"
                });
            }
        }
        
        // all remaining fields
        var excludeFields = [];
        for (var i=0, ii=this.excludeFields.length; i<ii; ++i) {
            excludeFields[i] = this.excludeFields[i].toLowerCase();
        }
        
        this.schema.each(function(r) {
            var name = r.get("name");
            var lower = name.toLowerCase();
            if (excludeFields.indexOf(lower) != -1 || 
                    lower == "ftype" || 
                    lower == "fcode") {
                return;
            }
            var type = r.get("type");
            if (type.match(/^[^:]*:?((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry))/)) {
                // exclude gml geometries
                return;
            }
            var fieldCfg = GeoExt.form.recordToField(r);
            fieldCfg.value = this.feature.attributes[name];
            if (fieldCfg.value && fieldCfg.xtype == "datefield") {
                var dateFormat = "Y-m-d";
                fieldCfg.format = dateFormat;
                fieldCfg.value = Date.parseDate(fieldCfg.value.replace(/Z$/, ""), dateFormat);
            }
            fieldset.add(fieldCfg);
        }, this);

        this.add(fieldset);
    }

});

Ext.reg('app_attributeform', Editor.AttributeForm);
