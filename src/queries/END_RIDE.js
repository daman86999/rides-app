import { gql } from '@apollo/client';

export const END_RIDE = gql`
  mutation endRide(
    $id: Int = 10
    $driverid: String = ""
    $rideendtime: timestamptz = ""
  ) {
    update_rides_by_pk(
      pk_columns: { id: $id }
      _set: {
        driverid: $driverid
        ridestatus: "confirmed"
        rideendtime: $rideendtime
      }
    ) {
      id
    }
  }
`;
