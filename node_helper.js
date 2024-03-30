/* MagicMirror²
 * Node Helper: MMM-Streamflow
 *
 * By Cole Sandlin https://colesandlin.com
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const fetch = require("node-fetch");
const jp = require("jsonpath");

module.exports = NodeHelper.create({
	// Override start method.
	start () {
		this.fetchers = [];
	},
	
	fetchData (instanceID) {
		var that = this;
		var fetcher = that.fetchers[instanceID];
		var variableDescription = "";
		that.doCall(fetcher.config.apiBase + fetcher.config.locationID, fetcher.config.httpMethod, function(response) {
			that.sendSocketNotification("SITE_NAME", {instanceID: instanceID, data: that.parseData(response, "$.value.timeSeries[0].sourceInfo.siteName")});
			for (let i = 0; variableDescription != fetcher.config.type; i++) {
				timeSeries = i;
				variableDescription = that.parseData(response, "$.value.timeSeries[" + i + "].variable.variableDescription");
				variableDescription = variableDescription.toString().split(",", 1);
			}
			that.sendSocketNotification("STREAMFLOW_VALUE", {instanceID: instanceID, data: that.parseData(response, "$.value.timeSeries[" + timeSeries + "].values[0].value[0].value")});
			that.sendSocketNotification("UNIT_CODE", {instanceID: instanceID, data: that.parseData(response, "$.value.timeSeries[" + timeSeries + "].variable.unit.unitCode")});
		})
		setTimeout(function() { that.fetchData(instanceID); }, fetcher.config.updateInterval);
	},

	parseData (data, jsonPath) {
  		return jp.query(data, jsonPath);
	},
	
	doCall (urlToCall, httpMethod, callback) {
		var httpMethod = { method: httpMethod };
		fetch(urlToCall, httpMethod)
		    .then(res => res.json())
		    .then(json => callback(json))
	},

	socketNotificationReceived (notification, payload) {
		var that = this;
		var instanceID = payload.instanceID;
		if (notification === 'CONFIG' && !(instanceID in that.fetchers)) {
			that.fetchers[instanceID] = [];
			that.fetchers[instanceID].config = payload;
			that.sendSocketNotification("STARTED", {instanceID: instanceID, started: true});
			that.fetchData(instanceID);
			that.fetchers[instanceID].started = true;
		}
	}
});
