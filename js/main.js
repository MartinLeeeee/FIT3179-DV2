let map1BaseSpec;


/* ==================================================
   MAP 1
================================================== */

// Load map1 specification
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


// Render Map 1
function renderMap1(selectedSpecies) {

  // Copy the original specification
  const spec = JSON.parse(
    JSON.stringify(map1BaseSpec)
  );


  // Second layer contains observation points
  const pointLayer = spec.layer[1];


  // Apply species filter
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