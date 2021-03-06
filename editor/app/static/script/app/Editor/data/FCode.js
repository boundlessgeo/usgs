/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/**
 * @requires Editor.js
 */
Ext.namespace("Editor");

/**
 * api: property[Editor.fCodeDict]
 * ``Object``
 * A code list mapping FCODE values to their respective descriptions.
 */
Editor.fCodeDict = {
    '30700':'Area to be Submerged',
    '31200':'Bay/Inlet',
    '31800':'Bridge',
    '33400':'Connector',
    '33600':'Canal/Ditch',
    '33601':'Canal/Ditch: Canal/Ditch Type = Aqueduct',
    '33603':'Canal Ditch: Canal Ditch Type = Stormwater',
    '34300':'Dam/Weir',
    '34305':'Dam/Weir: Construction Material = Earthen',
    '34306':'Dam/Weir: Construction Material = Nonearthen',
    '36100':'Playa',
    '36200':'Flume',
    '36400':'Foreshore',
    '36700':'Gaging Station',
    '36900':'Gate',
    '37300':'Hazard Zone',
    '37800':'Ice Mass',
    '39000':'Lake/Pond',
    '39001':'Lake/Pond: Hydrographic Category = Intermittent',
    '39004':'Lake/Pond: Hydrographic Category = Perennial',
    '39005':'Lake/Pond: Hydrographic Category = Intermittent; Stage = High Water Elevation',
    '39006':'Lake/Pond: Hydrographic Category = Intermittent; Stage = Date of Photography',
    '39009':'Lake/Pond: Hydrographic Category = Perennial; Stage = Average Water Elevation',
    '39010':'Lake/Pond: Hydrographic Category = Perennial; Stage = Normal Pool',
    '39011':'Lake/Pond: Hydrographic Category = Perennial; Stage = Date of Photography',
    '39012':'Lake/Pond: Hydrographic Category = Perennial; Stage = Spillway Elevation',
    '39800':'Lock Chamber',
    '40300':'Inundation Area',
    '40307':'Inundation Area: Inundation Control Status = Not Controlled',
    '40308':'Inundation Area: Inundation Control Status = Controlled',
    '40309':'Inundation Area: Inundation Control Status = Controlled; Stage = Flood Elevation',
    '41100':'Nonearthen Shore',
    '42000':'Underground Conduit',
    '42001':'Underground Conduit: Positional Accuracy = Definite',
    '42002':'Underground Conduit: Positional Accuracy = Indefinite',
    '42003':'Underground Conduit: Positional Accuracy = Approximate',
    '42800':'Pipeline',
    '42801':'Pipeline: Pipeline Type = Aqueduct; Relationship to Surface = At or Near',
    '42802':'Pipeline: Pipeline Type = Aqueduct; Relationship to Surface = Elevated',
    '42803':'Pipeline: Pipeline Type = Aqueduct; Relationship to Surface = Underground',
    '42804':'Pipeline: Pipeline Type = Aqueduct; Relationship to Surface = Underwater',
    '42805':'Pipeline: Pipeline Type = General Case; Relationship to Surface = At or Near',
    '42806':'Pipeline: Pipeline Type = General Case; Relationship to Surface = Elevated',
    '42807':'Pipeline: Pipeline Type = General Case; Relationship to Surface = Underground',
    '42808':'Pipeline: Pipeline Type = General Case; Relationship to Surface = Underwater',
    '42809':'Pipeline: Pipeline Type = Penstock; Relationship to Surface = At or Near',
    '42810':'Pipeline: Pipeline Type = Penstock; Relationship to Surface = Elevated',
    '42811':'Pipeline: Pipeline Type = Penstock; Relationship to Surface = Underground',
    '42812':'Pipeline: Pipeline Type = Penstock; Relationship to Surface = Underwater',
    '42813':'Pipeline: Pipeline Type = Siphon',
    '42814':'Pipeline: Pipeline Type = General Case',
    '42815':'Pipeline: Pipeline Type = Penstock',
    '42816':'Pipeline: Pipeline Type = Aqueduct',
    '42820':'Pipeline: Pipeline Type = Stormwater',
    '42821':'Pipeline: Pipeline Type = Stormwater; Relationship to Surface = At or Near',
    '42822':'Pipeline: Pipeline Type = Stormwater; Relationship to Surface = Elevated',
    '42823':'Pipeline: Pipeline Type = Stormwater; Relationship to Surface = Underground',
    '42824':'Pipeline: Pipeline Type = Stormwater; Relationship to Surface = Underwater',
    '43100':'Rapids',
    '43400':'Reef',
    '43600':'Reservoir',
    '43601':'Reservoir: Reservoir Type = Aquaculture',
    '43603':'Reservoir: Reservoir Type = Decorative Pool',
    '43604':'Reservoir: Reservoir Type = Tailings Pond; Construction Material = Earthen',
    '43605':'Reservoir: Reservoir Type = Tailings Pond',
    '43606':'Reservoir: Reservoir Type = Disposal',
    '43607':'Reservoir: Reservoir Type = Evaporator',
    '43608':'Reservoir: Reservoir Type = Swimming Pool',
    '43609':'Reservoir: Reservoir Type = Cooling Pond',
    '43610':'Reservoir: Reservoir Type = Filtration Pond',
    '43611':'Reservoir: Reservoir Type = Settling Pond',
    '43612':'Reservoir: Reservoir Type = Sewage Treatment Pond',
    '43613':'Reservoir: Reservoir Type = Water Storage; Construction Material = Nonearthen',
    '43614':'Reservoir: Reservoir Type = Water Storage; Construction Material = Earthen; Hydrographic Category = Intermittent',
    '43615':'Reservoir: Reservoir Type = Water Storage; Construction Material = Earthen; Hydrographic Category = Perennial',
    '43617':'Reservoir: Reservoir Type = Water Storage',
    '43618':'Reservoir: Construction Material = Earthen',
    '43619':'Reservoir: Construction Material = Nonearthen',
    '43621':'Reservoir: Reservoir Type = Water Storage; Hydrographic Category = Perennial',
    '43623':'Reservoir: Reservoir Type = Evaporator; Construction Material = Earthen',
    '43624':'Reservoir: Reservoir Type = Treatment',
    '43625':'Reservoir: Reservoir Type = Disposal; Construction Material = Earthen',
    '43626':'Reservoir: Reservoir Type = Disposal; Construction Material = Nonearthen',
    '44100':'Rock',
    '44101':'Rock: Relationship to Surface = Abovewater',
    '44102':'Rock: Relationship to Surface = Underwater',
    '44500':'Sea/Ocean',
    '45000':'Sink/Rise',
    '45400':'Special Use Zone',
    '45401':'Special Use Zone: Special Use Zone Type = Dump Site; Operational Status = Operational',
    '45402':'Special Use Zone: Special Use Zone Type = Dump Site; Operational Status = Abandoned',
    '45403':'Special Use Zone: Special Use Zone Type = Spoil Area; Operational Status = Operational',
    '45404':'Special Use Zone: Special Use Zone Type = Spoil Area; Operational Status = Abandoned',
    '45500':'Spillway',
    '45800':'Spring/Seep',
    '46000':'Stream/River',
    '46003':'Stream/River: Hydrographic Category = Intermittent',
    '46006':'Stream/River: Hydrographic Category = Perennial',
    '46007':'Stream/River: Hydrographic Category = Ephemeral',
    '46100':'Submerged Stream',
    '46600':'Swamp/Marsh',
    '46601':'Swamp/Marsh: Hydrographic Category = Intermittent',
    '46602':'Swamp/Marsh: Hydrographic Category = Perennial',
    '47800':'Tunnel',
    '48300':'Wall',
    '48400':'Wash',
    '48500':'Water Intake/Outflow',
    '48700':'Waterfall',
    '48800':'Well',
    '49300':'Estuary',
    '50300':'Sounding Datum Line',
    '50301':'Sounding Datum Line: Positional Accuracy = Approximate',
    '50302':'Sounding Datum Line: Positional Accuracy = Definite',
    '53300':'Special Use Zone Limit',
    '53301':'Special Use Zone Limit: Positional Accuracy = Definite',
    '53302':'Special Use Zone Limit: Positional Accuracy = Indefinite',
    '53700':'Area of Complex Channels',
    '55800':'Artificial Path',
    '56600':'Coastline',
    '56700':'Shoreline',
    '56800':'Levee',
    '70100':'Agriculture or Livestock Structure',
    '70101':'Agricultural Experimental Station',
    '70102':'Food Industry Facility',
    '70103':'Bakery (Regional)',
    '70104':'Beverage Bottling Plant',
    '70106':'Brewery / Distillery / Winery',
    '70108':'Cannery',
    '70110':'Corral',
    '70112':'Dairy',
    '70114':'Farm / Ranch',
    '70116':'Feedlot',
    '70118':'Food Distribution Center',
    '70120':'Fish Farm / Hatchery',
    '70121':'Fish Ladder',
    '70122':'Grain Elevator',
    '70124':'Grain Mill',
    '70126':'Greenhouse / Nursery',
    '70128':'Livestock Complex',
    '70130':'Meat Processing / Packaging Facility',
    '70132':'Stockyard / Feedlot',
    '70134':'Veterinary Hospital Transportation Facilities  / Clinic',
    '79000':'Building General',
    '79002':'Mobile Home Park',
    '79004':'Multi-Family Dwelling',
    '79006':'Single-Family Dwelling',
    '79008':'Institutional Residence / Dorm / Barracks',
    '76000':'Banking and Finance',
    '76004':'Bank',
    '76006':'Bullion Repository',
    '76008':'Check Clearing Center',
    '76010':'Commodities Exchange',
    '76012':'Federal Reserve Bank / Branch',
    '76014':'Financial Processing Center',
    '76016':'Financial Services Company',
    '76018':'Investment / Brokerage Center',
    '76020':'Insurance and Finance Center',
    '76022':'Stock Exchange',
    '76024':'US Mint / Bureau of Engraving and Printing',
    '72000':'Commercial or Retail Facility',
    '72002':'Corporate Headquarters',
    '72004':'Gas Station',
    '72006':'Grocery Store',
    '72008':'Hotel / Motel',
    '72010':'Shopping Mall / Complex',
    '72012':'Warehouse (Retail / Wholesale)',
    '73000':'Education Facility',
    '73002':'School',
    '73003':'School:  Elementary',
    '73004':'School:  Middle School',
    '73005':'School:  High School',
    '73006':'College / University',
    '74000':'Emergency Response or Law Enforcement Facility',
    '74001':'Ambulance Service',
    '74002':'American Red Cross Facility',
    '74004':'Border Patrol',
    '74006':'Bureau of Alcohol, Tobacco, and Firearms',
    '74008':'Civil Defense',
    '74010':'Coast Guard',
    '74012':'Customs Service',
    '74014':'Department of Justice',
    '74016':'Drug Enforcement Agency',
    '74017':'Emergency Response Facility',
    '74018':'Federal Bureau of Investigation',
    '74020':'Federal Emergency Management Agency',
    '74022':'Fire Equipment Manufacturer',
    '74024':'Fire Hydrant',
    '74026':'Fire Station / EMS Station',
    '74028':'Fire Training Facility / Academy',
    '74030':'Immigration and Naturalization Service',
    '74032':'Marshal Service',
    '74034':'Law Enforcement',
    '74036':'Prison / Correctional Facility',
    '74037':'Public Safety Office',
    '74038':'Search and Rescue Office / Facility',
    '74040':'Secret Service',
    '74042':'Transportation Safety Board',
    '74044':'Office of Emergency Management',
    '75000':'Energy Facility',
    '75002':'Energy Distribution Control Facility',
    '75004':'Natural Gas Facility',
    '75006':'Nuclear Fuel Plant',
    '75008':'Nuclear Research Facility',
    '75009':'Nuclear Waste Processing / Storage Facility',
    '75010':'Nuclear Weapons Plant',
    '75012':'Oil / Gas Facility',
    '75014':'Oil / Gas Field',
    '75016':'Oil / Gas Well',
    '75018':'Oil / Gas Pumping Station',
    '75020':'Oil / Gas Refinery',
    '75022':'Oil / Gas Processing Plant',
    '75024':'Oil / Gas Storage Facility / Tank Farm',
    '75026':'POL Storage Tank',
    '75028':'Strategic Petroleum Reserve',
    '75030':'Electric Facility',
    '75032':'Hydroelectric Facility',
    '75034':'Nuclear Facility',
    '75036':'Solar Facility',
    '75038':'Substation',
    '75039':'Coal Facility',
    '75040':'Wind Facility',
    '75041':'Waste / Biomass Facility',
    '75042':'Tidal Facility',
    '75043':'Geothermal Facility',
    '83000':'Government and Military Facility',
    '83002':'Bureau of Land Managment Facility',
    '83004':'US Capitol',
    '83006':'State Capitol',
    '83008':'US Supreme Court',
    '83010':'State Supreme Court',
    '83011':'Court House',
    '83012':'Critical Federal Contractor Facility',
    '83014':'Department of Energy Facility',
    '83016':'Department of State Facility',
    '83018':'Deparment of Motor Vehicle Facility',
    '83020':'DoD / Military Facility',
    '83022':'Governor Residence',
    '83024':'Intelligence Facility',
    '83026':'Local Government Facility',
    '83028':'NASA Facility',
    '83030':'National Guard Armory / Base',
    '83032':'National Park Service Facility',
    '83034':'State Government Facility',
    '83036':'Tribal Government Facility',
    '83038':'US Forest Service Facility',
    '83040':'US Government Facility',
    '83042':'White House',
    '83043':'Department of Public Works',
    '83044':'City / Town Hall',
    '80000':'Health or Medical Facility',
    '80002':'Blood Bank',
    '80004':'Center for Disease Control Office',
    '80006':'Day Care Facility',
    '80008':'Diagnostic Laboratory',
    '80009':'Emergency Shelter',
    '80010':'Homeless Shelter',
    '80011':'Hospice',
    '80012':'Hospital / Medical Center',
    '80014':'Medical Research Laboratory',
    '80016':'Medical Stockpile Facility',
    '80018':'Morgue',
    '80020':'Mortuary / Crematory',
    '80022':'Nursing Home / Long Term Care',
    '80024':'Outpatient Clinic',
    '80026':'Pharmacy',
    '80027':'Psychiatric Facility',
    '80028':'Public Health Office',
    '80030':'Rehabilitation Center',
    '80034':'Substance Abuse Facility',
    '71000':'Industrial Facility',
    '71001':'Chemical Facility',
    '71002':'Manufacturing Facility',
    '71004':'Aircraft Manufacturing Facility',
    '71006':'Armament Manufacturing Facility',
    '71008':'Automotive Manufacturing Facility',
    '71010':'Durable / Non-Durable Goods Facility',
    '71012':'Explosives Facility',
    '71014':'Fertilizer Facility',
    '71016':'Hazardous Materials Facility',
    '71018':'Hazardous Waste Facility',
    '71020':'Household Products Facility',
    '71022':'Landfill',
    '71024':'Lumber Mill / Saw Mill',
    '71026':'Maintenance Yard',
    '71028':'Manufacturing Warehouse',
    '71030':'Mine',
    '71032':'Mine Waste Disposal Site',
    '71034':'Mine Uranium Facility',
    '71036':'Nuclear Weapons Facility',
    '71038':'Ore Processing Facility',
    '71040':'Paper / Pulp Mill',
    '71042':'Pharmaceutical Plant',
    '71044':'Semiconductor and Microchip Facility',
    '71046':'Shipyard',
    '71048':'Steel Plant',
    '71050':'Superfund Site',
    '71052':'Textile Plant',
    '88000':'Information or Communication Facility',
    '88002':'Communication Tower',
    '88004':'Data Center',
    '88006':'Internet DNS Location / Other Node',
    '88008':'Internet Metro Area Exchange / Hub',
    '88010':'Internet Service Provider',
    '88012':'Radio / TV Broadcast Facility',
    '88014':'Satellite Ground Station',
    '88016':'Telephone Facility',
    '78000':'Mail or Shipping Facility',
    '78002':'Air Shipping Hub',
    '78004':'Bulk Mail Center',
    '78006':'Post Office',
    '78008':'Private and Express Shipping Facility',
    '82000':'Public Attraction or Landmark Building',
    '82002':'Amusement / Water Park',
    '82004':'Arboretum / Botanical Garden',
    '82006':'Auditorium / Concert Hall / Theater / Opera House',
    '82008':'Campground',
    '82010':'Cemetery',
    '82011':'Community / Recreation Center',
    '82012':'Convention Center',
    '82014':'Fair / Exhibition / Rodeo Grounds',
    '82016':'Golf Course',
    '82018':'Historic Site / Point of Interest',
    '82020':'House of Worship',
    '82022':'Ice Arena',
    '82024':'Library',
    '82026':'Lighthouse / Light',
    '82028':'Lookout Tower',
    '82030':'Marina',
    '82032':'Museum',
    '82034':'National Symbol / Monument',
    '82036':'Observatory',
    '82038':'Outdoor Theater / Amphitheater',
    '82040':'Picnic Area',
    '82042':'Racetrack / Dragstrip',
    '82044':'Ski Area / Ski Resort',
    '82046':'Sports Arena / Stadium',
    '82047':'Trailhead',
    '82048':'Visitor / Information Center',
    '82050':'Zoo',
    '81000':'Transportation Facility',
    '81006':'Airport Terminal',
    '81008':'Air Support / Maintenance Facility',
    '81009':'Airport Control Tower',
    '81010':'Air Traffic Control Center / Command Center',
    '81011':'Boat Ramp / Dock',
    '81012':'Bridge',
    '81014':'Bridge: Light Rail / Subway',
    '81016':'Bridge: Railroad',
    '81018':'Bridge: Road',
    '81020':'Border Crossing / Port of Entry',
    '81022':'Bus Station / Dispatch Facility',
    '81024':'Ferry Terminal / Dispatch Facility',
    '81025':'Harbor / Marina',
    '81026':'Helipad / Heliport / Helispot',
    '81028':'Launch Facility',
    '81030':'Launch Pad',
    '81032':'Light Rail Power Substation',
    '81034':'Light Rail Station',
    '81036':'Park and Ride / Commuter Lot',
    '81038':'Parking Lot Structure / Garage',
    '81040':'Pier / Wharf / Quay / Mole',
    '81042':'Port Facility',
    '81044':'Port Facility: Commercial Port',
    '81046':'Port Facility: Crane',
    '81048':'Port Facility: Maintenance and Fuel Facility',
    '81050':'Port Facility: Modal Transfer Facility',
    '81052':'Port Facility: Passenger Terminal',
    '81054':'Port Facility: Warehouse Storage / Container Yard',
    '81056':'Railroad Facility',
    '81058':'Railroad Command / Control Facility',
    '81060':'Railroad Freight Loading Facility',
    '81062':'Railroad Maintenance / Fuel Facility',
    '81064':'Railroad Roundhouse / Turntable',
    '81066':'Railroad Station',
    '81068':'Railroad Yard',
    '81070':'Rest Stop / Roadside Park',
    '81072':'Seaplane Anchorage / Base',
    '81073':'Snowshed',
    '81074':'Subway Station',
    '81076':'Toll Booth / Plaza',
    '71078':'Truck Stop',
    '81080':'Tunnel',
    '81082':'Tunnel: Light Rail / Subway',
    '81084':'Tunnel: Road',
    '81084':'Tunnel: Railroad',
    '81088':'Weigh Station / Inspection Station',
    '85000':'Water Supply or Treatment Facility',
    '85001':'Potable Water Facility',
    '85002':'Public Water Supply Intake',
    '85004':'Public Water Supply Well',
    '85006':'Wastewater Treatment Plant',
    '85008':'Water Pumping Station',
    '85010':'Water System Control Facility',
    '85012':'Water Tank',
    '85014':'Water Tower',
    '85016':'Water Treatment Facility',
    '84000':'Weather Facility or Structure',
    '84002':'Warning Center',
    '84004':'Weather Data Center',
    '84006':'Weather Forecast Office',
    '84008':'Weather Radar Site',
    '20000':'Airport Complex',
    '20100':'Airport Runway',
    '20101':'Taxiway',
    '20102':'Apron/Hardstand',
    '20103':'Stopway',
    '20200':'Rail',
    '20201':'Rail Siding/Spur',
    '20202':'Subway',
    '20203':'Light Rail',
    '20204':'Street Car',
    '20205':'Narrow Gauge'
};

/** api: method[Editor.getFCodes]
 *  Get a list of FCODE values and their corresponding descriptions filtered 
 *  by the layer type.
 *
 *  :arg layer: ``String`` The layer to filter for, e.g. NHDFlowline
 *
 *  Returns:
 *  ``Array`` An Array containing the keys and values for FCODE matching the
 *  layer type.
 */
Editor.getFCodes = function(layer) {
    var fCodes;
    var fTypes = Editor.layerFTypes[layer];
    if (fTypes) {
        fCodes = [];
        for (var fCode in Editor.fCodeDict) {
            if (fTypes.indexOf(fCode.substring(0, 3)) >= 0) {
                fCodes.push([fCode, Editor.fCodeDict[fCode]]);
            }
        }
    }
    return fCodes;
};
