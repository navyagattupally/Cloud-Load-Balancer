/**
 * Author: Sai
 */

var servers = require("../util/servers");

var serverPointer=0;

function allocateServer(callback,conf)
{
	if (!conf.server.serverNodes.length<=0)
	{
		if(serverPointer<conf.server.serverNodes.length)
		{
			servers.findAllServers(function(err,result){
				
			if(err){
				console.log("Error.");
			}
			else{

				temp = result;

				result.toArray(function(err,docs){

					if(!docs.length==0)
					{
						var no_of_requests = [];
						var choice = docs[0].serverId;
						var temp_minLiveReq = docs[0].liveReq;

						for(var i=0; i<docs.length;i++)
						{
							no_of_requests[i] = docs[i].liveReq;

							if (i>0) {

								if (no_of_requests[i]<no_of_requests[i-1]) {

									temp_minLiveReq = no_of_requests[i];
									choice = docs[i].serverId;
								}
							};
						}

						serverPointer = choice;
								
						callback(serverPointer,null);
					}

					else{
						
						callback(null,new Error("No Servers found to handle Requests"));
					}
				
				});
					
				}
				
			});
		}
	}
}

exports.allocateServer = allocateServer;
