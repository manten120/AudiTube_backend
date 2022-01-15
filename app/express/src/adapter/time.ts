import moment from 'moment';

export const getCurrentUTC = () => moment().utc().format();
