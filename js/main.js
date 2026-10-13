let map1BaseSpec;


/* ==================================================
   MAP 1
================================================== */

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

    console.error("Error loading Map 1:", error);

  });


function renderMap1(selectedSpecies) {

  const spec = JSON.parse(
    JSON.stringify(map1BaseSpec)
  );

  const pointLayer = spec.layer[1];

  if (selectedSpecies !== "All species") {

    pointLayer.transform.push({
      filter: `datum.Species == '${selectedSpecies}'`
    });

  }

  vegaEmbed(
    "#map1",
    spec,
    {
      actions: false,
      renderer: "svg"
    }
  )
  .then(() => {

    console.log("Map 1 rendered successfully");

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

      renderMap1(this.value);

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

  console.log("Map 2 rendered successfully");

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

  console.log("Chart 3 rendered successfully");

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

  console.log("Chart 4 rendered successfully");

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

  console.log("Sankey rendered successfully");

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

  console.log("Bump chart rendered successfully");

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

  console.log("Chart 5 rendered successfully");

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

  console.log("Chart 6 rendered successfully");

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

  console.log("Chart 7 rendered successfully");

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

  console.log("Chart 8 rendered successfully");

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

  console.log("Chart 9 rendered successfully");

})
.catch(error => {

  console.error(
    "Error rendering Chart 9:",
    error
  );

});