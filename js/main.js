let map1BaseSpec;


/* ==================================================
   MAP 1
================================================== */


// Colours used when one species is selected
const map1SpeciesColours = {
  "All species": "#5d8a66",
  "Red Kangaroo": "#c9785b",
  "Eastern Grey Kangaroo": "#899a86",
  "Western Grey Kangaroo": "#d2a55f",
  "Common Wallaroo": "#9a8675",
  "Swamp Wallaby": "#6f9997",
  "Red-necked Wallaby": "#9b8391"
};


// Load Map 1 specification
fetch("specs/map1.json")

  .then(response => {

    if (!response.ok) {
      throw new Error("Could not load specs/map1.json");
    }

    return response.json();

  })

  .then(spec => {

    map1BaseSpec = spec;

    renderMap1("All species");

  })

  .catch(error => {

    console.error(
      "Error loading Map 1:",
      error
    );

  });


// Render Map 1
function renderMap1(selectedSpecies) {

  // Copy original specification
  const spec = JSON.parse(
    JSON.stringify(map1BaseSpec)
  );


  // Observation points are the second layer
  const pointLayer = spec.layer[1];


  // Make sure transform exists
  if (!pointLayer.transform) {
    pointLayer.transform = [];
  }


  // Make sure mark is an object
  if (typeof pointLayer.mark === "string") {

    pointLayer.mark = {
      type: pointLayer.mark
    };

  }


  /* ==================================================
     ALL SPECIES
     One grid cell = one circle
  ================================================== */

  if (selectedSpecies === "All species") {


    // Convert observation values to numbers
    pointLayer.transform.push({
      calculate: "toNumber(datum.Observations)",
      as: "ObsForMap"
    });


    // Combine all species inside the same 0.25° grid cell
    pointLayer.transform.push({
      aggregate: [
        {
          op: "sum",
          field: "ObsForMap",
          as: "Observations"
        }
      ],
      groupby: [
        "Latitude",
        "Longitude"
      ]
    });


    // Remove species colour encoding
    if (pointLayer.encoding.color) {
      delete pointLayer.encoding.color;
    }


    // Neutral colour for combined observations
    pointLayer.mark.color =
      map1SpeciesColours["All species"];


    // Tooltip for aggregated grid cells
    pointLayer.encoding.tooltip = [

      {
        field: "Latitude",
        type: "quantitative",
        title: "Latitude",
        format: ".2f"
      },

      {
        field: "Longitude",
        type: "quantitative",
        title: "Longitude",
        format: ".2f"
      },

      {
        field: "Observations",
        type: "quantitative",
        title: "Total observations",
        format: ","
      }

    ];

  }


  /* ==================================================
     SINGLE SPECIES
  ================================================== */

  else {


    // Only keep selected species
    pointLayer.transform.push({
      filter: `datum.Species == '${selectedSpecies}'`
    });


    // Remove species legend because dropdown already shows it
    if (pointLayer.encoding.color) {
      delete pointLayer.encoding.color;
    }


    // Use species-specific colour
    pointLayer.mark.color =
      map1SpeciesColours[selectedSpecies];


    // Tooltip for selected species
    pointLayer.encoding.tooltip = [

      {
        field: "Species",
        type: "nominal",
        title: "Species"
      },

      {
        field: "State",
        type: "nominal",
        title: "State"
      },

      {
        field: "Latitude",
        type: "quantitative",
        title: "Latitude",
        format: ".2f"
      },

      {
        field: "Longitude",
        type: "quantitative",
        title: "Longitude",
        format: ".2f"
      },

      {
        field: "Observations",
        type: "quantitative",
        title: "Observations",
        format: ","
      }

    ];

  }


  /* ==================================================
     REDUCE OVERLAPPING
  ================================================== */


  // More transparent circles
  pointLayer.mark.opacity = 0.55;


  // Thin white outline helps separate nearby circles
  pointLayer.mark.stroke = "#ffffff";

  pointLayer.mark.strokeWidth = 0.35;


  // Smaller proportional symbols
  pointLayer.encoding.size = {

    field: "Observations",

    type: "quantitative",

    title: "Observations",

    scale: {

      type: "sqrt",

      range: [
        6,
        190
      ]

    },

    legend: {

      title: "Observations",

      orient: "right",

      values: [
        1000,
        2000,
        4000,
        8000
      ],

      labelExpr: "format(datum.value, ',.0f')"

    }

  };


  /* ==================================================
     RENDER MAP 1
  ================================================== */


  vegaEmbed(

    "#map1",

    spec,

    {

      actions: false,

      renderer: "svg"

    }

  )

  .then(() => {

    console.log(
      `Map 1 rendered successfully: ${selectedSpecies}`
    );

  })

  .catch(error => {

    console.error(
      "Error rendering Map 1:",
      error
    );

  });

}



