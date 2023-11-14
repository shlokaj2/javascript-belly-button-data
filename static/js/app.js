// Set up URL for the data
const url = 
"https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

var samples;
var meta_data;

// Read into the samples.json file from the URL
d3.json(url).then(function(data){
    console.log(data);
    init(data)
});

// Initialize the dashboard at start up
function init(data) {
    let dropdownMenu = d3.select("#selDataset");
    meta_data = data.metadata;
    samples = data.samples;

    data.names.forEach((id) => {
        dropdownMenu.append("option").text(id).property("value", id);
    });
    optionChanged(data.names[0])
}

// Creating the charts
// Set up variables and use d3 to select the dropdown menu 
function metaData(id) {
    let demographicInfo = meta_data.find(md => md.id==id);
    // let demographicInfo = meta_data.find(md => md.id==id);
    console.log(demographicInfo)
    let demoSelect = d3.select("#sample-metadata");

    demoSelect.html(
    `id: ${demographicInfo.id} <br> 
    ethnicity: ${demographicInfo.ethnicity} <br>
    gender: ${demographicInfo.gender} <br>
    age: ${demographicInfo.age} <br>
    location: ${demographicInfo.location} <br>
    bbtype: ${demographicInfo.bbtype} <br>
    wfreq: ${demographicInfo.wfreq}`
    );

}

function hbarChart(id) {
    let selectedData = samples.find(s => s.id==id)
    console.log(selectedData)
    let otu_ids = selectedData.otu_ids.slice(0, 10).reverse().map(object => `OTU ${object}`); 
    let sample_values = selectedData.sample_values.slice(0, 10).reverse();
    let otu_labels = selectedData.otu_labels.slice(0, 10).reverse();

   
    // Trace1 for the belly button data
    let trace1 = {
    x: sample_values,
    y: otu_ids,
    text: otu_labels,
    name: "Belly Button",
    type: "bar",
    orientation: "h"
    };

    // Data array
    let data = [trace1];

    // Apply a title to the layout
    let layout = {
    title: "Belly Button",
    margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
    }}


    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data, layout);
 
}

function bubbleChart(id) {
    let selectedData = samples.find(s => s.id==id)
    console.log(selectedData)

    let otu_ids = selectedData.otu_ids
    let sample_values = selectedData.sample_values
    let otu_labels = selectedData.otu_labels

   
    // Trace1 for the belly button data
    let trace2 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    marker: { 
    color: otu_ids,
    size: sample_values,
    },
    name: "Belly Button",
    mode: "markers",
    }
    // Data array
    var data = [trace2]

     // Apply the layout of the bubble chart
     var layout = {
        title: 'Marker Size',
        showlegend: false,
        height: 600,
        width: 600
    }

   
// Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", data, layout);
    }

function optionChanged(value) {
 metaData(value)
 hbarChart(value)
 bubbleChart(value)  
}

