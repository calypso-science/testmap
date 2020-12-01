((self || window)["webpackJsonp"] = (self || window)["webpackJsonp"] || []).push([["index"],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*global require,window */

var _GoogleAnalytics = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/Core/GoogleAnalytics */ "./node_modules/terriajs/lib/Core/GoogleAnalytics.js"));

var _ShareDataService = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/Models/ShareDataService */ "./node_modules/terriajs/lib/Models/ShareDataService.js"));

var _raiseErrorToUser = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/Models/raiseErrorToUser */ "./node_modules/terriajs/lib/Models/raiseErrorToUser.js"));

var _registerAnalytics = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/Models/registerAnalytics */ "./node_modules/terriajs/lib/Models/registerAnalytics.js"));

var _registerCatalogMembers = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/Models/registerCatalogMembers */ "./node_modules/terriajs/lib/Models/registerCatalogMembers.js"));

var _registerCustomComponentTypes = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ReactViews/Custom/registerCustomComponentTypes */ "./node_modules/terriajs/lib/ReactViews/Custom/registerCustomComponentTypes.js"));

var _Terria = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/Models/Terria */ "./node_modules/terriajs/lib/Models/Terria.js"));

var _updateApplicationOnHashChange = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ViewModels/updateApplicationOnHashChange */ "./node_modules/terriajs/lib/ViewModels/updateApplicationOnHashChange.js"));

var _updateApplicationOnMessageFromParentWindow = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ViewModels/updateApplicationOnMessageFromParentWindow */ "./node_modules/terriajs/lib/ViewModels/updateApplicationOnMessageFromParentWindow.js"));

var _ViewState = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ReactViewModels/ViewState */ "./node_modules/terriajs/lib/ReactViewModels/ViewState.js"));

var _BingMapsSearchProviderViewModel = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ViewModels/BingMapsSearchProviderViewModel.js */ "./node_modules/terriajs/lib/ViewModels/BingMapsSearchProviderViewModel.js"));

var _GazetteerSearchProviderViewModel = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ViewModels/GazetteerSearchProviderViewModel.js */ "./node_modules/terriajs/lib/ViewModels/GazetteerSearchProviderViewModel.js"));

var _GnafSearchProviderViewModel = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ViewModels/GnafSearchProviderViewModel.js */ "./node_modules/terriajs/lib/ViewModels/GnafSearchProviderViewModel.js"));

var _defined = _interopRequireDefault(__webpack_require__(/*! terriajs-cesium/Source/Core/defined */ "./node_modules/terriajs-cesium/Source/Core/defined.js"));

var _render = _interopRequireDefault(__webpack_require__(/*! ./lib/Views/render */ "./lib/Views/render.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var terriaOptions = {
  baseUrl: 'build/TerriaJS'
}; // checkBrowserCompatibility('ui');

// Register all types of catalog members in the core TerriaJS.  If you only want to register a subset of them
// (i.e. to reduce the size of your application if you don't actually use them all), feel free to copy a subset of
// the code in the registerCatalogMembers function here instead.
(0, _registerCatalogMembers["default"])();
(0, _registerAnalytics["default"])();
terriaOptions.analytics = new _GoogleAnalytics["default"](); // Construct the TerriaJS application, arrange to show errors to the user, and start it up.

var terria = new _Terria["default"](terriaOptions); // Register custom components in the core TerriaJS.  If you only want to register a subset of them, or to add your own,
// insert your custom version of the code in the registerCustomComponentTypes function here instead.

(0, _registerCustomComponentTypes["default"])(terria); // Create the ViewState before terria.start so that errors have somewhere to go.

var viewState = new _ViewState["default"]({
  terria: terria
});

if (true) {
  window.viewState = viewState;
} // If we're running in dev mode, disable the built style sheet as we'll be using the webpack style loader.
// Note that if the first stylesheet stops being nationalmap.css then this will have to change.


if (false) {}

module.exports = terria.start({
  // If you don't want the user to be able to control catalog loading via the URL, remove the applicationUrl property below
  // as well as the call to "updateApplicationOnHashChange" further down.
  applicationUrl: window.location,
  configUrl: 'config.json',
  shareDataService: new _ShareDataService["default"]({
    terria: terria
  })
}).otherwise(function (e) {
  (0, _raiseErrorToUser["default"])(terria, e);
}).always(function () {
  try {
    viewState.searchState.locationSearchProviders = [new _BingMapsSearchProviderViewModel["default"]({
      terria: terria,
      key: terria.configParameters.bingMapsKey
    }), new _GazetteerSearchProviderViewModel["default"]({
      terria: terria
    }), new _GnafSearchProviderViewModel["default"]({
      terria: terria
    })]; // Automatically update Terria (load new catalogs, etc.) when the hash part of the URL changes.

    (0, _updateApplicationOnHashChange["default"])(terria, window);
    (0, _updateApplicationOnMessageFromParentWindow["default"])(terria, window); // Create the various base map options.

    var createUSBaseMapOptions = __webpack_require__(/*! ./lib/ViewModels/createUSBaseMapOptions */ "./lib/ViewModels/createUSBaseMapOptions.js");

    var createGlobalBaseMapOptions = __webpack_require__(/*! ./lib/ViewModels/createGlobalBaseMapOptions */ "./lib/ViewModels/createGlobalBaseMapOptions.js");

    var selectBaseMap = __webpack_require__(/*! ./lib/ViewModels/selectBaseMap */ "./lib/ViewModels/selectBaseMap.js");

    var usBaseMaps = createUSBaseMapOptions(terria);
    var globalBaseMaps = createGlobalBaseMapOptions(terria, terria.configParameters.bingMapsKey);
    var allBaseMaps = usBaseMaps.concat(globalBaseMaps);
    selectBaseMap(terria, allBaseMaps, 'Bing Maps Aerial', false); // Show a modal disclaimer before user can do anything else.

    if ((0, _defined["default"])(terria.configParameters.globalDisclaimer)) {
      var globalDisclaimer = terria.configParameters.globalDisclaimer;
      var hostname = window.location.hostname;

      if (globalDisclaimer.enableOnLocalhost || hostname.indexOf('localhost') === -1) {
        var message = ''; // Sometimes we want to show a preamble if the user is viewing a site other than the official production instance.
        // This can be expressed as a devHostRegex ("any site starting with staging.") or a negative prodHostRegex ("any site not ending in .gov.au")

        if ((0, _defined["default"])(globalDisclaimer.devHostRegex) && hostname.match(globalDisclaimer.devHostRegex) || (0, _defined["default"])(globalDisclaimer.prodHostRegex) && !hostname.match(globalDisclaimer.prodHostRegex)) {
          message += __webpack_require__(/*! ./lib/Views/DevelopmentDisclaimerPreamble.html */ "./lib/Views/DevelopmentDisclaimerPreamble.html");
        }

        message += __webpack_require__(/*! ./lib/Views/GlobalDisclaimer.html */ "./lib/Views/GlobalDisclaimer.html");
        var options = {
          title: globalDisclaimer.title !== undefined ? globalDisclaimer.title : 'Warning',
          confirmText: globalDisclaimer.buttonTitle || "Ok",
          width: 600,
          height: 550,
          message: message,
          horizontalPadding: 100
        };
        viewState.notifications.push(options);
      }
    } // Update the ViewState based on Terria config parameters.
    // Note: won't do anything unless terriajs version is >7.9.0


    if ((0, _defined["default"])(viewState.afterTerriaStarted)) {
      viewState.afterTerriaStarted();
    }

    (0, _render["default"])(terria, allBaseMaps, viewState);
  } catch (e) {
    console.error(e);
    console.error(e.stack);
  }
});

/***/ }),

/***/ "./lib/ViewModels/createBingBaseMapOptions.js":
/*!****************************************************!*\
  !*** ./lib/ViewModels/createBingBaseMapOptions.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*global require*/

var BaseMapViewModel = __webpack_require__(/*! terriajs/lib/ViewModels/BaseMapViewModel */ "./node_modules/terriajs/lib/ViewModels/BaseMapViewModel.js");

var BingMapsCatalogItem = __webpack_require__(/*! terriajs/lib/Models/BingMapsCatalogItem */ "./node_modules/terriajs/lib/Models/BingMapsCatalogItem.js");

var BingMapsStyle = __webpack_require__(/*! terriajs-cesium/Source/Scene/BingMapsStyle */ "./node_modules/terriajs-cesium/Source/Scene/BingMapsStyle.js")["default"];

var IonImageryCatalogItem = __webpack_require__(/*! terriajs/lib/Models/IonImageryCatalogItem */ "./node_modules/terriajs/lib/Models/IonImageryCatalogItem.js");

var IonWorldImageryStyle = __webpack_require__(/*! terriajs-cesium/Source/Scene/IonWorldImageryStyle */ "./node_modules/terriajs-cesium/Source/Scene/IonWorldImageryStyle.js")["default"];

function createBingBaseMapOptions(terria, bingMapsKey) {
  var result = [];
  var bingMapsAerialWithLabels;
  var bingMapsAerial;
  var bingMapsRoads;

  if (bingMapsKey && terria.configParameters.useCesiumIonBingImagery !== true) {
    bingMapsAerialWithLabels = new BingMapsCatalogItem(terria);
    bingMapsAerialWithLabels.mapStyle = BingMapsStyle.AERIAL_WITH_LABELS_ON_DEMAND;
    bingMapsAerialWithLabels.key = bingMapsKey;
    bingMapsAerial = new BingMapsCatalogItem(terria);
    bingMapsAerial.mapStyle = BingMapsStyle.AERIAL;
    bingMapsAerial.key = bingMapsKey;
    bingMapsRoads = new BingMapsCatalogItem(terria);
    bingMapsRoads.mapStyle = BingMapsStyle.ROAD_ON_DEMAND;
    bingMapsRoads.key = bingMapsKey;
  } else if (terria.configParameters.useCesiumIonBingImagery !== false) {
    bingMapsAerialWithLabels = new IonImageryCatalogItem(terria);
    bingMapsAerialWithLabels.ionAssetId = IonWorldImageryStyle.AERIAL_WITH_LABELS_ON_DEMAND;
    bingMapsAerial = new IonImageryCatalogItem(terria);
    bingMapsAerial.ionAssetId = IonWorldImageryStyle.AERIAL;
    bingMapsRoads = new IonImageryCatalogItem(terria);
    bingMapsRoads.ionAssetId = IonWorldImageryStyle.ROAD_ON_DEMAND;
  } else {
    // Disable the Bing Maps layers entirely.
    return result;
  }

  bingMapsAerialWithLabels.name = "Bing Maps Aerial with Labels";
  bingMapsAerialWithLabels.opacity = 1.0;
  bingMapsAerialWithLabels.isRequiredForRendering = true;
  result.push(new BaseMapViewModel({
    image: __webpack_require__(/*! ../../wwwroot/images/bing-aerial-labels.png */ "./wwwroot/images/bing-aerial-labels.png"),
    catalogItem: bingMapsAerialWithLabels
  }));
  bingMapsAerial.name = "Bing Maps Aerial";
  bingMapsAerial.opacity = 1.0;
  bingMapsAerial.isRequiredForRendering = true;
  result.push(new BaseMapViewModel({
    image: __webpack_require__(/*! ../../wwwroot/images/bing-aerial.png */ "./wwwroot/images/bing-aerial.png"),
    catalogItem: bingMapsAerial
  }));
  bingMapsRoads.name = "Bing Maps Roads";
  bingMapsRoads.opacity = 1.0;
  bingMapsRoads.isRequiredForRendering = true;
  result.push(new BaseMapViewModel({
    image: __webpack_require__(/*! ../../wwwroot/images/bing-maps-roads.png */ "./wwwroot/images/bing-maps-roads.png"),
    catalogItem: bingMapsRoads,
    contrastColor: "#000000"
  }));
  return result;
}

module.exports = createBingBaseMapOptions;

/***/ }),

/***/ "./lib/ViewModels/createGlobalBaseMapOptions.js":
/*!******************************************************!*\
  !*** ./lib/ViewModels/createGlobalBaseMapOptions.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*global require*/

var createBingBaseMapOptions = __webpack_require__(/*! ./createBingBaseMapOptions */ "./lib/ViewModels/createBingBaseMapOptions.js");

var BaseMapViewModel = __webpack_require__(/*! terriajs/lib/ViewModels/BaseMapViewModel */ "./node_modules/terriajs/lib/ViewModels/BaseMapViewModel.js");

var WebMapServiceCatalogItem = __webpack_require__(/*! terriajs/lib/Models/WebMapServiceCatalogItem */ "./node_modules/terriajs/lib/Models/WebMapServiceCatalogItem.js");

var OpenStreetMapCatalogItem = __webpack_require__(/*! terriajs/lib/Models/OpenStreetMapCatalogItem */ "./node_modules/terriajs/lib/Models/OpenStreetMapCatalogItem.js");

