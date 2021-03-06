var usgs = require("../usgs");
var fidFilter = require("geoscript/filter").fids;
var catalog = require("geoserver/catalog");
var exceptions = catalog.getFeatureType(usgs.NAMESPACE_URI, "NHDExceptions");

exports.beforeCommit = function(details, request) {
    LOGGER.info("beforeCommit");
    var hints;
    try {
        hints = parseNatives(details.natives);
    } catch (err) {
        return {
            locator: "beforeCommit",
            message: err.message
        };
    }
    var featureInfos = details.PreInsert || [];
    featureInfos = featureInfos.concat(details.PostUpdate || []);
    
    var exception;
    for (var i=0, ii=featureInfos.length; i<ii; ++i) {
        exception = usgs.getFirstException(featureInfos[i], hints);
        if (exception) {
            break;
        }
    }
    return exception;
};

exports.afterTransaction = function(details, request) {
    LOGGER.info("afterTransaction");
    var hints;
    try {
        hints = parseNatives(details.natives);
    } catch (err) {
        return {
            locator: "afterTransaction",
            message: err.message
        };
    }
    var featureInfos = details.PostInsert || [];
    featureInfos = featureInfos.concat(details.PostUpdate || []);
    
    var featureInfo;
    var records = [];
    for (var i=0, ii=featureInfos.length; i<ii; ++i) {
        featureInfo = featureInfos[i];
        records = records.concat(usgs.getQueuedExceptions(featureInfo, hints));
    }
    var num = records.length;
    if (num > 0) {
        var record;
        for (var i=0; i<num; ++i) {
            record = records[i];
            record.metadataid = details.handle;
            exceptions.add(record);
            LOGGER.info("exception queued: " + record.exceptionmessage);
        }
    }
    updateQueuedExceptions();
};

function updateQueuedExceptions() {
    var removals = [];
    var fidMap = {};
    exceptions.features.forEach(function(exception) {
        var exceptionId = exception.id;
        var removed = false;
        var layer = catalog.getFeatureType(usgs.NAMESPACE_URI, exception.get("featuretype"));
        if (!layer) {
            // bogus layer name
            removals.push(exceptionId);
            removed = true;
        } else {
            var fid = exception.get("featureid");
            var code = exception.get("processid");
            var feature = layer.get(fid);
            if (!feature) {
                // feature has been deleted
                removals.push(exceptionId);
                removed = true;
            } else {
                if (fid in fidMap) {
                    var codes = fidMap[fid];
                    if (codes.indexOf(code) >= 0) {
                        // duplicate exception of this type for this feature
                        removals.push(exceptionId);
                        removed = true;
                    } else {
                        codes.push(fid);
                    }
                } else {
                    // first exception of this type for this feature
                    fidMap[fid] = [code];
                }
            }
            if (!removed) {
                // re-run the rule
                var featureInfo = {
                    feature: feature,
                    uri: usgs.NAMESPACE_URI,
                    name: layer.name
                };
                var satisfied = usgs.ruleSatisfied(code, featureInfo);
                if (satisfied) {
                    removals.push(exceptionId);
                    removed = true;
                }
            }
        }
    });
    if (removals.length > 0) {
        LOGGER.info("removing exceptions: " + removals);
        exceptions.remove(fidFilter(removals));
    }
}

/**
 * Parse content from first Native element with vendorId "usgs".  Content
 * is assumed to be a JSON string.
 */
function parseNatives(natives) {
    var el, hints = {};
    for (var i=0, ii=natives.length; i<ii; ++i) {
        el = natives[i];
        if (el.vendorId === "usgs") {
            try {
                hints = JSON.parse(el.value);
            } catch (err) {
                throw new Error("Trouble parsing <Native> element: " + el.value);
            }
            break;
        }
    }
    return hints;
};

