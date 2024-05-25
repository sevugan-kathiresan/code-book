import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

// creating an instance of the localforage to act as a cache
const fileCache = localforage.createInstance({
  name: 'filecache' // name we want to give our DataBase
});
/*
{
  key: args.path (the URL path of the file that we are trying to download)
  value: object that we returned from our onLoad call previous time
}

structure of the object that we return from onLoad call
{
  loader:
  contents:
  resolveDir:
}
*/


export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
        build.onLoad({ filter: /.*/ }, async (args: any) => {
            console.log('onLoad', args);
     
            if (args.path === 'index.js') {
              return {
                loader: 'jsx',
                contents: inputCode
              };
            }
            
            
            // check if the object is in cache
            const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
    
            // if yes return it
            if (cachedResult) {
              return cachedResult;
            }
    
            // else make a request
            const { data, request } = await axios.get(args.path);
            /* 
            data - contents of the file,
            request - gives the details of the request that we made to fetch the currrent file (object),
            from the request object we can fetch folder from where we have fetched the current file this will be passed to the path resolution of the next files
            */
    
            const result: esbuild.OnLoadResult =  {
              loader: 'jsx',
              contents: data,
              resolveDir: new URL('./', request.responseURL).pathname // current directory of the fetched file
              /*
                URL() - constructor
                arg1 - './' - we are telling it to parse till the folder path not till the file path (essentially removing the file name at the end)
                arg2 - request.responseURL - request object we got from the axios
              */
            };
    
            // store the result in cache before returning
            await fileCache.setItem(args.path, result);
    
            return result;
          });
        }
    };
};