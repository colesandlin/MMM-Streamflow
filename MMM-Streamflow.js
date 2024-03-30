/* MagicMirror²
 * Module: MMM-Streamflow
 *
 * By Cole Sandlin, http://colesandlin.com
 * MIT Licensed.
 */
Module.register("MMM-Streamflow", {
	defaults: {
		apiBase: "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=",
		httpMethod: "GET",
		updateInterval: 15 * 60 * 1000 // every 15 minutes
	},
	
	getStyles () {
		return ["font-awesome.css"];
	},

	start () {
		this.loaded = false;
		this.siteName = "";
		this.streamflowValue = "";
		this.unitCode = "";
		this.sendSocketNotification('CONFIG', this.config);
	},

	getHeader () {
		return this.siteName ? this.siteName: "";
	},

	getDom () {
		var wrapper = document.createElement("div");
		if (!this.loaded) {
			wrapper.innerHTML = this.translate("LOADING");
			wrapper.className = "dimmed light small";
		}
		else {
	  		wrapper.innerHTML = this.config.type + ": " + this.streamflowValue + " " + this.unitCode;
	  	}
		return wrapper;
	},

 	socketNotificationReceived (notification, payload) {
		if(payload.identifier === this.config.identifier) {
    			if (notification === "STARTED") {
				this.updateDom();
			}
			else if (notification === "SITE_NAME") {
				this.siteName = payload.data;
    			}
    			else if (notification === "STREAMFLOW_VALUE") {
				this.streamflowValue = payload.data;
    			}
    			else if (notification === "UNIT_CODE") {
    				this.loaded = true;
				this.unitCode = payload.data;
				this.updateDom();
    			}
    		}
	}
});