var createGlobalBaseMapOptions = function createGlobalBaseMapOptions(terria, bingMapsKey) {
  var result = createBingBaseMapOptions(terria, bingMapsKey);
  var naturalEarthII = new WebMapServiceCatalogItem(terria);
  naturalEarthII.name = "Natural Earth II";
  naturalEarthII.url = "http://geoserver.nationalmap.nicta.com.au/imagery/natural-earth-ii/wms";
  naturalEarthII.layers = "natural-earth-ii:NE2_HR_LC_SR_W_DR";
  naturalEarthII.parameters = {
    tiled: true
  };
  naturalEarthII.opacity = 1.0;
  naturalEarthII.isRequiredForRendering = true;
  result.push(new BaseMapViewModel({
    image: __webpack_require__(/*! ../../wwwroot/images/natural-earth.png */ "./wwwroot/images/natural-earth.png"),
    catalogItem: naturalEarthII
  }));
  var blackMarble = new WebMapServiceCatalogItem(terria);
  blackMarble.name = "NASA Black Marble";
  blackMarble.url = "http://geoserver.nationalmap.nicta.com.au/imagery/nasa-black-marble/wms";
  blackMarble.layers = "nasa-black-marble:dnb_land_ocean_ice.2012.54000x27000_geo";
  blackMarble.parameters = {
    tiled: true
  };
  blackMarble.opacity = 1.0;
  blackMarble.isRequiredForRendering = true;
  result.push(new BaseMapViewModel({
    image: __webpack_require__(/*! ../../wwwroot/images/black-marble.png */ "./wwwroot/images/black-marble.png"),
    catalogItem: blackMarble
  }));
  var positron = new OpenStreetMapCatalogItem(terria);
  positron.name = "Positron (Light)";
  positron.url = "https://global.ssl.fastly.net/light_all/"; // https://cartodb.com/basemaps/ gives two different attribution strings. In any case HTML gets swallowed, so we have to adapt.
  // 1 "&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy;
  //   <a href="http://cartodb.com/attributions">CartoDB</a>"
  // 2 Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">
  //   CC BY 3.0</a>. Data by <a href="http://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.

  positron.attribution = "© OpenStreetMap contributors ODbL, © CartoDB CC-BY 3.0";
  positron.opacity = 1.0;
  positron.subdomains = ["cartodb-basemaps-a", "cartodb-basemaps-b", "cartodb-basemaps-c", "cartodb-basemaps-d"];
  result.push(new BaseMapViewModel({
    image: __webpack_require__(/*! ../../wwwroot/images/positron.png */ "./wwwroot/images/positron.png"),
    catalogItem: positron,
    contrastColor: "#000000"
  }));
  var darkMatter = new OpenStreetMapCatalogItem(terria);
  darkMatter.name = "Dark Matter";
  darkMatter.url = "https://global.ssl.fastly.net/dark_all/";
  darkMatter.attribution = "© OpenStreetMap contributors ODbL, © CartoDB CC-BY 3.0";
  darkMatter.opacity = 1.0;
  darkMatter.subdomains = ["cartodb-basemaps-a", "cartodb-basemaps-b", "cartodb-basemaps-c", "cartodb-basemaps-d"];
  result.push(new BaseMapViewModel({
    image: __webpack_require__(/*! ../../wwwroot/images/dark-matter.png */ "./wwwroot/images/dark-matter.png"),
    catalogItem: darkMatter
  }));
  return result;
};

module.exports = createGlobalBaseMapOptions;

/***/ }),

/***/ "./lib/ViewModels/createUSBaseMapOptions.js":
/*!**************************************************!*\
  !*** ./lib/ViewModels/createUSBaseMapOptions.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*global require*/

var ArcGisMapServerCatalogItem = __webpack_require__(/*! terriajs/lib/Models/ArcGisMapServerCatalogItem */ "./node_modules/terriajs/lib/Models/ArcGisMapServerCatalogItem.js");

var BaseMapViewModel = __webpack_require__(/*! terriajs/lib/ViewModels/BaseMapViewModel */ "./node_modules/terriajs/lib/ViewModels/BaseMapViewModel.js");

var createUSBaseMapOptions = function createUSBaseMapOptions(terria) {
  var result = [];
  var usaTopo = new ArcGisMapServerCatalogItem(terria);
  usaTopo.url = 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer';
  usaTopo.opacity = 1.0;
  usaTopo.isRequiredForRendering = true;
  usaTopo.name = 'USA Topography';
  usaTopo.allowFeaturePicking = false;
  result.push(new BaseMapViewModel({
    image: __webpack_require__(/*! ../../wwwroot/images/usa-topo.png */ "./wwwroot/images/usa-topo.png"),
    catalogItem: usaTopo,
    contrastColor: '#000000'
  }));
  return result;
};

module.exports = createUSBaseMapOptions;

/***/ }),

/***/ "./lib/ViewModels/selectBaseMap.js":
/*!*****************************************!*\
  !*** ./lib/ViewModels/selectBaseMap.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*global require*/

var defined = __webpack_require__(/*! terriajs-cesium/Source/Core/defined */ "./node_modules/terriajs-cesium/Source/Core/defined.js")["default"];

var knockout = __webpack_require__(/*! terriajs-cesium/Source/ThirdParty/knockout */ "./node_modules/terriajs-cesium/Source/ThirdParty/knockout.js")["default"];
/**
 * Selects a base map by name from a list of base map options.  The name is specified by `terria.baseMapName`, or,
 * if that property is undefined, by the specified `defaultBaseMapName`.  In addition to setting `terria.baseMap`,
 * this function subscribes to be notified when `terria.baseMapName` changes and updates `terria.baseMap`
 * accordingly.  If a base map with the name is not in the `baseMaps` list, this method leaves the
 * `terria.baseMap` property unmodified.
 *
 * @param {Terria} terria The TerriaJS application.
 * @param {BaseMapViewModel[]} baseMaps The list of possible base maps.
 * @param {string} defaultBaseMapName The name of the base map to search for.
 * @param {boolean} useStoredPreference If true, look for and use a localStorage preference instead.
 * @returns {BaseMapViewModel} The matching base map, or undefined if not found.
 */


var selectBaseMap = function selectBaseMap(terria, baseMaps, defaultBaseMapName, useStoredPreference) {
  function updateBaseMap(baseMapName) {
    if (!defined(baseMapName)) {
      return undefined;
    }

    for (var i = 0; i < baseMaps.length; ++i) {
      if (baseMaps[i].catalogItem.name === baseMapName) {
        terria.baseMap = baseMaps[i].catalogItem;
        terria.baseMapContrastColor = baseMaps[i].contrastColor;
        return terria.baseMap;
      }
    }

    return undefined;
  }

  knockout.getObservable(terria, 'baseMapName').subscribe(function () {
    updateBaseMap(terria.baseMapName);
  });

  if (baseMaps.length === 0) {
    return undefined;
  }

  var baseMap;

  if (useStoredPreference) {
    baseMap = updateBaseMap(terria.getLocalProperty('basemap'));
  }

  baseMap = baseMap || updateBaseMap(terria.baseMapName) || updateBaseMap(defaultBaseMapName) || updateBaseMap(baseMaps[0].catalogItem.name);
  return baseMap;
};

module.exports = selectBaseMap;

/***/ }),

/***/ "./lib/Views/DevelopmentDisclaimerPreamble.html":
/*!******************************************************!*\
  !*** ./lib/Views/DevelopmentDisclaimerPreamble.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"border:1px solid red; background:hsla(0,50%,50%,0.2); padding: 0.5em;\">\n<h2>Development site</h2>\n<p>You are viewing a site other than the official production site. It may not operate as you expect.</p>\n</div>\n"

/***/ }),

/***/ "./lib/Views/GlobalDisclaimer.html":
/*!*****************************************!*\
  !*** ./lib/Views/GlobalDisclaimer.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n<p>The suggestions and illustrations included in this map are intended for scientific research; however, they do not guarantee the safety of an individual or structure. The contributors and sponsors of this product do not assume liability for any injury, death, property damage, or other effects because of using tihs map. Any use of trade, firm, or product names is for descriptive purposes only and does not imply endorsement by the U.S. Government. This map must not be used for navigation or precise spatial analysis.\n</div>\n"

/***/ }),

/***/ "./lib/Views/RelatedMaps.jsx":
/*!***********************************!*\
  !*** ./lib/Views/RelatedMaps.jsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _MenuPanel = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx */ "./node_modules/terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuPanel.jsx"));

var _panel = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ReactViews/Map/Panels/panel.scss */ "./node_modules/terriajs/lib/ReactViews/Map/Panels/panel.scss"));

var _relatedMaps = _interopRequireDefault(__webpack_require__(/*! ./related-maps.scss */ "./lib/Views/related-maps.scss"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function RelatedMaps(props) {
  var dropdownTheme = {
    inner: _relatedMaps["default"].dropdownInner,
    icon: "gallery"
  };
  return _react["default"].createElement(_MenuPanel["default"], {
    theme: dropdownTheme,
    btnText: "Related Maps",
    smallScreen: props.smallScreen,
    viewState: props.viewState,
    btnTitle: "See related maps"
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_panel["default"].header)
  }, _react["default"].createElement("label", {
    className: _panel["default"].heading
  }, "Related Maps")), _react["default"].createElement("p", null, "Clicking on a map below will open it in a separate window or tab."), _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_panel["default"].section, _relatedMaps["default"].section)
  }, _react["default"].createElement("a", {
    target: "_blank",
    href: "http://nationalmap.gov.au/renewables/"
  }, _react["default"].createElement("img", {
    className: _relatedMaps["default"].image,
    src: __webpack_require__(/*! ../../wwwroot/images/aremi.jpg */ "./wwwroot/images/aremi.jpg"),
    alt: "AREMI"
  })), _react["default"].createElement("a", {
    target: "_blank",
    className: _relatedMaps["default"].link,
    href: "http://nationalmap.gov.au/renewables/"
  }, "AREMI"), _react["default"].createElement("p", null, "AREMI provides access to Australian spatial data relevant to the Renewable Energy industry, sourced from Government, Industry and Research.")), _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_panel["default"].section, _relatedMaps["default"].section)
  }, _react["default"].createElement("a", {
    target: "_blank",
    href: "http://nationalmap.gov.au/northernaustralia/"
  }, _react["default"].createElement("img", {
    className: _relatedMaps["default"].image,
    src: __webpack_require__(/*! ../../wwwroot/images/northernaustralia.jpg */ "./wwwroot/images/northernaustralia.jpg"),
    alt: "Northern Australia"
  })), _react["default"].createElement("a", {
    target: "_blank",
    className: _relatedMaps["default"].link,
    href: "http://nationalmap.gov.au/northernaustralia/"
  }, "Northern Australia"), _react["default"].createElement("p", null, "The Northern Australia NationalMap forms part of the Government's commitment to developing northern Australia by providing easy access to authoritative and other spatial data on northern Australia to governments, business and the public. More information on the Government's White Paper on Developing Northern Australia is available here:", " ", _react["default"].createElement("a", {
    target: "_blank",
    className: _relatedMaps["default"].link,
    href: "https://northernaustralia.dpmc.gov.au"
  }, "https://northernaustralia.dpmc.gov.au"), ".")), _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_panel["default"].section, _relatedMaps["default"].section)
  }, _react["default"].createElement("a", {
    target: "_blank",
    href: "http://neiiviewer.nicta.com.au"
  }, _react["default"].createElement("img", {
    className: _relatedMaps["default"].image,
    src: __webpack_require__(/*! ../../wwwroot/images/neii.jpg */ "./wwwroot/images/neii.jpg"),
    alt: "NEII Viewer"
  })), _react["default"].createElement("a", {
    target: "_blank",
    className: _relatedMaps["default"].link,
    href: "http://www.neii.gov.au/viewer/"
  }, "NEII Viewer"), _react["default"].createElement("p", null, "The National Environmental Information Infrastructure (NEII) is an information platform designed to improve discovery, access and re-use of nationally significant environmental data. More information on the NEII is available here:", " ", _react["default"].createElement("a", {
    target: "_blank",
    className: _relatedMaps["default"].link,
    href: "http://neii.gov.au/data-viewer"
  }, "neii.gov.au/data-viewer"), ".")), _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_panel["default"].section, _relatedMaps["default"].section)
  }, _react["default"].createElement("a", {
    target: "_blank",
    href: "http://map.aurin.org.au"
  }, _react["default"].createElement("img", {
    className: _relatedMaps["default"].image,
    src: __webpack_require__(/*! ../../wwwroot/images/aurin-map.jpg */ "./wwwroot/images/aurin-map.jpg"),
    alt: "AURIN Map"
  })), _react["default"].createElement("a", {
    target: "_blank",
    className: _relatedMaps["default"].link,
    href: "http://map.aurin.org.au"
  }, "AURIN Map"), _react["default"].createElement("p", null, "AURIN Map provides access to datasets on urban infrastructure for urban researchers, policy and decision makers.")));
}

RelatedMaps.propTypes = {
  viewState: _propTypes["default"].object.isRequired,
  smallScreen: _propTypes["default"].bool
};
var _default = RelatedMaps;
exports["default"] = _default;

/***/ }),

/***/ "./lib/Views/UserInterface.jsx":
/*!*************************************!*\
  !*** ./lib/Views/UserInterface.jsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = UserInterface;

var _Groups = __webpack_require__(/*! terriajs/lib/ReactViews/StandardUserInterface/customizable/Groups */ "./node_modules/terriajs/lib/ReactViews/StandardUserInterface/customizable/Groups.jsx");

var _MeasureTool = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ReactViews/Map/Navigation/MeasureTool */ "./node_modules/terriajs/lib/ReactViews/Map/Navigation/MeasureTool.jsx"));

var _MenuItem = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuItem */ "./node_modules/terriajs/lib/ReactViews/StandardUserInterface/customizable/MenuItem.jsx"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _RelatedMaps = _interopRequireDefault(__webpack_require__(/*! ./RelatedMaps */ "./lib/Views/RelatedMaps.jsx"));

var _SplitPoint = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ReactViews/SplitPoint */ "./node_modules/terriajs/lib/ReactViews/SplitPoint.jsx"));

var _StandardUserInterface = _interopRequireDefault(__webpack_require__(/*! terriajs/lib/ReactViews/StandardUserInterface/StandardUserInterface.jsx */ "./node_modules/terriajs/lib/ReactViews/StandardUserInterface/StandardUserInterface.jsx"));

