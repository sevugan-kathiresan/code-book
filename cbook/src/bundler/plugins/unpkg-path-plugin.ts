import * as esbuild from 'esbuild-wasm';

 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Resolve case for root entry file (index.js)
      // "/(^index\.js$)/" - regular expression to find the file name index.js
      build.onResolve({ filter: /(^index\.js$)/}, () => {
        return {
          path: 'index.js',
          namespace: 'a'
        };
      });

      // Resolve relative files (auxiliary modules) files which are imported by the main module
      // "/^\.+\//" - regular expression to find the if import statements have ./ or ../
      build.onResolve({filter: /^\.+\//}, (args: any) => {
        return {
          namespace: 'a',
          // https://unpkg.com/ + {directory the last file was found} + {require statement for this file}
          path: new URL(args.path, 'https://www.unpkg.com' + args.resolveDir + '/').href,
        };
      });

      // fectching main module from the index.js
      build.onResolve({ filter: /.*/ }, async (args: any) => {        
        return {
          namespace:'a',
          // https://www.unpkg.com/ + package name
          path: `https://www.unpkg.com/${args.path}`
        };
      });
      
    },
  };
};