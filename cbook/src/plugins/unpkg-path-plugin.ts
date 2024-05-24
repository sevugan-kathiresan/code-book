import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        // Resolving index.js
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        
        // fetching auxiliary files
        // https://unpkg.com/ + {directory the last file was found} + {require statement for this file}
        if (args.path.includes('./') || args.path.includes('../')){
          return {
            namespace: 'a',
            path: new URL(args.path, 'https://www.unpkg.com' + args.resolveDir + '/').href,
          };
        }

        // fectching main file of the package
        // https://www.unpkg.com/ + package name
        return {
          namespace:'a',
          path: `https://www.unpkg.com/${args.path}`
        };
        
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, {useState} from 'react';
              console.log(React, useState);
            `,
          };
        }

        const { data, request } = await axios.get(args.path);
        /* 
        data - contents of the file,
        request - gives the details of the request that we made to fetch the currrent file (object),
        from the request object we can fetch folder from where we have fetched the current file this will be passed to the path resolution of the next files
        */
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname // current directory of the fetched file
          /*
            URL() - constructor
            arg1 - './' - we are telling it to parse till the folder path not till the file path (essentially removing the file name at the end)
            arg2 - request.responseURL - request object we got from the axios
          */
        }
      });
    },
  };
};