var _version = _interopRequireDefault(__webpack_require__(/*! ../../version */ "./version.js"));

__webpack_require__(/*! ./global.scss */ "./lib/Views/global.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function loadAugmentedVirtuality(callback) {
  __webpack_require__.e(/*! require.ensure | AugmentedVirtuality */ "vendors~AugmentedVirtuality").then((function () {
    var AugmentedVirtualityTool = __webpack_require__(/*! terriajs/lib/ReactViews/Map/Navigation/AugmentedVirtualityTool */ "./node_modules/terriajs/lib/ReactViews/Map/Navigation/AugmentedVirtualityTool.jsx");

    callback(AugmentedVirtualityTool);
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}

function isBrowserSupportedAV() {
  return /Android|iPhone|iPad/i.test(navigator.userAgent);
}

function UserInterface(props) {
  return _react["default"].createElement(_StandardUserInterface["default"], _extends({}, props, {
    version: _version["default"]
  }), _react["default"].createElement(_Groups.Menu, null, _react["default"].createElement(_MenuItem["default"], {
    caption: "About",
    href: "about.html",
    key: "about-link"
  })), _react["default"].createElement(_Groups.Nav, null, _react["default"].createElement(_MeasureTool["default"], {
    terria: props.viewState.terria,
    key: "measure-tool"
  })), _react["default"].createElement(_Groups.ExperimentalMenu, null, isBrowserSupportedAV() ? _react["default"].createElement(_SplitPoint["default"], {
    loadComponent: loadAugmentedVirtuality,
    viewState: props.viewState,
    terria: props.viewState.terria,
    experimentalWarning: true
  }) : null));
}

UserInterface.propTypes = {
  terria: _propTypes["default"].object,
  viewState: _propTypes["default"].object
};

/***/ }),

/***/ "./lib/Views/global.scss":
/*!*******************************!*\
  !*** ./lib/Views/global.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"rcSliderTooltipZoomDownIn":"tm-global__rcSliderTooltipZoomDownIn","rcSliderTooltipZoomDownOut":"tm-global__rcSliderTooltipZoomDownOut"};

/***/ }),

/***/ "./lib/Views/related-maps.scss":
/*!*************************************!*\
  !*** ./lib/Views/related-maps.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"dropdown-inner":"tm-related-maps__dropdown-inner","dropdownInner":"tm-related-maps__dropdown-inner","section":"tm-related-maps__section tm-_base__clearfix","image":"tm-related-maps__image","link":"tm-related-maps__link tm-_base__link"};

/***/ }),

/***/ "./lib/Views/render.jsx":
/*!******************************!*\
  !*** ./lib/Views/render.jsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderUi;

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _redboxReact = _interopRequireDefault(__webpack_require__(/*! redbox-react */ "./node_modules/redbox-react/lib/index.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function renderUi(terria, allBaseMaps, viewState) {
  var render = function render() {
    var UI = __webpack_require__(/*! ./UserInterface */ "./lib/Views/UserInterface.jsx")["default"];

    _reactDom["default"].render(_react["default"].createElement(UI, {
      terria: terria,
      allBaseMaps: allBaseMaps,
      viewState: viewState
    }), document.getElementById("ui"));
  };

  if (false) { var renderError, renderApp; }

  render();
}

/***/ }),

/***/ "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS sync recursive ^\\.\\/IAU2006_XYS_.*\\.json$":
/*!************************************************************************************************!*\
  !*** ./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS sync ^\.\/IAU2006_XYS_.*\.json$ ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./IAU2006_XYS_0.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_0.json",
	"./IAU2006_XYS_1.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_1.json",
	"./IAU2006_XYS_10.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_10.json",
	"./IAU2006_XYS_11.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_11.json",
	"./IAU2006_XYS_12.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_12.json",
	"./IAU2006_XYS_13.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_13.json",
	"./IAU2006_XYS_14.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_14.json",
	"./IAU2006_XYS_15.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_15.json",
	"./IAU2006_XYS_16.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_16.json",
	"./IAU2006_XYS_17.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_17.json",
	"./IAU2006_XYS_18.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_18.json",
	"./IAU2006_XYS_19.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_19.json",
	"./IAU2006_XYS_2.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_2.json",
	"./IAU2006_XYS_20.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_20.json",
	"./IAU2006_XYS_21.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_21.json",
	"./IAU2006_XYS_22.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_22.json",
	"./IAU2006_XYS_23.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_23.json",
	"./IAU2006_XYS_24.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_24.json",
	"./IAU2006_XYS_25.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_25.json",
	"./IAU2006_XYS_26.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_26.json",
	"./IAU2006_XYS_27.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_27.json",
	"./IAU2006_XYS_3.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_3.json",
	"./IAU2006_XYS_4.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_4.json",
	"./IAU2006_XYS_5.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_5.json",
	"./IAU2006_XYS_6.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_6.json",
	"./IAU2006_XYS_7.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_7.json",
	"./IAU2006_XYS_8.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_8.json",
	"./IAU2006_XYS_9.json": "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS/IAU2006_XYS_9.json"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/terriajs-cesium/Source/Assets/IAU2006_XYS sync recursive ^\\.\\/IAU2006_XYS_.*\\.json$";

/***/ }),

/***/ "./node_modules/terriajs-cesium/Source/ThirdParty sync \\.wasm$":
/*!**********************************************************************************!*\
  !*** ./node_modules/terriajs-cesium/Source/ThirdParty sync nonrecursive \.wasm$ ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./draco_decoder.wasm": "./node_modules/terriajs-cesium/Source/ThirdParty/draco_decoder.wasm"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/terriajs-cesium/Source/ThirdParty sync \\.wasm$";

/***/ }),

/***/ "./node_modules/terriajs-cesium/Source/ThirdParty/Workers sync .*wasm_wrapper\\.js$":
/*!******************************************************************************************************!*\
  !*** ./node_modules/terriajs-cesium/Source/ThirdParty/Workers sync nonrecursive .*wasm_wrapper\.js$ ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./draco_wasm_wrapper.js": "./node_modules/terriajs-cesium/Source/ThirdParty/Workers/draco_wasm_wrapper.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/terriajs-cesium/Source/ThirdParty/Workers sync .*wasm_wrapper\\.js$";

/***/ }),

/***/ "./node_modules/terriajs-cesium/Source/ThirdParty/Workers sync recursive ./node_modules/worker-loader/dist/cjs.js!./ ^\\.\\/.*$":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/terriajs-cesium/Source/ThirdParty/Workers sync ./node_modules/worker-loader/dist/cjs.js ^\.\/.*$ ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./deflate": "./node_modules/worker-loader/dist/cjs.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/deflate.js",
	"./deflate.js": "./node_modules/worker-loader/dist/cjs.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/deflate.js",
	"./draco_decoder": "./node_modules/worker-loader/dist/cjs.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/draco_decoder.js",
	"./draco_decoder.js": "./node_modules/worker-loader/dist/cjs.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/draco_decoder.js",
	"./draco_wasm_wrapper": "./node_modules/worker-loader/dist/cjs.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/draco_wasm_wrapper.js",
	"./draco_wasm_wrapper.js": "./node_modules/worker-loader/dist/cjs.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/draco_wasm_wrapper.js",
	"./inflate": "./node_modules/worker-loader/dist/cjs.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/inflate.js",
	"./inflate.js": "./node_modules/worker-loader/dist/cjs.js!./node_modules/terriajs-cesium/Source/ThirdParty/Workers/inflate.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/terriajs-cesium/Source/ThirdParty/Workers sync recursive ./node_modules/worker-loader/dist/cjs.js!./ ^\\.\\/.*$";

/***/ }),

/***/ "./version.js":
/*!********************!*\
  !*** ./version.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = 'revert_back_here-182-g0dc1bed3 (plus local modifications)';

/***/ }),

/***/ "./wwwroot/images/aremi.jpg":
/*!**********************************!*\
  !*** ./wwwroot/images/aremi.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8edfbe49f85e6994ebb732a110a3c502.jpg";

/***/ }),

/***/ "./wwwroot/images/aurin-map.jpg":
/*!**************************************!*\
  !*** ./wwwroot/images/aurin-map.jpg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4bc9b143747260dad71fd9951b364e3a.jpg";

/***/ }),

/***/ "./wwwroot/images/bing-aerial-labels.png":
/*!***********************************************!*\
  !*** ./wwwroot/images/bing-aerial-labels.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e8eb95bd6372f96d215232179302a62b.png";

/***/ }),

/***/ "./wwwroot/images/bing-aerial.png":
/*!****************************************!*\
  !*** ./wwwroot/images/bing-aerial.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4aafb3b7853559abb1db69b58fcf9485.png";

/***/ }),

/***/ "./wwwroot/images/bing-maps-roads.png":
/*!********************************************!*\
  !*** ./wwwroot/images/bing-maps-roads.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bfc46f97e9326600d87c621f75228e72.png";

/***/ }),

/***/ "./wwwroot/images/black-marble.png":
/*!*****************************************!*\
  !*** ./wwwroot/images/black-marble.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fef17f4fcfcacf5023f408626ab309b3.png";

/***/ }),

/***/ "./wwwroot/images/dark-matter.png":
/*!****************************************!*\
  !*** ./wwwroot/images/dark-matter.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2a22ef6063533064bcfcb03dd0893d72.png";

/***/ }),

/***/ "./wwwroot/images/natural-earth.png":
/*!******************************************!*\
  !*** ./wwwroot/images/natural-earth.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4c1c74c1188ef71b5b7811a39c869fc6.png";

/***/ }),

/***/ "./wwwroot/images/neii.jpg":
/*!*********************************!*\
  !*** ./wwwroot/images/neii.jpg ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8fc6de49c8bef0a89f25ca9ba37deb81.jpg";

/***/ }),

/***/ "./wwwroot/images/northernaustralia.jpg":
/*!**********************************************!*\
  !*** ./wwwroot/images/northernaustralia.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f5ad078d6d4ff7fc08ef6a3105dc2ef9.jpg";

/***/ }),

/***/ "./wwwroot/images/positron.png":
/*!*************************************!*\
  !*** ./wwwroot/images/positron.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "edf24bed40341489d0f3274ed9940bb5.png";

/***/ }),

/***/ "./wwwroot/images/usa-topo.png":
/*!*************************************!*\
  !*** ./wwwroot/images/usa-topo.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6166ce9b955e916826a91309c9a36719.png";

/***/ }),

