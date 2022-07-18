import { gql } from '@apollo/client';

export const GET_DRIVER_RIDES = gql`
  query getDriverRides($driverid: String = "") {
    driver(where: { driverid: { _eq: $driverid } }) {
      rides(order_by: { rideendtime: asc_nulls_first }) {
        id
        ridecartyperequested
        rideendlocation
        riderequesttime
        rideendtime
        ridestartlocation
        ridestarttime
        ridestatus
      }
    }
  }
`;
