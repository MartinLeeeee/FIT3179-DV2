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
  console.error("Error rendering Chart 4:", error);
});

/* ==================================================
   CHART 5 — RAINFALL VS OBSERVATION RECORDS
================================================== */

async function renderChart5() {

  try {

    /* ------------------------------------------
       Load both original CSV files
    ------------------------------------------ */

    const loader = vega.loader();


    const [
      observationText,
      rainfallText,
      chart5Response
    ] = await Promise.all([

      loader.load(
        "data/kangaroo_wallaby_state_year_2021_2025.csv"
      ),

      loader.load(
        "data/rainfall_2010_2024.csv"
      ),

      fetch(
        "specs/chart5.json"
      )

    ]);


    if (!chart5Response.ok) {

      throw new Error(
        "Could not load specs/chart5.json"
      );

    }


    /* ------------------------------------------
       Convert CSV text into JavaScript objects
    ------------------------------------------ */

    const observationData = vega.read(
      observationText,
      {
        type: "csv",
        parse: "auto"
      }
    );


    const rainfallData = vega.read(
      rainfallText,
      {
        type: "csv",
        parse: "auto"
      }
    );


    const chart5Spec =
      await chart5Response.json();


    /* ------------------------------------------
       Only regions available in both datasets
    ------------------------------------------ */

    const allowedRegions = [
      "NSW/ACT",
      "VIC",
      "QLD",
      "SA",
      "WA"
    ];


    /* ------------------------------------------
       Aggregate ALA observations

       NSW + ACT must be combined because
       BOM provides rainfall as NSW/ACT
    ------------------------------------------ */

    const observationTotals = {};


    observationData.forEach(row => {

      const year = Number(row.Year);

      const observations =
        Number(row.Observations);


      /* Chart 5 only compares 2021–2024 */

      if (
        year < 2021 ||
        year > 2024
      ) {
        return;
      }


      let region =
        row.StateCode;


      if (
        region === "NSW" ||
        region === "ACT"
      ) {

        region = "NSW/ACT";

      }


      if (
        !allowedRegions.includes(region)
      ) {
        return;
      }


      const key =
        `${year}-${region}`;


      if (
        !observationTotals[key]
      ) {

        observationTotals[key] = 0;

      }


      observationTotals[key] +=
        observations;

    });


    /* ------------------------------------------
       Join rainfall with observation totals
    ------------------------------------------ */

    const mergedData = [];


    rainfallData.forEach(row => {

      const year =
        Number(row.Year);

      const region =
        row.State;

      const rainfall =
        Number(row.Rainfall_mm);


      if (
        year < 2021 ||
        year > 2024
      ) {
        return;
      }


      if (
        !allowedRegions.includes(region)
      ) {
        return;
      }


      const key =
        `${year}-${region}`;


      if (
        observationTotals[key] === undefined
      ) {
        return;
      }


      mergedData.push({

        Year: year,

        Region: region,

        Rainfall_mm: rainfall,

        Observations:
          observationTotals[key]

      });

    });


    /* ------------------------------------------
       Debugging

       Should return 20 rows:
       5 regions × 4 years
    ------------------------------------------ */

    console.log(
      "Chart 5 merged data:",
      mergedData
    );


    console.log(
      "Chart 5 rows:",
      mergedData.length
    );


    /* ------------------------------------------
       Put merged values into chart5.json
    ------------------------------------------ */

    chart5Spec.data = {
      values: mergedData
    };


    /* ------------------------------------------
       Render
    ------------------------------------------ */

    await vegaEmbed(
      "#chart5",
      chart5Spec,
      {
        actions: false,
        renderer: "svg"
      }
    );


    console.log(
      "Chart 5 rendered successfully"
    );


  }

  catch (error) {

    console.error(
      "Error rendering Chart 5:",
      error
    );

  }

}


renderChart5();