/***/ 0:
/*!************************!*\
  !*** xmldom (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguVGVycmlhTWFwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL1ZpZXdNb2RlbHMvY3JlYXRlQmluZ0Jhc2VNYXBPcHRpb25zLmpzIiwid2VicGFjazovLy8uL2xpYi9WaWV3TW9kZWxzL2NyZWF0ZUdsb2JhbEJhc2VNYXBPcHRpb25zLmpzIiwid2VicGFjazovLy8uL2xpYi9WaWV3TW9kZWxzL2NyZWF0ZVVTQmFzZU1hcE9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL1ZpZXdNb2RlbHMvc2VsZWN0QmFzZU1hcC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvVmlld3MvRGV2ZWxvcG1lbnREaXNjbGFpbWVyUHJlYW1ibGUuaHRtbCIsIndlYnBhY2s6Ly8vLi9saWIvVmlld3MvR2xvYmFsRGlzY2xhaW1lci5odG1sIiwid2VicGFjazovLy8uL2xpYi9WaWV3cy9SZWxhdGVkTWFwcy5qc3giLCJ3ZWJwYWNrOi8vLy4vbGliL1ZpZXdzL1VzZXJJbnRlcmZhY2UuanN4Iiwid2VicGFjazovLy8uL2xpYi9WaWV3cy9nbG9iYWwuc2NzcyIsIndlYnBhY2s6Ly8vLi9saWIvVmlld3MvcmVsYXRlZC1tYXBzLnNjc3M/Y2NjOSIsIndlYnBhY2s6Ly8vLi9saWIvVmlld3MvcmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vLi92ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvaW1hZ2VzL2FyZW1pLmpwZyIsIndlYnBhY2s6Ly8vLi93d3dyb290L2ltYWdlcy9hdXJpbi1tYXAuanBnIiwid2VicGFjazovLy8uL3d3d3Jvb3QvaW1hZ2VzL2JpbmctYWVyaWFsLWxhYmVscy5wbmciLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9pbWFnZXMvYmluZy1hZXJpYWwucG5nIiwid2VicGFjazovLy8uL3d3d3Jvb3QvaW1hZ2VzL2JpbmctbWFwcy1yb2Fkcy5wbmciLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9pbWFnZXMvYmxhY2stbWFyYmxlLnBuZyIsIndlYnBhY2s6Ly8vLi93d3dyb290L2ltYWdlcy9kYXJrLW1hdHRlci5wbmciLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9pbWFnZXMvbmF0dXJhbC1lYXJ0aC5wbmciLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9pbWFnZXMvbmVpaS5qcGciLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9pbWFnZXMvbm9ydGhlcm5hdXN0cmFsaWEuanBnIiwid2VicGFjazovLy8uL3d3d3Jvb3QvaW1hZ2VzL3Bvc2l0cm9uLnBuZyIsIndlYnBhY2s6Ly8vLi93d3dyb290L2ltYWdlcy91c2EtdG9wby5wbmciXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLypnbG9iYWwgcmVxdWlyZSx3aW5kb3cgKi9cblxudmFyIF9Hb29nbGVBbmFseXRpY3MgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvQ29yZS9Hb29nbGVBbmFseXRpY3NcIikpO1xuXG52YXIgX1NoYXJlRGF0YVNlcnZpY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvTW9kZWxzL1NoYXJlRGF0YVNlcnZpY2VcIikpO1xuXG52YXIgX3JhaXNlRXJyb3JUb1VzZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvTW9kZWxzL3JhaXNlRXJyb3JUb1VzZXJcIikpO1xuXG52YXIgX3JlZ2lzdGVyQW5hbHl0aWNzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwidGVycmlhanMvbGliL01vZGVscy9yZWdpc3RlckFuYWx5dGljc1wiKSk7XG5cbnZhciBfcmVnaXN0ZXJDYXRhbG9nTWVtYmVycyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInRlcnJpYWpzL2xpYi9Nb2RlbHMvcmVnaXN0ZXJDYXRhbG9nTWVtYmVyc1wiKSk7XG5cbnZhciBfcmVnaXN0ZXJDdXN0b21Db21wb25lbnRUeXBlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInRlcnJpYWpzL2xpYi9SZWFjdFZpZXdzL0N1c3RvbS9yZWdpc3RlckN1c3RvbUNvbXBvbmVudFR5cGVzXCIpKTtcblxudmFyIF9UZXJyaWEgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvTW9kZWxzL1RlcnJpYVwiKSk7XG5cbnZhciBfdXBkYXRlQXBwbGljYXRpb25Pbkhhc2hDaGFuZ2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvVmlld01vZGVscy91cGRhdGVBcHBsaWNhdGlvbk9uSGFzaENoYW5nZVwiKSk7XG5cbnZhciBfdXBkYXRlQXBwbGljYXRpb25Pbk1lc3NhZ2VGcm9tUGFyZW50V2luZG93ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwidGVycmlhanMvbGliL1ZpZXdNb2RlbHMvdXBkYXRlQXBwbGljYXRpb25Pbk1lc3NhZ2VGcm9tUGFyZW50V2luZG93XCIpKTtcblxudmFyIF9WaWV3U3RhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvUmVhY3RWaWV3TW9kZWxzL1ZpZXdTdGF0ZVwiKSk7XG5cbnZhciBfQmluZ01hcHNTZWFyY2hQcm92aWRlclZpZXdNb2RlbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInRlcnJpYWpzL2xpYi9WaWV3TW9kZWxzL0JpbmdNYXBzU2VhcmNoUHJvdmlkZXJWaWV3TW9kZWwuanNcIikpO1xuXG52YXIgX0dhemV0dGVlclNlYXJjaFByb3ZpZGVyVmlld01vZGVsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwidGVycmlhanMvbGliL1ZpZXdNb2RlbHMvR2F6ZXR0ZWVyU2VhcmNoUHJvdmlkZXJWaWV3TW9kZWwuanNcIikpO1xuXG52YXIgX0duYWZTZWFyY2hQcm92aWRlclZpZXdNb2RlbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInRlcnJpYWpzL2xpYi9WaWV3TW9kZWxzL0duYWZTZWFyY2hQcm92aWRlclZpZXdNb2RlbC5qc1wiKSk7XG5cbnZhciBfZGVmaW5lZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInRlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9kZWZpbmVkXCIpKTtcblxudmFyIF9yZW5kZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9WaWV3cy9yZW5kZXJcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxudmFyIHRlcnJpYU9wdGlvbnMgPSB7XG4gIGJhc2VVcmw6ICdidWlsZC9UZXJyaWFKUydcbn07IC8vIGNoZWNrQnJvd3NlckNvbXBhdGliaWxpdHkoJ3VpJyk7XG5cbi8vIFJlZ2lzdGVyIGFsbCB0eXBlcyBvZiBjYXRhbG9nIG1lbWJlcnMgaW4gdGhlIGNvcmUgVGVycmlhSlMuICBJZiB5b3Ugb25seSB3YW50IHRvIHJlZ2lzdGVyIGEgc3Vic2V0IG9mIHRoZW1cbi8vIChpLmUuIHRvIHJlZHVjZSB0aGUgc2l6ZSBvZiB5b3VyIGFwcGxpY2F0aW9uIGlmIHlvdSBkb24ndCBhY3R1YWxseSB1c2UgdGhlbSBhbGwpLCBmZWVsIGZyZWUgdG8gY29weSBhIHN1YnNldCBvZlxuLy8gdGhlIGNvZGUgaW4gdGhlIHJlZ2lzdGVyQ2F0YWxvZ01lbWJlcnMgZnVuY3Rpb24gaGVyZSBpbnN0ZWFkLlxuKDAsIF9yZWdpc3RlckNhdGFsb2dNZW1iZXJzW1wiZGVmYXVsdFwiXSkoKTtcbigwLCBfcmVnaXN0ZXJBbmFseXRpY3NbXCJkZWZhdWx0XCJdKSgpO1xudGVycmlhT3B0aW9ucy5hbmFseXRpY3MgPSBuZXcgX0dvb2dsZUFuYWx5dGljc1tcImRlZmF1bHRcIl0oKTsgLy8gQ29uc3RydWN0IHRoZSBUZXJyaWFKUyBhcHBsaWNhdGlvbiwgYXJyYW5nZSB0byBzaG93IGVycm9ycyB0byB0aGUgdXNlciwgYW5kIHN0YXJ0IGl0IHVwLlxuXG52YXIgdGVycmlhID0gbmV3IF9UZXJyaWFbXCJkZWZhdWx0XCJdKHRlcnJpYU9wdGlvbnMpOyAvLyBSZWdpc3RlciBjdXN0b20gY29tcG9uZW50cyBpbiB0aGUgY29yZSBUZXJyaWFKUy4gIElmIHlvdSBvbmx5IHdhbnQgdG8gcmVnaXN0ZXIgYSBzdWJzZXQgb2YgdGhlbSwgb3IgdG8gYWRkIHlvdXIgb3duLFxuLy8gaW5zZXJ0IHlvdXIgY3VzdG9tIHZlcnNpb24gb2YgdGhlIGNvZGUgaW4gdGhlIHJlZ2lzdGVyQ3VzdG9tQ29tcG9uZW50VHlwZXMgZnVuY3Rpb24gaGVyZSBpbnN0ZWFkLlxuXG4oMCwgX3JlZ2lzdGVyQ3VzdG9tQ29tcG9uZW50VHlwZXNbXCJkZWZhdWx0XCJdKSh0ZXJyaWEpOyAvLyBDcmVhdGUgdGhlIFZpZXdTdGF0ZSBiZWZvcmUgdGVycmlhLnN0YXJ0IHNvIHRoYXQgZXJyb3JzIGhhdmUgc29tZXdoZXJlIHRvIGdvLlxuXG52YXIgdmlld1N0YXRlID0gbmV3IF9WaWV3U3RhdGVbXCJkZWZhdWx0XCJdKHtcbiAgdGVycmlhOiB0ZXJyaWFcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICB3aW5kb3cudmlld1N0YXRlID0gdmlld1N0YXRlO1xufSAvLyBJZiB3ZSdyZSBydW5uaW5nIGluIGRldiBtb2RlLCBkaXNhYmxlIHRoZSBidWlsdCBzdHlsZSBzaGVldCBhcyB3ZSdsbCBiZSB1c2luZyB0aGUgd2VicGFjayBzdHlsZSBsb2FkZXIuXG4vLyBOb3RlIHRoYXQgaWYgdGhlIGZpcnN0IHN0eWxlc2hlZXQgc3RvcHMgYmVpbmcgbmF0aW9uYWxtYXAuY3NzIHRoZW4gdGhpcyB3aWxsIGhhdmUgdG8gY2hhbmdlLlxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbW9kdWxlLmhvdCkge1xuICBkb2N1bWVudC5zdHlsZVNoZWV0c1swXS5kaXNhYmxlZCA9IHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGVycmlhLnN0YXJ0KHtcbiAgLy8gSWYgeW91IGRvbid0IHdhbnQgdGhlIHVzZXIgdG8gYmUgYWJsZSB0byBjb250cm9sIGNhdGFsb2cgbG9hZGluZyB2aWEgdGhlIFVSTCwgcmVtb3ZlIHRoZSBhcHBsaWNhdGlvblVybCBwcm9wZXJ0eSBiZWxvd1xuICAvLyBhcyB3ZWxsIGFzIHRoZSBjYWxsIHRvIFwidXBkYXRlQXBwbGljYXRpb25Pbkhhc2hDaGFuZ2VcIiBmdXJ0aGVyIGRvd24uXG4gIGFwcGxpY2F0aW9uVXJsOiB3aW5kb3cubG9jYXRpb24sXG4gIGNvbmZpZ1VybDogJ2NvbmZpZy5qc29uJyxcbiAgc2hhcmVEYXRhU2VydmljZTogbmV3IF9TaGFyZURhdGFTZXJ2aWNlW1wiZGVmYXVsdFwiXSh7XG4gICAgdGVycmlhOiB0ZXJyaWFcbiAgfSlcbn0pLm90aGVyd2lzZShmdW5jdGlvbiAoZSkge1xuICAoMCwgX3JhaXNlRXJyb3JUb1VzZXJbXCJkZWZhdWx0XCJdKSh0ZXJyaWEsIGUpO1xufSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICB2aWV3U3RhdGUuc2VhcmNoU3RhdGUubG9jYXRpb25TZWFyY2hQcm92aWRlcnMgPSBbbmV3IF9CaW5nTWFwc1NlYXJjaFByb3ZpZGVyVmlld01vZGVsW1wiZGVmYXVsdFwiXSh7XG4gICAgICB0ZXJyaWE6IHRlcnJpYSxcbiAgICAgIGtleTogdGVycmlhLmNvbmZpZ1BhcmFtZXRlcnMuYmluZ01hcHNLZXlcbiAgICB9KSwgbmV3IF9HYXpldHRlZXJTZWFyY2hQcm92aWRlclZpZXdNb2RlbFtcImRlZmF1bHRcIl0oe1xuICAgICAgdGVycmlhOiB0ZXJyaWFcbiAgICB9KSwgbmV3IF9HbmFmU2VhcmNoUHJvdmlkZXJWaWV3TW9kZWxbXCJkZWZhdWx0XCJdKHtcbiAgICAgIHRlcnJpYTogdGVycmlhXG4gICAgfSldOyAvLyBBdXRvbWF0aWNhbGx5IHVwZGF0ZSBUZXJyaWEgKGxvYWQgbmV3IGNhdGFsb2dzLCBldGMuKSB3aGVuIHRoZSBoYXNoIHBhcnQgb2YgdGhlIFVSTCBjaGFuZ2VzLlxuXG4gICAgKDAsIF91cGRhdGVBcHBsaWNhdGlvbk9uSGFzaENoYW5nZVtcImRlZmF1bHRcIl0pKHRlcnJpYSwgd2luZG93KTtcbiAgICAoMCwgX3VwZGF0ZUFwcGxpY2F0aW9uT25NZXNzYWdlRnJvbVBhcmVudFdpbmRvd1tcImRlZmF1bHRcIl0pKHRlcnJpYSwgd2luZG93KTsgLy8gQ3JlYXRlIHRoZSB2YXJpb3VzIGJhc2UgbWFwIG9wdGlvbnMuXG5cbiAgICB2YXIgY3JlYXRlVVNCYXNlTWFwT3B0aW9ucyA9IHJlcXVpcmUoJy4vbGliL1ZpZXdNb2RlbHMvY3JlYXRlVVNCYXNlTWFwT3B0aW9ucycpO1xuXG4gICAgdmFyIGNyZWF0ZUdsb2JhbEJhc2VNYXBPcHRpb25zID0gcmVxdWlyZSgnLi9saWIvVmlld01vZGVscy9jcmVhdGVHbG9iYWxCYXNlTWFwT3B0aW9ucycpO1xuXG4gICAgdmFyIHNlbGVjdEJhc2VNYXAgPSByZXF1aXJlKCcuL2xpYi9WaWV3TW9kZWxzL3NlbGVjdEJhc2VNYXAnKTtcblxuICAgIHZhciB1c0Jhc2VNYXBzID0gY3JlYXRlVVNCYXNlTWFwT3B0aW9ucyh0ZXJyaWEpO1xuICAgIHZhciBnbG9iYWxCYXNlTWFwcyA9IGNyZWF0ZUdsb2JhbEJhc2VNYXBPcHRpb25zKHRlcnJpYSwgdGVycmlhLmNvbmZpZ1BhcmFtZXRlcnMuYmluZ01hcHNLZXkpO1xuICAgIHZhciBhbGxCYXNlTWFwcyA9IHVzQmFzZU1hcHMuY29uY2F0KGdsb2JhbEJhc2VNYXBzKTtcbiAgICBzZWxlY3RCYXNlTWFwKHRlcnJpYSwgYWxsQmFzZU1hcHMsICdCaW5nIE1hcHMgQWVyaWFsJywgZmFsc2UpOyAvLyBTaG93IGEgbW9kYWwgZGlzY2xhaW1lciBiZWZvcmUgdXNlciBjYW4gZG8gYW55dGhpbmcgZWxzZS5cblxuICAgIGlmICgoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKSh0ZXJyaWEuY29uZmlnUGFyYW1ldGVycy5nbG9iYWxEaXNjbGFpbWVyKSkge1xuICAgICAgdmFyIGdsb2JhbERpc2NsYWltZXIgPSB0ZXJyaWEuY29uZmlnUGFyYW1ldGVycy5nbG9iYWxEaXNjbGFpbWVyO1xuICAgICAgdmFyIGhvc3RuYW1lID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuXG4gICAgICBpZiAoZ2xvYmFsRGlzY2xhaW1lci5lbmFibGVPbkxvY2FsaG9zdCB8fCBob3N0bmFtZS5pbmRleE9mKCdsb2NhbGhvc3QnKSA9PT0gLTEpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJzsgLy8gU29tZXRpbWVzIHdlIHdhbnQgdG8gc2hvdyBhIHByZWFtYmxlIGlmIHRoZSB1c2VyIGlzIHZpZXdpbmcgYSBzaXRlIG90aGVyIHRoYW4gdGhlIG9mZmljaWFsIHByb2R1Y3Rpb24gaW5zdGFuY2UuXG4gICAgICAgIC8vIFRoaXMgY2FuIGJlIGV4cHJlc3NlZCBhcyBhIGRldkhvc3RSZWdleCAoXCJhbnkgc2l0ZSBzdGFydGluZyB3aXRoIHN0YWdpbmcuXCIpIG9yIGEgbmVnYXRpdmUgcHJvZEhvc3RSZWdleCAoXCJhbnkgc2l0ZSBub3QgZW5kaW5nIGluIC5nb3YuYXVcIilcblxuICAgICAgICBpZiAoKDAsIF9kZWZpbmVkW1wiZGVmYXVsdFwiXSkoZ2xvYmFsRGlzY2xhaW1lci5kZXZIb3N0UmVnZXgpICYmIGhvc3RuYW1lLm1hdGNoKGdsb2JhbERpc2NsYWltZXIuZGV2SG9zdFJlZ2V4KSB8fCAoMCwgX2RlZmluZWRbXCJkZWZhdWx0XCJdKShnbG9iYWxEaXNjbGFpbWVyLnByb2RIb3N0UmVnZXgpICYmICFob3N0bmFtZS5tYXRjaChnbG9iYWxEaXNjbGFpbWVyLnByb2RIb3N0UmVnZXgpKSB7XG4gICAgICAgICAgbWVzc2FnZSArPSByZXF1aXJlKCcuL2xpYi9WaWV3cy9EZXZlbG9wbWVudERpc2NsYWltZXJQcmVhbWJsZS5odG1sJyk7XG4gICAgICAgIH1cblxuICAgICAgICBtZXNzYWdlICs9IHJlcXVpcmUoJy4vbGliL1ZpZXdzL0dsb2JhbERpc2NsYWltZXIuaHRtbCcpO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICB0aXRsZTogZ2xvYmFsRGlzY2xhaW1lci50aXRsZSAhPT0gdW5kZWZpbmVkID8gZ2xvYmFsRGlzY2xhaW1lci50aXRsZSA6ICdXYXJuaW5nJyxcbiAgICAgICAgICBjb25maXJtVGV4dDogZ2xvYmFsRGlzY2xhaW1lci5idXR0b25UaXRsZSB8fCBcIk9rXCIsXG4gICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICBoZWlnaHQ6IDU1MCxcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgIGhvcml6b250YWxQYWRkaW5nOiAxMDBcbiAgICAgICAgfTtcbiAgICAgICAgdmlld1N0YXRlLm5vdGlmaWNhdGlvbnMucHVzaChvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9IC8vIFVwZGF0ZSB0aGUgVmlld1N0YXRlIGJhc2VkIG9uIFRlcnJpYSBjb25maWcgcGFyYW1ldGVycy5cbiAgICAvLyBOb3RlOiB3b24ndCBkbyBhbnl0aGluZyB1bmxlc3MgdGVycmlhanMgdmVyc2lvbiBpcyA+Ny45LjBcblxuXG4gICAgaWYgKCgwLCBfZGVmaW5lZFtcImRlZmF1bHRcIl0pKHZpZXdTdGF0ZS5hZnRlclRlcnJpYVN0YXJ0ZWQpKSB7XG4gICAgICB2aWV3U3RhdGUuYWZ0ZXJUZXJyaWFTdGFydGVkKCk7XG4gICAgfVxuXG4gICAgKDAsIF9yZW5kZXJbXCJkZWZhdWx0XCJdKSh0ZXJyaWEsIGFsbEJhc2VNYXBzLCB2aWV3U3RhdGUpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbiAgICBjb25zb2xlLmVycm9yKGUuc3RhY2spO1xuICB9XG59KTsiLCJcInVzZSBzdHJpY3RcIjtcbi8qZ2xvYmFsIHJlcXVpcmUqL1xuXG52YXIgQmFzZU1hcFZpZXdNb2RlbCA9IHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvVmlld01vZGVscy9CYXNlTWFwVmlld01vZGVsXCIpO1xuXG52YXIgQmluZ01hcHNDYXRhbG9nSXRlbSA9IHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvTW9kZWxzL0JpbmdNYXBzQ2F0YWxvZ0l0ZW1cIik7XG5cbnZhciBCaW5nTWFwc1N0eWxlID0gcmVxdWlyZShcInRlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvU2NlbmUvQmluZ01hcHNTdHlsZVwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBJb25JbWFnZXJ5Q2F0YWxvZ0l0ZW0gPSByZXF1aXJlKFwidGVycmlhanMvbGliL01vZGVscy9Jb25JbWFnZXJ5Q2F0YWxvZ0l0ZW1cIik7XG5cbnZhciBJb25Xb3JsZEltYWdlcnlTdHlsZSA9IHJlcXVpcmUoXCJ0ZXJyaWFqcy1jZXNpdW0vU291cmNlL1NjZW5lL0lvbldvcmxkSW1hZ2VyeVN0eWxlXCIpW1wiZGVmYXVsdFwiXTtcblxuZnVuY3Rpb24gY3JlYXRlQmluZ0Jhc2VNYXBPcHRpb25zKHRlcnJpYSwgYmluZ01hcHNLZXkpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgYmluZ01hcHNBZXJpYWxXaXRoTGFiZWxzO1xuICB2YXIgYmluZ01hcHNBZXJpYWw7XG4gIHZhciBiaW5nTWFwc1JvYWRzO1xuXG4gIGlmIChiaW5nTWFwc0tleSAmJiB0ZXJyaWEuY29uZmlnUGFyYW1ldGVycy51c2VDZXNpdW1Jb25CaW5nSW1hZ2VyeSAhPT0gdHJ1ZSkge1xuICAgIGJpbmdNYXBzQWVyaWFsV2l0aExhYmVscyA9IG5ldyBCaW5nTWFwc0NhdGFsb2dJdGVtKHRlcnJpYSk7XG4gICAgYmluZ01hcHNBZXJpYWxXaXRoTGFiZWxzLm1hcFN0eWxlID0gQmluZ01hcHNTdHlsZS5BRVJJQUxfV0lUSF9MQUJFTFNfT05fREVNQU5EO1xuICAgIGJpbmdNYXBzQWVyaWFsV2l0aExhYmVscy5rZXkgPSBiaW5nTWFwc0tleTtcbiAgICBiaW5nTWFwc0FlcmlhbCA9IG5ldyBCaW5nTWFwc0NhdGFsb2dJdGVtKHRlcnJpYSk7XG4gICAgYmluZ01hcHNBZXJpYWwubWFwU3R5bGUgPSBCaW5nTWFwc1N0eWxlLkFFUklBTDtcbiAgICBiaW5nTWFwc0FlcmlhbC5rZXkgPSBiaW5nTWFwc0tleTtcbiAgICBiaW5nTWFwc1JvYWRzID0gbmV3IEJpbmdNYXBzQ2F0YWxvZ0l0ZW0odGVycmlhKTtcbiAgICBiaW5nTWFwc1JvYWRzLm1hcFN0eWxlID0gQmluZ01hcHNTdHlsZS5ST0FEX09OX0RFTUFORDtcbiAgICBiaW5nTWFwc1JvYWRzLmtleSA9IGJpbmdNYXBzS2V5O1xuICB9IGVsc2UgaWYgKHRlcnJpYS5jb25maWdQYXJhbWV0ZXJzLnVzZUNlc2l1bUlvbkJpbmdJbWFnZXJ5ICE9PSBmYWxzZSkge1xuICAgIGJpbmdNYXBzQWVyaWFsV2l0aExhYmVscyA9IG5ldyBJb25JbWFnZXJ5Q2F0YWxvZ0l0ZW0odGVycmlhKTtcbiAgICBiaW5nTWFwc0FlcmlhbFdpdGhMYWJlbHMuaW9uQXNzZXRJZCA9IElvbldvcmxkSW1hZ2VyeVN0eWxlLkFFUklBTF9XSVRIX0xBQkVMU19PTl9ERU1BTkQ7XG4gICAgYmluZ01hcHNBZXJpYWwgPSBuZXcgSW9uSW1hZ2VyeUNhdGFsb2dJdGVtKHRlcnJpYSk7XG4gICAgYmluZ01hcHNBZXJpYWwuaW9uQXNzZXRJZCA9IElvbldvcmxkSW1hZ2VyeVN0eWxlLkFFUklBTDtcbiAgICBiaW5nTWFwc1JvYWRzID0gbmV3IElvbkltYWdlcnlDYXRhbG9nSXRlbSh0ZXJyaWEpO1xuICAgIGJpbmdNYXBzUm9hZHMuaW9uQXNzZXRJZCA9IElvbldvcmxkSW1hZ2VyeVN0eWxlLlJPQURfT05fREVNQU5EO1xuICB9IGVsc2Uge1xuICAgIC8vIERpc2FibGUgdGhlIEJpbmcgTWFwcyBsYXllcnMgZW50aXJlbHkuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGJpbmdNYXBzQWVyaWFsV2l0aExhYmVscy5uYW1lID0gXCJCaW5nIE1hcHMgQWVyaWFsIHdpdGggTGFiZWxzXCI7XG4gIGJpbmdNYXBzQWVyaWFsV2l0aExhYmVscy5vcGFjaXR5ID0gMS4wO1xuICBiaW5nTWFwc0FlcmlhbFdpdGhMYWJlbHMuaXNSZXF1aXJlZEZvclJlbmRlcmluZyA9IHRydWU7XG4gIHJlc3VsdC5wdXNoKG5ldyBCYXNlTWFwVmlld01vZGVsKHtcbiAgICBpbWFnZTogcmVxdWlyZShcIi4uLy4uL3d3d3Jvb3QvaW1hZ2VzL2JpbmctYWVyaWFsLWxhYmVscy5wbmdcIiksXG4gICAgY2F0YWxvZ0l0ZW06IGJpbmdNYXBzQWVyaWFsV2l0aExhYmVsc1xuICB9KSk7XG4gIGJpbmdNYXBzQWVyaWFsLm5hbWUgPSBcIkJpbmcgTWFwcyBBZXJpYWxcIjtcbiAgYmluZ01hcHNBZXJpYWwub3BhY2l0eSA9IDEuMDtcbiAgYmluZ01hcHNBZXJpYWwuaXNSZXF1aXJlZEZvclJlbmRlcmluZyA9IHRydWU7XG4gIHJlc3VsdC5wdXNoKG5ldyBCYXNlTWFwVmlld01vZGVsKHtcbiAgICBpbWFnZTogcmVxdWlyZShcIi4uLy4uL3d3d3Jvb3QvaW1hZ2VzL2JpbmctYWVyaWFsLnBuZ1wiKSxcbiAgICBjYXRhbG9nSXRlbTogYmluZ01hcHNBZXJpYWxcbiAgfSkpO1xuICBiaW5nTWFwc1JvYWRzLm5hbWUgPSBcIkJpbmcgTWFwcyBSb2Fkc1wiO1xuICBiaW5nTWFwc1JvYWRzLm9wYWNpdHkgPSAxLjA7XG4gIGJpbmdNYXBzUm9hZHMuaXNSZXF1aXJlZEZvclJlbmRlcmluZyA9IHRydWU7XG4gIHJlc3VsdC5wdXNoKG5ldyBCYXNlTWFwVmlld01vZGVsKHtcbiAgICBpbWFnZTogcmVxdWlyZShcIi4uLy4uL3d3d3Jvb3QvaW1hZ2VzL2JpbmctbWFwcy1yb2Fkcy5wbmdcIiksXG4gICAgY2F0YWxvZ0l0ZW06IGJpbmdNYXBzUm9hZHMsXG4gICAgY29udHJhc3RDb2xvcjogXCIjMDAwMDAwXCJcbiAgfSkpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJpbmdCYXNlTWFwT3B0aW9uczsiLCJcInVzZSBzdHJpY3RcIjtcbi8qZ2xvYmFsIHJlcXVpcmUqL1xuXG52YXIgY3JlYXRlQmluZ0Jhc2VNYXBPcHRpb25zID0gcmVxdWlyZShcIi4vY3JlYXRlQmluZ0Jhc2VNYXBPcHRpb25zXCIpO1xuXG52YXIgQmFzZU1hcFZpZXdNb2RlbCA9IHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvVmlld01vZGVscy9CYXNlTWFwVmlld01vZGVsXCIpO1xuXG52YXIgV2ViTWFwU2VydmljZUNhdGFsb2dJdGVtID0gcmVxdWlyZShcInRlcnJpYWpzL2xpYi9Nb2RlbHMvV2ViTWFwU2VydmljZUNhdGFsb2dJdGVtXCIpO1xuXG52YXIgT3BlblN0cmVldE1hcENhdGFsb2dJdGVtID0gcmVxdWlyZShcInRlcnJpYWpzL2xpYi9Nb2RlbHMvT3BlblN0cmVldE1hcENhdGFsb2dJdGVtXCIpO1xuXG52YXIgY3JlYXRlR2xvYmFsQmFzZU1hcE9wdGlvbnMgPSBmdW5jdGlvbiBjcmVhdGVHbG9iYWxCYXNlTWFwT3B0aW9ucyh0ZXJyaWEsIGJpbmdNYXBzS2V5KSB7XG4gIHZhciByZXN1bHQgPSBjcmVhdGVCaW5nQmFzZU1hcE9wdGlvbnModGVycmlhLCBiaW5nTWFwc0tleSk7XG4gIHZhciBuYXR1cmFsRWFydGhJSSA9IG5ldyBXZWJNYXBTZXJ2aWNlQ2F0YWxvZ0l0ZW0odGVycmlhKTtcbiAgbmF0dXJhbEVhcnRoSUkubmFtZSA9IFwiTmF0dXJhbCBFYXJ0aCBJSVwiO1xuICBuYXR1cmFsRWFydGhJSS51cmwgPSBcImh0dHA6Ly9nZW9zZXJ2ZXIubmF0aW9uYWxtYXAubmljdGEuY29tLmF1L2ltYWdlcnkvbmF0dXJhbC1lYXJ0aC1paS93bXNcIjtcbiAgbmF0dXJhbEVhcnRoSUkubGF5ZXJzID0gXCJuYXR1cmFsLWVhcnRoLWlpOk5FMl9IUl9MQ19TUl9XX0RSXCI7XG4gIG5hdHVyYWxFYXJ0aElJLnBhcmFtZXRlcnMgPSB7XG4gICAgdGlsZWQ6IHRydWVcbiAgfTtcbiAgbmF0dXJhbEVhcnRoSUkub3BhY2l0eSA9IDEuMDtcbiAgbmF0dXJhbEVhcnRoSUkuaXNSZXF1aXJlZEZvclJlbmRlcmluZyA9IHRydWU7XG4gIHJlc3VsdC5wdXNoKG5ldyBCYXNlTWFwVmlld01vZGVsKHtcbiAgICBpbWFnZTogcmVxdWlyZShcIi4uLy4uL3d3d3Jvb3QvaW1hZ2VzL25hdHVyYWwtZWFydGgucG5nXCIpLFxuICAgIGNhdGFsb2dJdGVtOiBuYXR1cmFsRWFydGhJSVxuICB9KSk7XG4gIHZhciBibGFja01hcmJsZSA9IG5ldyBXZWJNYXBTZXJ2aWNlQ2F0YWxvZ0l0ZW0odGVycmlhKTtcbiAgYmxhY2tNYXJibGUubmFtZSA9IFwiTkFTQSBCbGFjayBNYXJibGVcIjtcbiAgYmxhY2tNYXJibGUudXJsID0gXCJodHRwOi8vZ2Vvc2VydmVyLm5hdGlvbmFsbWFwLm5pY3RhLmNvbS5hdS9pbWFnZXJ5L25hc2EtYmxhY2stbWFyYmxlL3dtc1wiO1xuICBibGFja01hcmJsZS5sYXllcnMgPSBcIm5hc2EtYmxhY2stbWFyYmxlOmRuYl9sYW5kX29jZWFuX2ljZS4yMDEyLjU0MDAweDI3MDAwX2dlb1wiO1xuICBibGFja01hcmJsZS5wYXJhbWV0ZXJzID0ge1xuICAgIHRpbGVkOiB0cnVlXG4gIH07XG4gIGJsYWNrTWFyYmxlLm9wYWNpdHkgPSAxLjA7XG4gIGJsYWNrTWFyYmxlLmlzUmVxdWlyZWRGb3JSZW5kZXJpbmcgPSB0cnVlO1xuICByZXN1bHQucHVzaChuZXcgQmFzZU1hcFZpZXdNb2RlbCh7XG4gICAgaW1hZ2U6IHJlcXVpcmUoXCIuLi8uLi93d3dyb290L2ltYWdlcy9ibGFjay1tYXJibGUucG5nXCIpLFxuICAgIGNhdGFsb2dJdGVtOiBibGFja01hcmJsZVxuICB9KSk7XG4gIHZhciBwb3NpdHJvbiA9IG5ldyBPcGVuU3RyZWV0TWFwQ2F0YWxvZ0l0ZW0odGVycmlhKTtcbiAgcG9zaXRyb24ubmFtZSA9IFwiUG9zaXRyb24gKExpZ2h0KVwiO1xuICBwb3NpdHJvbi51cmwgPSBcImh0dHBzOi8vZ2xvYmFsLnNzbC5mYXN0bHkubmV0L2xpZ2h0X2FsbC9cIjsgLy8gaHR0cHM6Ly9jYXJ0b2RiLmNvbS9iYXNlbWFwcy8gZ2l2ZXMgdHdvIGRpZmZlcmVudCBhdHRyaWJ1dGlvbiBzdHJpbmdzLiBJbiBhbnkgY2FzZSBIVE1MIGdldHMgc3dhbGxvd2VkLCBzbyB3ZSBoYXZlIHRvIGFkYXB0LlxuICAvLyAxIFwiJmNvcHk7IDxhIGhyZWY9XCJodHRwOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycywgJmNvcHk7XG4gIC8vICAgPGEgaHJlZj1cImh0dHA6Ly9jYXJ0b2RiLmNvbS9hdHRyaWJ1dGlvbnNcIj5DYXJ0b0RCPC9hPlwiXG4gIC8vIDIgTWFwIHRpbGVzIGJ5IDxhIGhyZWY9XCJodHRwOi8vY2FydG9kYi5jb20vYXR0cmlidXRpb25zI2Jhc2VtYXBzXCI+Q2FydG9EQjwvYT4sIHVuZGVyIDxhIGhyZWY9XCJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnkvMy4wL1wiPlxuICAvLyAgIENDIEJZIDMuMDwvYT4uIERhdGEgYnkgPGEgaHJlZj1cImh0dHA6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvXCI+T3BlblN0cmVldE1hcDwvYT4sIHVuZGVyIE9EYkwuXG5cbiAgcG9zaXRyb24uYXR0cmlidXRpb24gPSBcIsKpIE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzIE9EYkwsIMKpIENhcnRvREIgQ0MtQlkgMy4wXCI7XG4gIHBvc2l0cm9uLm9wYWNpdHkgPSAxLjA7XG4gIHBvc2l0cm9uLnN1YmRvbWFpbnMgPSBbXCJjYXJ0b2RiLWJhc2VtYXBzLWFcIiwgXCJjYXJ0b2RiLWJhc2VtYXBzLWJcIiwgXCJjYXJ0b2RiLWJhc2VtYXBzLWNcIiwgXCJjYXJ0b2RiLWJhc2VtYXBzLWRcIl07XG4gIHJlc3VsdC5wdXNoKG5ldyBCYXNlTWFwVmlld01vZGVsKHtcbiAgICBpbWFnZTogcmVxdWlyZShcIi4uLy4uL3d3d3Jvb3QvaW1hZ2VzL3Bvc2l0cm9uLnBuZ1wiKSxcbiAgICBjYXRhbG9nSXRlbTogcG9zaXRyb24sXG4gICAgY29udHJhc3RDb2xvcjogXCIjMDAwMDAwXCJcbiAgfSkpO1xuICB2YXIgZGFya01hdHRlciA9IG5ldyBPcGVuU3RyZWV0TWFwQ2F0YWxvZ0l0ZW0odGVycmlhKTtcbiAgZGFya01hdHRlci5uYW1lID0gXCJEYXJrIE1hdHRlclwiO1xuICBkYXJrTWF0dGVyLnVybCA9IFwiaHR0cHM6Ly9nbG9iYWwuc3NsLmZhc3RseS5uZXQvZGFya19hbGwvXCI7XG4gIGRhcmtNYXR0ZXIuYXR0cmlidXRpb24gPSBcIsKpIE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzIE9EYkwsIMKpIENhcnRvREIgQ0MtQlkgMy4wXCI7XG4gIGRhcmtNYXR0ZXIub3BhY2l0eSA9IDEuMDtcbiAgZGFya01hdHRlci5zdWJkb21haW5zID0gW1wiY2FydG9kYi1iYXNlbWFwcy1hXCIsIFwiY2FydG9kYi1iYXNlbWFwcy1iXCIsIFwiY2FydG9kYi1iYXNlbWFwcy1jXCIsIFwiY2FydG9kYi1iYXNlbWFwcy1kXCJdO1xuICByZXN1bHQucHVzaChuZXcgQmFzZU1hcFZpZXdNb2RlbCh7XG4gICAgaW1hZ2U6IHJlcXVpcmUoXCIuLi8uLi93d3dyb290L2ltYWdlcy9kYXJrLW1hdHRlci5wbmdcIiksXG4gICAgY2F0YWxvZ0l0ZW06IGRhcmtNYXR0ZXJcbiAgfSkpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVHbG9iYWxCYXNlTWFwT3B0aW9uczsiLCIndXNlIHN0cmljdCc7XG4vKmdsb2JhbCByZXF1aXJlKi9cblxudmFyIEFyY0dpc01hcFNlcnZlckNhdGFsb2dJdGVtID0gcmVxdWlyZSgndGVycmlhanMvbGliL01vZGVscy9BcmNHaXNNYXBTZXJ2ZXJDYXRhbG9nSXRlbScpO1xuXG52YXIgQmFzZU1hcFZpZXdNb2RlbCA9IHJlcXVpcmUoJ3RlcnJpYWpzL2xpYi9WaWV3TW9kZWxzL0Jhc2VNYXBWaWV3TW9kZWwnKTtcblxudmFyIGNyZWF0ZVVTQmFzZU1hcE9wdGlvbnMgPSBmdW5jdGlvbiBjcmVhdGVVU0Jhc2VNYXBPcHRpb25zKHRlcnJpYSkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciB1c2FUb3BvID0gbmV3IEFyY0dpc01hcFNlcnZlckNhdGFsb2dJdGVtKHRlcnJpYSk7XG4gIHVzYVRvcG8udXJsID0gJ2h0dHBzOi8vYmFzZW1hcC5uYXRpb25hbG1hcC5nb3YvYXJjZ2lzL3Jlc3Qvc2VydmljZXMvVVNHU1RvcG8vTWFwU2VydmVyJztcbiAgdXNhVG9wby5vcGFjaXR5ID0gMS4wO1xuICB1c2FUb3BvLmlzUmVxdWlyZWRGb3JSZW5kZXJpbmcgPSB0cnVlO1xuICB1c2FUb3BvLm5hbWUgPSAnVVNBIFRvcG9ncmFwaHknO1xuICB1c2FUb3BvLmFsbG93RmVhdHVyZVBpY2tpbmcgPSBmYWxzZTtcbiAgcmVzdWx0LnB1c2gobmV3IEJhc2VNYXBWaWV3TW9kZWwoe1xuICAgIGltYWdlOiByZXF1aXJlKCcuLi8uLi93d3dyb290L2ltYWdlcy91c2EtdG9wby5wbmcnKSxcbiAgICBjYXRhbG9nSXRlbTogdXNhVG9wbyxcbiAgICBjb250cmFzdENvbG9yOiAnIzAwMDAwMCdcbiAgfSkpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVVU0Jhc2VNYXBPcHRpb25zOyIsIid1c2Ugc3RyaWN0Jztcbi8qZ2xvYmFsIHJlcXVpcmUqL1xuXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJ3RlcnJpYWpzLWNlc2l1bS9Tb3VyY2UvQ29yZS9kZWZpbmVkJylbXCJkZWZhdWx0XCJdO1xuXG52YXIga25vY2tvdXQgPSByZXF1aXJlKCd0ZXJyaWFqcy1jZXNpdW0vU291cmNlL1RoaXJkUGFydHkva25vY2tvdXQnKVtcImRlZmF1bHRcIl07XG4vKipcclxuICogU2VsZWN0cyBhIGJhc2UgbWFwIGJ5IG5hbWUgZnJvbSBhIGxpc3Qgb2YgYmFzZSBtYXAgb3B0aW9ucy4gIFRoZSBuYW1lIGlzIHNwZWNpZmllZCBieSBgdGVycmlhLmJhc2VNYXBOYW1lYCwgb3IsXHJcbiAqIGlmIHRoYXQgcHJvcGVydHkgaXMgdW5kZWZpbmVkLCBieSB0aGUgc3BlY2lmaWVkIGBkZWZhdWx0QmFzZU1hcE5hbWVgLiAgSW4gYWRkaXRpb24gdG8gc2V0dGluZyBgdGVycmlhLmJhc2VNYXBgLFxyXG4gKiB0aGlzIGZ1bmN0aW9uIHN1YnNjcmliZXMgdG8gYmUgbm90aWZpZWQgd2hlbiBgdGVycmlhLmJhc2VNYXBOYW1lYCBjaGFuZ2VzIGFuZCB1cGRhdGVzIGB0ZXJyaWEuYmFzZU1hcGBcclxuICogYWNjb3JkaW5nbHkuICBJZiBhIGJhc2UgbWFwIHdpdGggdGhlIG5hbWUgaXMgbm90IGluIHRoZSBgYmFzZU1hcHNgIGxpc3QsIHRoaXMgbWV0aG9kIGxlYXZlcyB0aGVcclxuICogYHRlcnJpYS5iYXNlTWFwYCBwcm9wZXJ0eSB1bm1vZGlmaWVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1RlcnJpYX0gdGVycmlhIFRoZSBUZXJyaWFKUyBhcHBsaWNhdGlvbi5cclxuICogQHBhcmFtIHtCYXNlTWFwVmlld01vZGVsW119IGJhc2VNYXBzIFRoZSBsaXN0IG9mIHBvc3NpYmxlIGJhc2UgbWFwcy5cclxuICogQHBhcmFtIHtzdHJpbmd9IGRlZmF1bHRCYXNlTWFwTmFtZSBUaGUgbmFtZSBvZiB0aGUgYmFzZSBtYXAgdG8gc2VhcmNoIGZvci5cclxuICogQHBhcmFtIHtib29sZWFufSB1c2VTdG9yZWRQcmVmZXJlbmNlIElmIHRydWUsIGxvb2sgZm9yIGFuZCB1c2UgYSBsb2NhbFN0b3JhZ2UgcHJlZmVyZW5jZSBpbnN0ZWFkLlxyXG4gKiBAcmV0dXJucyB7QmFzZU1hcFZpZXdNb2RlbH0gVGhlIG1hdGNoaW5nIGJhc2UgbWFwLCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxyXG4gKi9cblxuXG52YXIgc2VsZWN0QmFzZU1hcCA9IGZ1bmN0aW9uIHNlbGVjdEJhc2VNYXAodGVycmlhLCBiYXNlTWFwcywgZGVmYXVsdEJhc2VNYXBOYW1lLCB1c2VTdG9yZWRQcmVmZXJlbmNlKSB7XG4gIGZ1bmN0aW9uIHVwZGF0ZUJhc2VNYXAoYmFzZU1hcE5hbWUpIHtcbiAgICBpZiAoIWRlZmluZWQoYmFzZU1hcE5hbWUpKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZU1hcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChiYXNlTWFwc1tpXS5jYXRhbG9nSXRlbS5uYW1lID09PSBiYXNlTWFwTmFtZSkge1xuICAgICAgICB0ZXJyaWEuYmFzZU1hcCA9IGJhc2VNYXBzW2ldLmNhdGFsb2dJdGVtO1xuICAgICAgICB0ZXJyaWEuYmFzZU1hcENvbnRyYXN0Q29sb3IgPSBiYXNlTWFwc1tpXS5jb250cmFzdENvbG9yO1xuICAgICAgICByZXR1cm4gdGVycmlhLmJhc2VNYXA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGtub2Nrb3V0LmdldE9ic2VydmFibGUodGVycmlhLCAnYmFzZU1hcE5hbWUnKS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgIHVwZGF0ZUJhc2VNYXAodGVycmlhLmJhc2VNYXBOYW1lKTtcbiAgfSk7XG5cbiAgaWYgKGJhc2VNYXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIgYmFzZU1hcDtcblxuICBpZiAodXNlU3RvcmVkUHJlZmVyZW5jZSkge1xuICAgIGJhc2VNYXAgPSB1cGRhdGVCYXNlTWFwKHRlcnJpYS5nZXRMb2NhbFByb3BlcnR5KCdiYXNlbWFwJykpO1xuICB9XG5cbiAgYmFzZU1hcCA9IGJhc2VNYXAgfHwgdXBkYXRlQmFzZU1hcCh0ZXJyaWEuYmFzZU1hcE5hbWUpIHx8IHVwZGF0ZUJhc2VNYXAoZGVmYXVsdEJhc2VNYXBOYW1lKSB8fCB1cGRhdGVCYXNlTWFwKGJhc2VNYXBzWzBdLmNhdGFsb2dJdGVtLm5hbWUpO1xuICByZXR1cm4gYmFzZU1hcDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VsZWN0QmFzZU1hcDsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBzdHlsZT1cXFwiYm9yZGVyOjFweCBzb2xpZCByZWQ7IGJhY2tncm91bmQ6aHNsYSgwLDUwJSw1MCUsMC4yKTsgcGFkZGluZzogMC41ZW07XFxcIj5cXG48aDI+RGV2ZWxvcG1lbnQgc2l0ZTwvaDI+XFxuPHA+WW91IGFyZSB2aWV3aW5nIGEgc2l0ZSBvdGhlciB0aGFuIHRoZSBvZmZpY2lhbCBwcm9kdWN0aW9uIHNpdGUuIEl0IG1heSBub3Qgb3BlcmF0ZSBhcyB5b3UgZXhwZWN0LjwvcD5cXG48L2Rpdj5cXG5cIiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2PlxcbjxwPlRoZSBzdWdnZXN0aW9ucyBhbmQgaWxsdXN0cmF0aW9ucyBpbmNsdWRlZCBpbiB0aGlzIG1hcCBhcmUgaW50ZW5kZWQgZm9yIHNjaWVudGlmaWMgcmVzZWFyY2g7IGhvd2V2ZXIsIHRoZXkgZG8gbm90IGd1YXJhbnRlZSB0aGUgc2FmZXR5IG9mIGFuIGluZGl2aWR1YWwgb3Igc3RydWN0dXJlLiBUaGUgY29udHJpYnV0b3JzIGFuZCBzcG9uc29ycyBvZiB0aGlzIHByb2R1Y3QgZG8gbm90IGFzc3VtZSBsaWFiaWxpdHkgZm9yIGFueSBpbmp1cnksIGRlYXRoLCBwcm9wZXJ0eSBkYW1hZ2UsIG9yIG90aGVyIGVmZmVjdHMgYmVjYXVzZSBvZiB1c2luZyB0aWhzIG1hcC4gQW55IHVzZSBvZiB0cmFkZSwgZmlybSwgb3IgcHJvZHVjdCBuYW1lcyBpcyBmb3IgZGVzY3JpcHRpdmUgcHVycG9zZXMgb25seSBhbmQgZG9lcyBub3QgaW1wbHkgZW5kb3JzZW1lbnQgYnkgdGhlIFUuUy4gR292ZXJubWVudC4gVGhpcyBtYXAgbXVzdCBub3QgYmUgdXNlZCBmb3IgbmF2aWdhdGlvbiBvciBwcmVjaXNlIHNwYXRpYWwgYW5hbHlzaXMuXFxuPC9kaXY+XFxuXCIiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuXG52YXIgX3Byb3BUeXBlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInByb3AtdHlwZXNcIikpO1xuXG52YXIgX01lbnVQYW5lbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInRlcnJpYWpzL2xpYi9SZWFjdFZpZXdzL1N0YW5kYXJkVXNlckludGVyZmFjZS9jdXN0b21pemFibGUvTWVudVBhbmVsLmpzeFwiKSk7XG5cbnZhciBfcGFuZWwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvUmVhY3RWaWV3cy9NYXAvUGFuZWxzL3BhbmVsLnNjc3NcIikpO1xuXG52YXIgX3JlbGF0ZWRNYXBzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9yZWxhdGVkLW1hcHMuc2Nzc1wiKSk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImNsYXNzbmFtZXNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gUmVsYXRlZE1hcHMocHJvcHMpIHtcbiAgdmFyIGRyb3Bkb3duVGhlbWUgPSB7XG4gICAgaW5uZXI6IF9yZWxhdGVkTWFwc1tcImRlZmF1bHRcIl0uZHJvcGRvd25Jbm5lcixcbiAgICBpY29uOiBcImdhbGxlcnlcIlxuICB9O1xuICByZXR1cm4gX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9NZW51UGFuZWxbXCJkZWZhdWx0XCJdLCB7XG4gICAgdGhlbWU6IGRyb3Bkb3duVGhlbWUsXG4gICAgYnRuVGV4dDogXCJSZWxhdGVkIE1hcHNcIixcbiAgICBzbWFsbFNjcmVlbjogcHJvcHMuc21hbGxTY3JlZW4sXG4gICAgdmlld1N0YXRlOiBwcm9wcy52aWV3U3RhdGUsXG4gICAgYnRuVGl0bGU6IFwiU2VlIHJlbGF0ZWQgbWFwc1wiXG4gIH0sIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXNbXCJkZWZhdWx0XCJdKShfcGFuZWxbXCJkZWZhdWx0XCJdLmhlYWRlcilcbiAgfSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge1xuICAgIGNsYXNzTmFtZTogX3BhbmVsW1wiZGVmYXVsdFwiXS5oZWFkaW5nXG4gIH0sIFwiUmVsYXRlZCBNYXBzXCIpKSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIkNsaWNraW5nIG9uIGEgbWFwIGJlbG93IHdpbGwgb3BlbiBpdCBpbiBhIHNlcGFyYXRlIHdpbmRvdyBvciB0YWIuXCIpLCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzW1wiZGVmYXVsdFwiXSkoX3BhbmVsW1wiZGVmYXVsdFwiXS5zZWN0aW9uLCBfcmVsYXRlZE1hcHNbXCJkZWZhdWx0XCJdLnNlY3Rpb24pXG4gIH0sIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImFcIiwge1xuICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICBocmVmOiBcImh0dHA6Ly9uYXRpb25hbG1hcC5nb3YuYXUvcmVuZXdhYmxlcy9cIlxuICB9LCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwge1xuICAgIGNsYXNzTmFtZTogX3JlbGF0ZWRNYXBzW1wiZGVmYXVsdFwiXS5pbWFnZSxcbiAgICBzcmM6IHJlcXVpcmUoXCIuLi8uLi93d3dyb290L2ltYWdlcy9hcmVtaS5qcGdcIiksXG4gICAgYWx0OiBcIkFSRU1JXCJcbiAgfSkpLCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtcbiAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgY2xhc3NOYW1lOiBfcmVsYXRlZE1hcHNbXCJkZWZhdWx0XCJdLmxpbmssXG4gICAgaHJlZjogXCJodHRwOi8vbmF0aW9uYWxtYXAuZ292LmF1L3JlbmV3YWJsZXMvXCJcbiAgfSwgXCJBUkVNSVwiKSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIkFSRU1JIHByb3ZpZGVzIGFjY2VzcyB0byBBdXN0cmFsaWFuIHNwYXRpYWwgZGF0YSByZWxldmFudCB0byB0aGUgUmVuZXdhYmxlIEVuZXJneSBpbmR1c3RyeSwgc291cmNlZCBmcm9tIEdvdmVybm1lbnQsIEluZHVzdHJ5IGFuZCBSZXNlYXJjaC5cIikpLCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzW1wiZGVmYXVsdFwiXSkoX3BhbmVsW1wiZGVmYXVsdFwiXS5zZWN0aW9uLCBfcmVsYXRlZE1hcHNbXCJkZWZhdWx0XCJdLnNlY3Rpb24pXG4gIH0sIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImFcIiwge1xuICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICBocmVmOiBcImh0dHA6Ly9uYXRpb25hbG1hcC5nb3YuYXUvbm9ydGhlcm5hdXN0cmFsaWEvXCJcbiAgfSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHtcbiAgICBjbGFzc05hbWU6IF9yZWxhdGVkTWFwc1tcImRlZmF1bHRcIl0uaW1hZ2UsXG4gICAgc3JjOiByZXF1aXJlKFwiLi4vLi4vd3d3cm9vdC9pbWFnZXMvbm9ydGhlcm5hdXN0cmFsaWEuanBnXCIpLFxuICAgIGFsdDogXCJOb3J0aGVybiBBdXN0cmFsaWFcIlxuICB9KSksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImFcIiwge1xuICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICBjbGFzc05hbWU6IF9yZWxhdGVkTWFwc1tcImRlZmF1bHRcIl0ubGluayxcbiAgICBocmVmOiBcImh0dHA6Ly9uYXRpb25hbG1hcC5nb3YuYXUvbm9ydGhlcm5hdXN0cmFsaWEvXCJcbiAgfSwgXCJOb3J0aGVybiBBdXN0cmFsaWFcIiksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgXCJUaGUgTm9ydGhlcm4gQXVzdHJhbGlhIE5hdGlvbmFsTWFwIGZvcm1zIHBhcnQgb2YgdGhlIEdvdmVybm1lbnQncyBjb21taXRtZW50IHRvIGRldmVsb3Bpbmcgbm9ydGhlcm4gQXVzdHJhbGlhIGJ5IHByb3ZpZGluZyBlYXN5IGFjY2VzcyB0byBhdXRob3JpdGF0aXZlIGFuZCBvdGhlciBzcGF0aWFsIGRhdGEgb24gbm9ydGhlcm4gQXVzdHJhbGlhIHRvIGdvdmVybm1lbnRzLCBidXNpbmVzcyBhbmQgdGhlIHB1YmxpYy4gTW9yZSBpbmZvcm1hdGlvbiBvbiB0aGUgR292ZXJubWVudCdzIFdoaXRlIFBhcGVyIG9uIERldmVsb3BpbmcgTm9ydGhlcm4gQXVzdHJhbGlhIGlzIGF2YWlsYWJsZSBoZXJlOlwiLCBcIiBcIiwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiYVwiLCB7XG4gICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgIGNsYXNzTmFtZTogX3JlbGF0ZWRNYXBzW1wiZGVmYXVsdFwiXS5saW5rLFxuICAgIGhyZWY6IFwiaHR0cHM6Ly9ub3J0aGVybmF1c3RyYWxpYS5kcG1jLmdvdi5hdVwiXG4gIH0sIFwiaHR0cHM6Ly9ub3J0aGVybmF1c3RyYWxpYS5kcG1jLmdvdi5hdVwiKSwgXCIuXCIpKSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lc1tcImRlZmF1bHRcIl0pKF9wYW5lbFtcImRlZmF1bHRcIl0uc2VjdGlvbiwgX3JlbGF0ZWRNYXBzW1wiZGVmYXVsdFwiXS5zZWN0aW9uKVxuICB9LCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtcbiAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgaHJlZjogXCJodHRwOi8vbmVpaXZpZXdlci5uaWN0YS5jb20uYXVcIlxuICB9LCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwge1xuICAgIGNsYXNzTmFtZTogX3JlbGF0ZWRNYXBzW1wiZGVmYXVsdFwiXS5pbWFnZSxcbiAgICBzcmM6IHJlcXVpcmUoXCIuLi8uLi93d3dyb290L2ltYWdlcy9uZWlpLmpwZ1wiKSxcbiAgICBhbHQ6IFwiTkVJSSBWaWV3ZXJcIlxuICB9KSksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImFcIiwge1xuICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICBjbGFzc05hbWU6IF9yZWxhdGVkTWFwc1tcImRlZmF1bHRcIl0ubGluayxcbiAgICBocmVmOiBcImh0dHA6Ly93d3cubmVpaS5nb3YuYXUvdmlld2VyL1wiXG4gIH0sIFwiTkVJSSBWaWV3ZXJcIiksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgXCJUaGUgTmF0aW9uYWwgRW52aXJvbm1lbnRhbCBJbmZvcm1hdGlvbiBJbmZyYXN0cnVjdHVyZSAoTkVJSSkgaXMgYW4gaW5mb3JtYXRpb24gcGxhdGZvcm0gZGVzaWduZWQgdG8gaW1wcm92ZSBkaXNjb3ZlcnksIGFjY2VzcyBhbmQgcmUtdXNlIG9mIG5hdGlvbmFsbHkgc2lnbmlmaWNhbnQgZW52aXJvbm1lbnRhbCBkYXRhLiBNb3JlIGluZm9ybWF0aW9uIG9uIHRoZSBORUlJIGlzIGF2YWlsYWJsZSBoZXJlOlwiLCBcIiBcIiwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiYVwiLCB7XG4gICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgIGNsYXNzTmFtZTogX3JlbGF0ZWRNYXBzW1wiZGVmYXVsdFwiXS5saW5rLFxuICAgIGhyZWY6IFwiaHR0cDovL25laWkuZ292LmF1L2RhdGEtdmlld2VyXCJcbiAgfSwgXCJuZWlpLmdvdi5hdS9kYXRhLXZpZXdlclwiKSwgXCIuXCIpKSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lc1tcImRlZmF1bHRcIl0pKF9wYW5lbFtcImRlZmF1bHRcIl0uc2VjdGlvbiwgX3JlbGF0ZWRNYXBzW1wiZGVmYXVsdFwiXS5zZWN0aW9uKVxuICB9LCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtcbiAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgaHJlZjogXCJodHRwOi8vbWFwLmF1cmluLm9yZy5hdVwiXG4gIH0sIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImltZ1wiLCB7XG4gICAgY2xhc3NOYW1lOiBfcmVsYXRlZE1hcHNbXCJkZWZhdWx0XCJdLmltYWdlLFxuICAgIHNyYzogcmVxdWlyZShcIi4uLy4uL3d3d3Jvb3QvaW1hZ2VzL2F1cmluLW1hcC5qcGdcIiksXG4gICAgYWx0OiBcIkFVUklOIE1hcFwiXG4gIH0pKSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiYVwiLCB7XG4gICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgIGNsYXNzTmFtZTogX3JlbGF0ZWRNYXBzW1wiZGVmYXVsdFwiXS5saW5rLFxuICAgIGhyZWY6IFwiaHR0cDovL21hcC5hdXJpbi5vcmcuYXVcIlxuICB9LCBcIkFVUklOIE1hcFwiKSwgX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIkFVUklOIE1hcCBwcm92aWRlcyBhY2Nlc3MgdG8gZGF0YXNldHMgb24gdXJiYW4gaW5mcmFzdHJ1Y3R1cmUgZm9yIHVyYmFuIHJlc2VhcmNoZXJzLCBwb2xpY3kgYW5kIGRlY2lzaW9uIG1ha2Vycy5cIikpKTtcbn1cblxuUmVsYXRlZE1hcHMucHJvcFR5cGVzID0ge1xuICB2aWV3U3RhdGU6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm9iamVjdC5pc1JlcXVpcmVkLFxuICBzbWFsbFNjcmVlbjogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uYm9vbFxufTtcbnZhciBfZGVmYXVsdCA9IFJlbGF0ZWRNYXBzO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gVXNlckludGVyZmFjZTtcblxudmFyIF9Hcm91cHMgPSByZXF1aXJlKFwidGVycmlhanMvbGliL1JlYWN0Vmlld3MvU3RhbmRhcmRVc2VySW50ZXJmYWNlL2N1c3RvbWl6YWJsZS9Hcm91cHNcIik7XG5cbnZhciBfTWVhc3VyZVRvb2wgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvUmVhY3RWaWV3cy9NYXAvTmF2aWdhdGlvbi9NZWFzdXJlVG9vbFwiKSk7XG5cbnZhciBfTWVudUl0ZW0gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvUmVhY3RWaWV3cy9TdGFuZGFyZFVzZXJJbnRlcmZhY2UvY3VzdG9taXphYmxlL01lbnVJdGVtXCIpKTtcblxudmFyIF9wcm9wVHlwZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpKTtcblxudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcblxudmFyIF9SZWxhdGVkTWFwcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vUmVsYXRlZE1hcHNcIikpO1xuXG52YXIgX1NwbGl0UG9pbnQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvUmVhY3RWaWV3cy9TcGxpdFBvaW50XCIpKTtcblxudmFyIF9TdGFuZGFyZFVzZXJJbnRlcmZhY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvUmVhY3RWaWV3cy9TdGFuZGFyZFVzZXJJbnRlcmZhY2UvU3RhbmRhcmRVc2VySW50ZXJmYWNlLmpzeFwiKSk7XG5cbnZhciBfdmVyc2lvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3ZlcnNpb25cIikpO1xuXG5yZXF1aXJlKFwiLi9nbG9iYWwuc2Nzc1wiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkgeyBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07IHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG5cbmZ1bmN0aW9uIGxvYWRBdWdtZW50ZWRWaXJ0dWFsaXR5KGNhbGxiYWNrKSB7XG4gIHJlcXVpcmUuZW5zdXJlKFwidGVycmlhanMvbGliL1JlYWN0Vmlld3MvTWFwL05hdmlnYXRpb24vQXVnbWVudGVkVmlydHVhbGl0eVRvb2xcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBBdWdtZW50ZWRWaXJ0dWFsaXR5VG9vbCA9IHJlcXVpcmUoXCJ0ZXJyaWFqcy9saWIvUmVhY3RWaWV3cy9NYXAvTmF2aWdhdGlvbi9BdWdtZW50ZWRWaXJ0dWFsaXR5VG9vbFwiKTtcblxuICAgIGNhbGxiYWNrKEF1Z21lbnRlZFZpcnR1YWxpdHlUb29sKTtcbiAgfSwgXCJBdWdtZW50ZWRWaXJ0dWFsaXR5XCIpO1xufVxuXG5mdW5jdGlvbiBpc0Jyb3dzZXJTdXBwb3J0ZWRBVigpIHtcbiAgcmV0dXJuIC9BbmRyb2lkfGlQaG9uZXxpUGFkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbn1cblxuZnVuY3Rpb24gVXNlckludGVyZmFjZShwcm9wcykge1xuICByZXR1cm4gX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9TdGFuZGFyZFVzZXJJbnRlcmZhY2VbXCJkZWZhdWx0XCJdLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHtcbiAgICB2ZXJzaW9uOiBfdmVyc2lvbltcImRlZmF1bHRcIl1cbiAgfSksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfR3JvdXBzLk1lbnUsIG51bGwsIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfTWVudUl0ZW1bXCJkZWZhdWx0XCJdLCB7XG4gICAgY2FwdGlvbjogXCJBYm91dFwiLFxuICAgIGhyZWY6IFwiYWJvdXQuaHRtbFwiLFxuICAgIGtleTogXCJhYm91dC1saW5rXCJcbiAgfSkpLCBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX0dyb3Vwcy5OYXYsIG51bGwsIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfTWVhc3VyZVRvb2xbXCJkZWZhdWx0XCJdLCB7XG4gICAgdGVycmlhOiBwcm9wcy52aWV3U3RhdGUudGVycmlhLFxuICAgIGtleTogXCJtZWFzdXJlLXRvb2xcIlxuICB9KSksIF9yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfR3JvdXBzLkV4cGVyaW1lbnRhbE1lbnUsIG51bGwsIGlzQnJvd3NlclN1cHBvcnRlZEFWKCkgPyBfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX1NwbGl0UG9pbnRbXCJkZWZhdWx0XCJdLCB7XG4gICAgbG9hZENvbXBvbmVudDogbG9hZEF1Z21lbnRlZFZpcnR1YWxpdHksXG4gICAgdmlld1N0YXRlOiBwcm9wcy52aWV3U3RhdGUsXG4gICAgdGVycmlhOiBwcm9wcy52aWV3U3RhdGUudGVycmlhLFxuICAgIGV4cGVyaW1lbnRhbFdhcm5pbmc6IHRydWVcbiAgfSkgOiBudWxsKSk7XG59XG5cblVzZXJJbnRlcmZhY2UucHJvcFR5cGVzID0ge1xuICB0ZXJyaWE6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm9iamVjdCxcbiAgdmlld1N0YXRlOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5vYmplY3Rcbn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcInJjU2xpZGVyVG9vbHRpcFpvb21Eb3duSW5cIjpcInRtLWdsb2JhbF9fcmNTbGlkZXJUb29sdGlwWm9vbURvd25JblwiLFwicmNTbGlkZXJUb29sdGlwWm9vbURvd25PdXRcIjpcInRtLWdsb2JhbF9fcmNTbGlkZXJUb29sdGlwWm9vbURvd25PdXRcIn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImRyb3Bkb3duLWlubmVyXCI6XCJ0bS1yZWxhdGVkLW1hcHNfX2Ryb3Bkb3duLWlubmVyXCIsXCJkcm9wZG93bklubmVyXCI6XCJ0bS1yZWxhdGVkLW1hcHNfX2Ryb3Bkb3duLWlubmVyXCIsXCJzZWN0aW9uXCI6XCJ0bS1yZWxhdGVkLW1hcHNfX3NlY3Rpb24gdG0tX2Jhc2VfX2NsZWFyZml4XCIsXCJpbWFnZVwiOlwidG0tcmVsYXRlZC1tYXBzX19pbWFnZVwiLFwibGlua1wiOlwidG0tcmVsYXRlZC1tYXBzX19saW5rIHRtLV9iYXNlX19saW5rXCJ9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSByZW5kZXJVaTtcblxudmFyIF9yZWFjdERvbSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5cbnZhciBfcmVkYm94UmVhY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWRib3gtcmVhY3RcIikpO1xuXG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gcmVuZGVyVWkodGVycmlhLCBhbGxCYXNlTWFwcywgdmlld1N0YXRlKSB7XG4gIHZhciByZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIFVJID0gcmVxdWlyZShcIi4vVXNlckludGVyZmFjZVwiKVtcImRlZmF1bHRcIl07XG5cbiAgICBfcmVhY3REb21bXCJkZWZhdWx0XCJdLnJlbmRlcihfcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoVUksIHtcbiAgICAgIHRlcnJpYTogdGVycmlhLFxuICAgICAgYWxsQmFzZU1hcHM6IGFsbEJhc2VNYXBzLFxuICAgICAgdmlld1N0YXRlOiB2aWV3U3RhdGVcbiAgICB9KSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1aVwiKSk7XG4gIH07XG5cbiAgaWYgKG1vZHVsZS5ob3QgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgLy8gU3VwcG9ydCBob3QgcmVsb2FkaW5nIG9mIGNvbXBvbmVudHNcbiAgICAvLyBhbmQgZGlzcGxheSBhbiBvdmVybGF5IGZvciBydW50aW1lIGVycm9yc1xuICAgIHZhciByZW5kZXJBcHAgPSByZW5kZXI7XG5cbiAgICB2YXIgcmVuZGVyRXJyb3IgPSBmdW5jdGlvbiByZW5kZXJFcnJvcihlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yLnN0YWNrKTtcblxuICAgICAgX3JlYWN0RG9tW1wiZGVmYXVsdFwiXS5yZW5kZXIoX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9yZWRib3hSZWFjdFtcImRlZmF1bHRcIl0sIHtcbiAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgICB9KSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1aVwiKSk7XG4gICAgfTtcblxuICAgIHJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlbmRlckFwcCgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVuZGVyRXJyb3IoZXJyb3IpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vVXNlckludGVyZmFjZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXRUaW1lb3V0KHJlbmRlcik7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9ICdyZXZlcnRfYmFja19oZXJlLTE4Mi1nMGRjMWJlZDMgKHBsdXMgbG9jYWwgbW9kaWZpY2F0aW9ucyknOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjhlZGZiZTQ5Zjg1ZTY5OTRlYmI3MzJhMTEwYTNjNTAyLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjRiYzliMTQzNzQ3MjYwZGFkNzFmZDk5NTFiMzY0ZTNhLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImU4ZWI5NWJkNjM3MmY5NmQyMTUyMzIxNzkzMDJhNjJiLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjRhYWZiM2I3ODUzNTU5YWJiMWRiNjliNThmY2Y5NDg1LnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImJmYzQ2Zjk3ZTkzMjY2MDBkODdjNjIxZjc1MjI4ZTcyLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZlZjE3ZjRmY2ZjYWNmNTAyM2Y0MDg2MjZhYjMwOWIzLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjJhMjJlZjYwNjM1MzMwNjRiY2ZjYjAzZGQwODkzZDcyLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjRjMWM3NGMxMTg4ZWY3MWI1Yjc4MTFhMzljODY5ZmM2LnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjhmYzZkZTQ5YzhiZWYwYTg5ZjI1Y2E5YmEzN2RlYjgxLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImY1YWQwNzhkNmQ0ZmY3ZmMwOGVmNmEzMTA1ZGMyZWY5LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImVkZjI0YmVkNDAzNDE0ODlkMGYzMjc0ZWQ5OTQwYmI1LnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjYxNjZjZTliOTU1ZTkxNjgyNmE5MTMwOWM5YTM2NzE5LnBuZ1wiOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDeERBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hFQTtBQUNBOzs7Ozs7Ozs7OztBQ0RBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0F5QkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3REQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=