import moment from 'moment';

export default function (timestamptz) {
  return moment(timestamptz).format('DD-MM-YYYY h:mm:ss');
}
