require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  'dojo/_base/lang',
  "esri/renderers/SimpleRenderer",
  "esri/symbols/LineSymbol3DLayer",
  "esri/symbols/LineSymbol3D",
  "esri/widgets/TimeSlider",
  "esri/widgets/Expand",
  "esri/widgets/Legend",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Home",
  "esri/widgets/ScaleBar",
  "esri/widgets/Search",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/Graphic",

], (Map,
  SceneView,
  FeatureLayer,
  lang,
  SimpleRenderer,
  LineSymbol3DLayer,
  LineSymbol3D,
  TimeSlider,
  Expand,
  Legend,
  BasemapGallery,
  Home,
  ScaleBar,
  Search,
  QueryTask,
  Query,
  Graphic) => {

/// SIMBOLOGIA ///

const colorsB = [[255, 255, 0, 0.6], [255, 255, 255, 0.6], [255, 127, 127, 0.6]];

const commonPropertiesB = {
  type: "simple-marker",
  // width: "4px",
  size: "10px",
  style: "circle",
  outline: null,
};

// Symbol for Interstate highways
const CaptiveSym = {
  ...commonPropertiesB,
  color: colorsB[0]
};

// Symbol for U.S. Highways
const DomesticSym = {
  ...commonPropertiesB,
  color: colorsB[1]
};

// Symbol for state highways
const WildSym = {
  ...commonPropertiesB,
  color: colorsB[2]
}/* ;

// Symbol for other major highways
const A4Sym = {
  ...commonProperties,
  color: colorsB[3]
};

// Symbol for other major highways
const A5Sym = {
  ...commonProperties,
  color: colorsB[4]
}; */

// Symbol for other major highways
//   const otherSym = {
//   ...commonProperties,
//   color: colors[5]
//  };



const brotesRenderer = {
  type: "unique-value", // autocasts as new UniqueValueRenderer()
  legendOptions: {
    title: "Route type"
  },
  //defaultSymbol: otherSym,
  //defaultLabel: "Other",
  field: "is_wild",

  uniqueValueInfos: [
    {
      value: "Captive", // code for interstates/freeways
      symbol: CaptiveSym,
      label: "Interstate"
    },
    {
      value: "Domestic", // code for U.S. highways
      symbol: DomesticSym,
      label: "US Highway"
    },
    {
      value: "Wild", // code for U.S. highways
      symbol: WildSym,
      label: "State Highway"
    }/* ,
    {
      value: "A4", // code for U.S. highways
      symbol: A4Sym,
      label: "Major road"
    },
    {
      value: "A5", // code for U.S. highways
      symbol: A5Sym,
      label: "Major road"
    } */
  ]
};
  //////////////////////////////////////////////////////////////////
  ///FEATURE BROTES///
  // Request feature layers and overwrite renderer 

  let layerViewBrotes;
  const featureLayerBrotes = new FeatureLayer({
    url: "https://gis.inia.es/server/rest/services/CISA/brotes_FAO_XY/MapServer/0",
    copyright: "Carlos Blanco Urbina",
    title: "Brotes",
    outFields: ['*'],
    returnGeometry: false,
    visible: true,
    timeInfo: {
      startField: "observation_date",
      interval: {
        unit: "days",
        value: 1
      }
    },
renderer: brotesRenderer,
    /* renderer: {
      type: "simple",
      field: "Types",

      symbol: {
        type: "simple-marker",
        label: "Brotes",
        style: "circle",
        size: "10px",
        outline: null,
        color: [255, 0, 0, 0.4]
      },

      label: "Brotes Aviar",

    }, */

    popupTemplate: {
      title: "Pais: {country}",
      content: getInfoBrotes,
      visible: false,
      returnGeometry: true,
      fieldInfos: [
        {
          fieldName: 'reporting_date',
          format: {
            dateFormat: 'short-date'
          }
        }
      ],
    },
  });


  function getInfoBrotes(feature) {
    content = "<p>Fuente: <b>{diagnosis_source}</b> " +
      "<ul><li>Localización: {city}, {country}.</li>" +
      "<li>Fecha del informe: {observation_date}.</li>" +
      "<li>Especie: {species}.</li>" +
      "<li>Serotipo: {serotype}.</li>" +
      "<li>Más información: <a href='http://empres-i.fao.org/eipws3g/2/obd?idOutbreak={event_id}'> Enlace</a></li>";

    return content;

  }



  //////////////////////////////////////////////////////////////////
  ///FEATURE ALERTAS///

  /// SIMBOLOGIA ///

  const colors = [[255, 150, 150, 0.6], [255, 120, 120, 0.6], [255, 80, 80, 0.6], [255, 40, 40, 0.6], [255, 0, 0], [5, 5, 5, 0.6]];

  const commonProperties = {
    type: "simple-marker",
    // width: "4px",
    size: "10px",
    style: "triangle",
    outline: null,
  };

  // Symbol for Interstate highways
  const A1Sym = {
    ...commonProperties,
    color: colors[0]
  };

  // Symbol for U.S. Highways
  const A2Sym = {
    ...commonProperties,
    color: colors[1]
  };

  // Symbol for state highways
  const A3Sym = {
    ...commonProperties,
    color: colors[2]
  };

  // Symbol for other major highways
  const A4Sym = {
    ...commonProperties,
    color: colors[3]
  };

  // Symbol for other major highways
  const A5Sym = {
    ...commonProperties,
    color: colors[4]
  };

  // Symbol for other major highways
 //   const otherSym = {
  //   ...commonProperties,
  //   color: colors[5]
 //  };

  

  const alertasRenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    legendOptions: {
      title: "Route type"
    },
    //defaultSymbol: otherSym,
    //defaultLabel: "Other",
    field: "riesgo",

    uniqueValueInfos: [
      {
        value: "A1", // code for interstates/freeways
        symbol: A1Sym,
        label: "Interstate"
      },
      {
        value: "A2", // code for U.S. highways
        symbol: A2Sym,
        label: "US Highway"
      },
      {
        value: "A3", // code for U.S. highways
        symbol: A3Sym,
        label: "State Highway"
      },
      {
        value: "A4", // code for U.S. highways
        symbol: A4Sym,
        label: "Major road"
      },
      {
        value: "A5", // code for U.S. highways
        symbol: A5Sym,
        label: "Major road"
      }
    ]
  };

  let layerViewAlertas;

  // Request feature layers and overwrite renderer 
  const featureLayerAlertas = new FeatureLayer({
    url: "https://gis.inia.es/server/rest/services/CISA/alertas_DFS/MapServer/0",
    copyright: "Carlos Blanco Urbina",
    title: "Alertas",
    outFields: ['*'],
    returnGeometry: false,
    visible: true,
    timeInfo: {
      startField: "date",

    },
    renderer: alertasRenderer,
    /* renderer: {
      type: "simple",
      field: "Types",

      symbol: {
        type: "simple-marker",
        label: "Type animal",
        style: "triangle",
        size: "10px",
        outline: null,
        color: [255, 0, 0, 0.4]
      },

      label: "Alertas España",

    }, */

    /* renderer: {
      type: "simple",
      symbol: {
        type: "simple-marker",
        style: "triangle",
        color: [255, 0, 0, 0.5],
        outline: null
      },
      visualVariables: [
        {
          type: "size",
          field: "valor",
          stops: [
            {
              value: 1,
              size: "0px"
            },{
              value: 100,
              size: "0px"
            },
            {
              value: 150,
              size: "10px"
            },
            {
              value: 200,
              size: "20px"
            },
            {
              value: 300,
              size: "30px"
            },
            {
              value: 600,
              size: "40px"
            },
            {
              value: 1000,
              size: "50px"
            }
          ]
        },
      ]
    }, */


    popupTemplate: {
      title: "Nivel de alerta: {Riesgo}" + " Fecha: {date}" + "<a href='{informe}'></a>",
      content: getInfoAlertas,
      visible: false,
      returnGeometry: true,
      fieldInfos: [
        {
          fieldName: 'reporting_date',
          format: {
            dateFormat: 'short-date'
          }
        }
      ],
    },
  });


  function getInfoAlertas(feature) {
    content = "Comarca: {nombre_cg}" +
      "<li><a href={informe}> Informe </a></li>";

    return content;

  }

  // Create the Map
  const map = new Map({
    basemap: "dark-gray-vector",
    layers: [featureLayerBrotes, featureLayerAlertas]
  });

  // Create the SceneView and set initial camera
  const view = new SceneView({
    container: "viewDiv",
    map: map,
    camera: {
      position: {
        latitude: 7.00000,
        longitude: 22.00000,
        z: 7034560
      },
      tilt: 16.5,
      heading: 1
    },


    highlightOptions: {
      color: "cyan"
    }
  });

  view.constraints = {

    minScale: 147000000
  };

  // Agregar la leyenda
  const legendExpand = new Expand({
    collapsedIconClass: "esri-icon-legend",
    expandIconClass: "esri-icon-legend",
    expandTooltip: "Legend",
    view: view,
    content: new Legend({
      view: view
    }),
    expanded: false
  });
  view.ui.add(legendExpand, "top-left");


  //// SCALEBAR

  var scaleBar = new ScaleBar({
    view: view,
    unit: "metric",
    estilo: "line",
  });
  // Add widget to the bottom left corner of the view
  view.ui.add(scaleBar, {
    position: "bottom-right",

  });

  /// SEARCH WIDGET
  var searchWidget = new Search({
    view: view
  });
  // Add the search widget to the top right corner of the view
  view.ui.add(searchWidget, {
    position: "top-right"
  });

  /// WIDGET DE MAPAS BASES

  var basemapGallery = new BasemapGallery({
    view: view,
    container: document.createElement("div")
  });

  /// BASEMAP GALLERY

  // Create an Expand instance and set the content
  // property to the DOM node of the basemap gallery widget
  // Use an Esri icon font to represent the content inside
  // of the Expand widget
  var bgExpand = new Expand({
    collapsedIconClass: "esri-icon-basemap",
    expandIconClass: "esri-icon-basemap",
    expandTooltip: "Mapas",
    content: basemapGallery,
    view: view
  });

  // close the expand whenever a basemap is selected
  basemapGallery.watch("activeBasemap", function () {
    var mobileSize =
      view.heightBreakpoint === "xsmall" ||
      view.widthBreakpoint === "xsmall";

    if (mobileSize) {
      bgExpand.collapse();
    }
  });

  // Add the expand instance to the ui

  view.ui.add(bgExpand, "top-right");

  /// WIDGET DE HOME PARA LA VISTA INICIAL
  var homeBtn = new Home({
    view: view,

  });

  // Add the home button to the top left corner of the view
  view.ui.add(homeBtn, "top-right");

  ///TIMESLIDER DE BROTES

  const timeSliderBrotes = new TimeSlider({
    container: "timeSliderBrotes",
    // la propiedad "playRate" del widgetb es el tiempo (en milisegundos) entre los pasos de la animación. Este valor predeterminado es 1000. 
    playRate: 100,
    view: featureLayerBrotes,
    stops: {
      interval: {
        value: 1,
        unit: "days"
      }
    }
  });
  view.ui.add(timeSliderBrotes, "manual");

  // espera hasta que se cargue la vista de capa
  view.whenLayerView(featureLayerBrotes).then(function (lv) {
    layerViewBrotes = lv;

    // hora de inicio del control deslizante de tiempo
    const startBrotes = new Date();
    startBrotes.setHours(0, 0, 0, 0);
    startBrotes.setDate(startBrotes.getDate() + (7 - startBrotes.getDay() - 6));
    startBrotes.setDate(startBrotes.getDate() - 800);

    const LastMonday = new Date();
    LastMonday.setHours(0, 0, 0, 0);
    LastMonday.setDate(LastMonday.getDate() + (7 - LastMonday.getDay() - 6));

    // set time slider's full extent to
    // until end date of layer's fullTimeExtent
    timeSliderBrotes.fullTimeExtent = {
      start: startBrotes,
      end: LastMonday
    };
    const endBrotes = new Date(LastMonday);
    endBrotes.setDate(endBrotes.getDate() - 91);

    timeSliderBrotes.values = [endBrotes, LastMonday];
  });

  

  ///FIN TIMESLIDER DE BROTES

  ///TIMESLIDER DE ALERTAS
  const timeSliderAlertas = new TimeSlider({
    container: "timeSliderAlertas",
    // la propiedad "playRate" del widgetb es el tiempo (en milisegundos) entre los pasos de la animación. Este valor predeterminado es 1000. 
    playRate: 100,
    view: featureLayerAlertas,
    stops: {
      interval: {
        value: 1,
        unit: "weeks"
      }
    }
  });
  view.ui.add(timeSliderAlertas, "manual");

  // espera hasta que se cargue la vista de capa
  view.whenLayerView(featureLayerAlertas).then(function (lv) {
    layerViewAlertas = lv;

    // hora de inicio del control deslizante de tiempo
    const startAlertas = new Date();
    startAlertas.setHours(0, 0, 0, 0);
    startAlertas.setDate(startAlertas.getDate() + (7 - startAlertas.getDay() - 6));
    startAlertas.setDate(startAlertas.getDate() - 800);

    const LastMonday = new Date();
    LastMonday.setHours(0, 0, 0, 0);
    LastMonday.setDate(LastMonday.getDate() + (7 - LastMonday.getDay() - 6));

    // set time slider's full extent to
    // until end date of layer's fullTimeExtent
    timeSliderAlertas.fullTimeExtent = {
      start: startAlertas,
      end: LastMonday
    };
    const endAlertas = new Date(LastMonday);
    endAlertas.setDate(endAlertas.getDate() - 91);

    timeSliderAlertas.values = [endAlertas, LastMonday];
  });

  ///FIN TIMESLIDER DE ALERTAS




});

///BOTÓN DE BROTES
$("#myButtonBrotes").remove();

function ShowHideTimeSliderBrotes() {
  let text = " ";

  if ($("#myButtonBrotes").text() === 'Brotes') {
    $("#timeSliderBrotes").show();
    text = '<i class="esri-icon-non-visible" ></i>';
  }
  else {
    $("#timeSliderBrotes").hide();
    text = 'Brotes';
  }
  $("#myButtonBrotes").html(text);
}

/// BOTÓN DE ALERTAS
$("#timeSliderAlertas").remove();

function ShowHideTimeSliderAlertas() {
  let text = " ";

  if ($("#myButtonAlerta").text() === "Alertas") {
    $("#timeSliderAlertas").show();
    text = '<i class="esri-icon-non-visible" ></i>';
  }
  else {
    $("#timeSliderAlertas").hide();
    text = "Alertas";
  }
  $("#myButtonAlerta").html(text);
}
