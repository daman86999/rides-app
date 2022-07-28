import { gql } from '@apollo/client';

export const START_RIDE = gql`
  mutation startRide(
    $id: Int = 10
    $driverid: String = ""
    $ridestarttime: timestamptz = ""
  ) {
    update_rides_by_pk(
      pk_columns: { id: $id }
      _set: {
        driverid: $driverid
        ridestatus: "confirmed"
        ridestarttime: $ridestarttime
      }
    ) {
      id
    }
  }
`;
