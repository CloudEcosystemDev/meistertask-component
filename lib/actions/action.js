/**
 * : meistertask-component
 * Copyright Â© 2022,  AG
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 */
 const componentJson = require("../../component.json");
 const { getMetadata, endpointCall, setupUrlParamaters } = require("../utils/helpers");
 
 async function processAction(msg, cfg, snapshot, incomingMessageHeaders, tokenData) {
 
   const action = componentJson.actions[tokenData["function"]];
   const { pathName, method, requestContentType } = action.callParams;
   const queryParams = action.queryParams ? action.queryParams.map(({ name }) => {
     return name;
   }) : [];
 
   const body = msg.data;
   let parameters = {};
   for (let param of queryParams) {
     parameters[param] = body[param];
   }

   
   const base = 'https://www.meistertask.com/api';
   const url = base + setupUrlParamaters(pathName, body);
   const options = {
     method: method,
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${cfg['key']}`
      },
     data: body,
     params: parameters,
   };
 
   const { data } = await endpointCall(url, options);
   const newElement = {};
   newElement.metadata = getMetadata(msg.metadata);
   newElement.data = data;
   this.emit("data",newElement)
 }
 
 module.exports = { process: processAction };