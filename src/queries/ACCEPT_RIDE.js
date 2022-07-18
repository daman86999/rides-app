import { gql } from '@apollo/client';

export const ACCEPT_RIDE = gql`
  mutation MyMutation($id: Int = 10, $driverid: String = "") {
    update_rides_by_pk(
      pk_columns: { id: $id }
      _set: { driverid: $driverid, ridestatus: "confirmed" }
    ) {
      id
    }
  }
`;
