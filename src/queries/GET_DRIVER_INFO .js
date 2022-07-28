import { gql } from '@apollo/client';

export const GET_DRIVER_INFO = gql`
  query getDriverinfo($driverid: String = "") {
    driver(where: { driverid: { _eq: $driverid } }) {
      drivername
      driverid
      driverphonenumber
      email
      id
      joiningdate
      status
      cab {
        baserate
        cabmodel
        cabtype
        carbrand
        driverid
        id
        registrationnumber
      }
    }
  }
`;
