import { BrowserView } from 'electron';
import { computed, observable, autorun } from 'mobx';

const TABBAR_WIDTH = 68;

export default class ServiceView {
  win = null;
  @observable services = [];
  @observable viewStore = {};

  constructor(win) {
    this.window = win;

    autorun(this.createBrowserViews.bind(this));
    autorun(this.activate.bind(this));
  }

  @computed get activeService() {
    const activeService = this.services.find(service => service.isActive);
    console.log('activeService', activeService);

    return activeService;
  }

  update(services) {
    this.services = services || [];
  }

  createBrowserViews() {
    this.services.forEach((service) => {
      if (!this.viewStore[service.id]) {
        console.log('createBrowserView for', service.id, 'isActive', service.isActive, service);
        const view = new BrowserView({
          webPreferences: {
            nodeIntegration: false,
          },
        });

        view.webContents.loadURL(service.url);
        view.setAutoResize({ width: true, height: true });

        this.viewStore = Object.assign(this.viewStore, {
          [`${service.id}`]: view,
        });
      }
    });
  }

  activate() {
    const windowSize = this.window.getContentSize();
    const view = this.viewStore[this.activeService.id];

    this.services.forEach((service) => {
      console.log('service debug shit', service.id, 'isActive', service.isActive, service);
    });

    // console.log('view', view);
    // console.log('viewStore', this.viewStore);
    console.log('activeService', this.activeService.id);

    if (!view) return;

    console.log('set webview', windowSize, view);

    this.window.setBrowserView(view);
    view.setBounds({ x: TABBAR_WIDTH, y: 0, width: windowSize[0] - TABBAR_WIDTH, height: windowSize[1] });
  }
}
