const makeGeoJSON = (data) => {
  return {
    type: "FeatureCollection",
    features: data.map((feature) => {
      return {
        type: "Feature",
        properties: {
          id: feature.countryInfo?._id,
          value: feature.cases,
        },
        geometry: {
          type: "Point",
          coordinates: [feature.countryInfo.long, feature.countryInfo.lat],
        },
      };
    }),
  };
};

export default makeGeoJSON;
