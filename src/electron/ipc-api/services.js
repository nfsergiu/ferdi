import { ipcMain } from 'electron';

import ServiceView from '../ServiceView';

export default ({ mainWindow }) => {
  const serviceViews = new ServiceView(mainWindow);

  ipcMain.on('services', (event, args) => {
    serviceViews.update(args);
  });
};
