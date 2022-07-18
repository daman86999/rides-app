import { gql } from '@apollo/client';

export const GET_DRIVER = gql`
  query getDriver($email: String = "") {
    driver(where: { email: { _iregex: $email } }) {
      driverid
      drivername
      driverphonenumber
      email
      id
      joiningdate
    }
  }
`;
