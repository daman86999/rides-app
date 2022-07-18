import { gql } from '@apollo/client';

export const UPDATE_DRIVER = gql`
  mutation updateDriver(
    $drivername: name = ""
    $driverphonenumber: numeric = ""
    $email: String = ""
    $status: String = ""
    $baserate: numeric = ""
    $cabmodel: String = ""
    $cabtype: String = ""
    $carbrand: String = ""
    $registrationnumber: String = ""
    $driverid: String = ""
  ) {
    update_driver(
      where: { email: { _eq: $email } }
      _set: {
        drivername: $drivername
        driverphonenumber: $driverphonenumber
        status: $status
      }
    ) {
      returning {
        id
      }
    }
  }
`;
