export const inputStatusInitDummy = {
  resource_data: {
    flight_scale_data: "empty",
    per_flight_scale_data: "empty",
    total_person_resource_data: "empty",
  },
  analytics_data: {
    candidate_data: "empty",
    route_min_distribution_data: "empty",
    round_trip_normalization_func: "empty",
  },
  airport_data: { HND: "empty", ICN: "empty", NRT: "empty" },
};

export const inputStatusExampleDummy = {
  resource_data: {
    flight_scale_data: "submitted",
    per_flight_scale_data: "submitted",
    total_person_resource_data: "submitted",
  },
  analytics_data: {
    candidate_data: "empty",
    route_min_distribution_data: "empty",
    round_trip_normalization_func: "empty",
  },
  airport_data: { HND: "inputting", ICN: "empty", NRT: "empty" },
};
