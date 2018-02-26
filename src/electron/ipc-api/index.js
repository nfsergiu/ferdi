import autoUpdate from './autoUpdate';
import settings from './settings';
import appIndicator from './appIndicator';
import services from './services';

export default (params) => {
  settings(params);
  autoUpdate(params);
  appIndicator(params);
  services(params);
};
