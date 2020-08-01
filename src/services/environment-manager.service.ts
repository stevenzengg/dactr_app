import { Injectable } from '@angular/core';

declare var process: any;

@Injectable()
export class EnvironmentManagerService {

    private getEnvironmentVars(key: string): string {
        if (typeof process !== 'undefined' && process && process.env) {
            return process.env[key];
        } else {
            return "";
        }
    }

    public getGoogleNLPKey(): string {
        return this.getEnvironmentVars("nlpKey");
    }
}
