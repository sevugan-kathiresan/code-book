import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;

const bundle =  async (rawCode: string) => {
    // If the esbuild service is not started before means we have to start it
    if (!service) {
        service = await esbuild.startService({
            worker: true,
            wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        });
    }

    const result = await service.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        define: {
          'process.env.NODE_ENV': '"production"', // replacing with string production that is why use of two quotations
          global: 'window', // we need to replace global with window if we try to run our code inside browser
        }
      });

      return result.outputFiles[0].text;

};

export default bundle;