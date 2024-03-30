# Module: MMM-Streamflow
This [MagicMirror²](https://magicmirror.builders/) module utilizes REST API calls to the [United States Geological Survey](https://www.usgs.gov/tools/usgs-water-services) to fetch and display real-time water data for the user’s location. Users can monitor measurements such as water level and flow rate for rivers, streams, and other bodies of water across the United States.

## Screenshot
![image](https://github.com/colesandlin/MMM-Streamflow/assets/65195437/e0421b65-f821-41d9-9105-3b85238f556e)

## Installation

Navigate to your MagicMirror² modules folder:
```bash
cd ~/MagicMirror/modules
```

Clone this repository:
```bash
git clone https://github.com/colesandlin/MMM-Streamflow.git
```

Navigate to the module's folder:
```bash
cd MMM-Streamflow
```

Install dependencies:
```bash
npm install
```

## Configuration
The default configuration displays water level data for the Ohio River at Cincinnati, OH.

Here's an example configuration:
```JavaScript
{
    module: "MMM-Streamflow",
    position: "top_left",
    config: {
    	type: "Gage height",
        locationID: "03255000" //ID from https://waterdata.usgs.gov/ky/nwis/current/?type=flow
    }
},
```

|Option|Description|
|---|---|
|`Type`|The reading returned. <br><br> **Possible values:** `"Temperature"`, `"Discharge"`, `"Gage height"`, `"Specific conductance"`, `"Dissolved oxygen"`, `"pH"`, `"Turbidity"` <br> **Default value:** `"Gage height"`|
|`locationID`|The USGS site number for the location you want to monitor, which can be obtained [here](https://maps.waterdata.usgs.gov/mapper/index.html). <br><br> **Default value:** `"03255000"`|
|`httpMethod`|The HTTP request method. <br><br> **Default value:** `GET`|
|`apiBase`|The USGS base URL. <br><br> **Default value:** `"https://waterservices.usgs.gov/nwis/iv/?format=json&sites="`|
|`updateInterval`|How often new data is fetched, the default value is 15 minutes because USGS streamflow data is typically recorded at 15-minute intervals. <br><br> **Default value:** `15 * 60 * 1000`|
