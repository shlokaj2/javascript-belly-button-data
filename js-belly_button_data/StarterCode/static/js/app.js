// Set up URL for the data
const url = 
"https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Read into the samples.json file from the URL
d3.json(url).then(function(data){
    console.log(data);
});

// Initialize the dashboard at start up
function init() {

}

// Creating the charts
// Set up variables and use d3 to select the dropdown menu 
var samples;
var meta_data;

d3.json(url).then(function (data) {

    let dropdownMenu = d3.select("#selDataset");
    meta_data = data.metadata;
    samples = data.samples;

    data.names.forEach((id) => {
        dropdownMenu.append("option").text(id).property("value", id);
    });

    metaData(meta_data[0]);
    hbarChart(samples[0]);
    bubbleChart(samples[0]);
});

function optionChanged(value) {
    const selectedId = samples.find((item) => item.id === value);
    const demographicInfo = meta_data.find((item) => item.id == value);

    // Inserting Demographic Data
    metaData(demographicInfo);

    // Bar Chart
    hbarChart(selectedId);

    // Bubble Chart
    bubbleChart(selectedId);

}

