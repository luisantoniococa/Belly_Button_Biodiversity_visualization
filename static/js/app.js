function buildCharts(sample) {
    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO:
    d3.json('samples.json').then((data)=> {

      var sampleValues = data.samples
      var otuIds
      var otuLabels
      console.log(sample)


    })

};

function buildMetadata(sample) {
    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO: 
    console.log(sample)

};

function init() {
    
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);

      // Loop through sampleNames to add "option" elements to the selector
      //TODO: 



      sampleNames.forEach(element => {
        var dropdownSelect = selector.append('option').text(element).value(element);
        // dropdownSelect.value = element;
        });

      


  
        function optionChanged(newSample) {
          // Fetch new data each time a new sample is selected
          buildCharts(newSample);
          buildMetadata(newSample);
        }
      });
}
  // Initialize the dashboard
  init();