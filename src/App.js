import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";
import { heatMapLayer, makeGeoJSON } from "./utils";

function App() {
  const [getCases, setCases] = useState(undefined);
  const [loading, setLoading] = useState(true);

  // Set our initial map variables
  const [viewport, setViewport] = useState({
    latitude: 55.8609825,
    longitude: -4.2488787,
    zoom: 4,
    width: "100vw",
    height: "100vh",
  });

  /**
   * Get our data on the first render, and prevent from
   * fetching on subsequent renders. If our request fails
   * or takes too long, then clean up.
   */
  useEffect(() => {
    let isCancelled = false;
    let source = axios.CancelToken.source();
    function getFetchUrl() {
      return "https://corona.lmao.ninja/v2/countries";
    }
    async function fetchData() {
      let result;
      if (!isCancelled) {
        result = await axios(getFetchUrl());
      }
      setCases(result.data);
      setLoading(false);
    }

    fetchData();

    return () => {
      isCancelled = true;
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  // Convert our JSON to GeoJSON
  let data;
  if (!loading) {
    data = makeGeoJSON(getCases);
  }

  return (
    <div className="App">
      {loading && <h1>Loading</h1>}
      {!loading && (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle="mapbox://styles/mapbox/dark-v9"
        >
          {!loading && (
            <Source type="geojson" data={data}>
              <Layer {...heatMapLayer} />
            </Source>
          )}
        </ReactMapGL>
      )}
    </div>
  );
}

export default App;
