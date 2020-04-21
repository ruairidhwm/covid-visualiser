const MAX_ZOOM_LEVEL = 9;

const heatMapLayer = {
  maxzoom: MAX_ZOOM_LEVEL,
  type: "heatmap",
  threshold: 0.03,
  radiusPixels: 30,
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      1,
      MAX_ZOOM_LEVEL,
      80,
    ],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(10,0,0,0)",
      0.2,
      "rgb(100,0,0)",
      0.4,
      "rgb(120,0,0)",
      0.6,
      "rgb(1300,0,0)",
      0.8,
      "rgb(140,0,0)",
      2.1,
      "rgb(255,0, 0)",
    ],
    // Adjust the heatmap radius by zoom level
    "heatmap-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      2,
      MAX_ZOOM_LEVEL,
      30,
    ],
    // Transition from heatmap to circle layer by zoom level
    "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
  },
};

export default heatMapLayer;
