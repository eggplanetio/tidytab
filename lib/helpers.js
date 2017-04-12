import packageJson from '../package.json';

export default {

  isTidyExtensionTab(tab) {
    return tab.url.startsWith('chrome-extension') && tab.title.startsWith(packageJson.name)
  }

}
