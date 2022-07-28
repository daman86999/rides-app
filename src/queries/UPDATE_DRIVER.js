import { gql } from '@apollo/client';

export const UPDATE_DRIVER = gql`
  mutation updateDriver(
    $drivername: name = ""
    $driverphonenumber: numeric = ""
    $email: String = ""
    $status: String = ""
    $driverid: String = ""
  ) {
    update_driver(
      where: { driverid: { _eq: $driverid } }
      _set: {
        drivername: $drivername
        driverphonenumber: $driverphonenumber
        email: $email
        status: $status
      }
    ) {
      returning {
        id
      }
    }
  }
`;
