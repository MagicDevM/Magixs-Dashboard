const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

function loadConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

const Config = {
  get(key) {
    const config = loadConfig();
    return config[key];
  },
  
  set(key, value) {
    const config = loadConfig();
    config[key] = value;
    saveConfig(config);
  },
  
  getAll() {
    return loadConfig();
  }
};

module.exports = Config;