import { gql } from '@apollo/client';

export const GET_AVAILABLE_RIDES = gql`
  query MyQuery {
    rides(where: { ridestatus: { _eq: "awaited" } }) {
      riderequesttime
      ridestartlocation
      ridestatus
      ridestarttime
      id
      rideendlocation
    }
  }
`;
