import { gql } from '@apollo/client';

export const INSERT_CAB = gql`
  mutation insertcab(
    $baserate: numeric = ""
    $cabmodel: String = ""
    $cabtype: String = ""
    $carbrand: String = ""
    $driverid: String = ""
    $registrationnumber: String = ""
  ) {
    insert_cabs(
      objects: {
        baserate: $baserate
        cabmodel: $cabmodel
        cabtype: $cabtype
        carbrand: $carbrand
        driverid: $driverid
        registrationnumber: $registrationnumber
      }
    ) {
      returning {
        id
        driverid
      }
    }
  }
`;