/* ==================================================
   MAP 1 DROPDOWN
================================================== */


const speciesFilter =
  document.getElementById("species-filter");


if (speciesFilter) {

  speciesFilter.addEventListener(

    "change",

    function () {

      renderMap1(
        this.value
      );

    }

  );

}



/* ==================================================
   MAP 2
================================================== */


vegaEmbed(

  "#map2",

  "specs/map2.json",

  {

    actions: false,

    renderer: "svg"

  }

)

.then(() => {

  console.log(
    "Map 2 rendered successfully"
  );

})

.catch(error => {

  console.error(
    "Error rendering Map 2:",
    error
  );

});



/* ==================================================
   CHART 3 — STATE × SPECIES HEATMAP
================================================== */


vegaEmbed(

  "#chart3",

  "specs/chart3.json",

  {

    actions: false,

    renderer: "svg"

  }

)

.then(() => {

  console.log(
    "Chart 3 rendered successfully"
  );

})

.catch(error => {

  console.error(
    "Error rendering Chart 3:",
    error
  );

});



/* ==================================================
   CHART 4 — OBSERVATION TRENDS
================================================== */


vegaEmbed(

  "#chart4",

  "specs/chart4.json",

  {

    actions: false,

    renderer: "svg"

  }

)

.then(() => {

  console.log(
    "Chart 4 rendered successfully"
  );

})

.catch(error => {

  console.error(
    "Error rendering Chart 4:",
    error
  );

});



/* ==================================================
   NORMALISED ALLUVIAL / SANKEY
================================================== */


vegaEmbed(

  "#sankey",

  "specs/sankey.json",

  {

    actions: false,

    renderer: "svg"

  }

)

.then(() => {

  console.log(
    "Sankey rendered successfully"
  );

})

.catch(error => {

  console.error(
    "Error rendering Sankey:",
    error
  );

});



/* ==================================================
   BUMP CHART — NATIONAL SPECIES RANKING
================================================== */


vegaEmbed(

  "#bump",

  "specs/bump.json",

  {

    actions: false,

    renderer: "svg"

  }

)

.then(() => {

  console.log(
    "Bump chart rendered successfully"
  );

})

.catch(error => {

  console.error(
    "Error rendering Bump chart:",
    error
  );

});



/* ==================================================
   CHART 5 — GOVERNMENT POPULATION ESTIMATES
================================================== */


vegaEmbed(

  "#chart5",

  "specs/chart5.json",

  {

    actions: false,

    renderer: "svg"

  }

)

.then(() => {

  console.log(
    "Chart 5 rendered successfully"
  );

})

.catch(error => {

  console.error(
    "Error rendering Chart 5:",
    error
  );

});



/* ==================================================
   CHART 6 — POPULATION TILE GRID MAP
================================================== */


vegaEmbed(

  "#chart6",

  "specs/chart6.json",

  {

    actions: false,

    renderer: "svg"

  }

)

.then(() => {

  console.log(
    "Chart 6 rendered successfully"
  );

})

.catch(error => {

  console.error(
    "Error rendering Chart 6:",
    error
  );

});



/* ==================================================
   CHART 7 — QUOTA VS HARVEST BULLET CHART
================================================== */


vegaEmbed(

  "#chart7",

  "specs/chart7.json",

  {

    actions: false,

    renderer: "svg"

  }

)

.then(() => {

  console.log(
    "Chart 7 rendered successfully"
  );

})

.catch(error => {

  console.error(
    "Error rendering Chart 7:",
    error
  );

});



/* ==================================================
   CHART 8 — HARVEST QUOTA UTILISATION HEATMAP
================================================== */


vegaEmbed(

  "#chart8",

  "specs/chart8.json",

  {

    actions: false,

    renderer: "svg"

  }

)

.then(() => {

  console.log(
    "Chart 8 rendered successfully"
  );

})

.catch(error => {

  console.error(
    "Error rendering Chart 8:",
    error
  );

});



/* ==================================================
   CHART 9 — RAINFALL × POPULATION
================================================== */


vegaEmbed(

  "#chart9",

  "specs/chart9.json",

  {

    actions: false,

    renderer: "svg"

  }

)

.then(() => {

  console.log(
    "Chart 9 rendered successfully"
  );

})

.catch(error => {

  console.error(
    "Error rendering Chart 9:",
    error
  );

});