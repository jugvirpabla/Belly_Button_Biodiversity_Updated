gggfunction init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  
})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
  buildBubble(newSample);
}

function loadPage(item) {
  d3.json("samples.json").then((data) => {
  buildMetadata(940);
  buildCharts(940);
  buildBubble(940);
});
}
window.onload = loadPage();

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");


    Object.entries(result).forEach(([key, value]) => {

      metadata = metadata.filter(row => row[key] === value);
    });
    //Javascript syntax for .text function 
    PANEL.html("");  
      Object.entries(result).forEach(function([filtering,value]){
        PANEL.append("h6").text(`${filtering}: ${value}`);});

  });
}

//Create a bar chart
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    //id from the drop down
    sampleResult = sampleArray[0];

    Object.entries(sampleResult).forEach(([key, value]) => {

      samples = samples.filter(row => row[key] === value);

    //fetches the data from the samples dataset 
    var sampleIds = sampleResult.otu_ids;
    var sampleOtu = sampleResult.otu_labels;
    var sampleValues = sampleResult.sample_values;
    
    console.log(sampleIds);
    console.log(sampleOtu);
    console.log(sampleValues);
    console.log(topTenSample);
    
    //slicing for top 10 
    var topTenSample = sampleValues.slice(0,10);
    var topTenIds = sampleIds.slice(0,10).map(id => "OTU"+id.toString());
    var toptenOtu = sampleOtu.slice(0,10);
    
    var trace = {
      x: topTenSample,
      y: topTenIds,
      text: toptenOtu,
      orientation: 'h',
      type: "bar"
    };
    var sampledata = [trace];
    var layout = {
      title: "Top Ten Bacterial Species per ID",
    };
    Plotly.newPlot("bar", sampledata, layout);
  });

});}

// create a bubble chart
function buildBubble(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    //id from the drop down
    sampleResult = sampleArray[0];
    //fetches the data from the samples dataset 
    var bubbleIds = sampleResult.otu_ids;
    var bubbleOtu = sampleResult.otu_labels;
    var bubbleValues = sampleResult.sample_values;

    var trace1 = {
      x: bubbleIds,
      y: bubbleValues,
      text: bubbleOtu,
      mode: "markers",
        marker: {
          color: bubbleIds,
          size: bubbleValues,
          colorScale: "earth"}};
    
    var bubbledata = [trace1];
    
    var layout = {
       title: 'Distrubution of Bellybutton Bacteria',
       //showlegend: false,
       //height: 600,
       //width: 600
     };
    
     Plotly.newPlot("bubble", bubbledata, layout);

});}