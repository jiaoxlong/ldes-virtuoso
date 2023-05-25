import {readFileSync} from "fs";

export class Config {
    readonly _config!: { [p: string]: any }
    readonly _configPath!: string
    readonly _prefixes: string;

    constructor(config_path: string) {
        this._config = JSON.parse(readFileSync(config_path).toString());
        this._configPath = config_path
        this._prefixes = this._config.prefixes
    }

    get config(){
        return this._config
    }
    get configPath(){
        return this._configPath
    }
    get prefixes(){
        return this._prefixes
    }
}



let _config: Config;
export function getConfig(configPath: string): Config {
    if (_config) return _config;
    _config = new Config(configPath);
    return _config;
}
