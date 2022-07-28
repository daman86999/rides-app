import { gql } from '@apollo/client';

export const UPDATE_CAB = gql`
  mutation MyMutation(
    $driverid: String = ""
    $baserate: numeric = ""
    $cabmodel: String = ""
    $cabtype: String = ""
    $carbrand: String = ""
    $registrationnumber: String = ""
  ) {
    update_cabs(
      where: { driverid: { _eq: $driverid } }
      _set: {
        baserate: $baserate
        cabmodel: $cabmodel
        cabtype: $cabtype
        carbrand: $carbrand
        registrationnumber: $registrationnumber
      }
    ) {
      returning {
        id
      }
    }
  }
`;
