function buildCharts(sample) {
    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO:
    d3.json('samples.json').then((data)=> {

      var sampleValues = data.samples
      var location;
      for(var i = 0;i<sampleValues.length;i++){
        if (sampleValues[i].id === sample){
          location = i
          break;
        }
      }
      var newSampleObj = data.samples[location]
      // sampleValues = data.samples[location].sample_values
      // var otuIds = data.samples[location].otu_ids
      // var otuLabels = data.samples[location].otu_labels
      // console.log(sampleValues)
      // console.log(otuIds)
      // console.log(otuLabels)
      

      // var output = newSampleObj.sample_values.map(function(obj) {
      //   return Object.keys(obj).sort().map(function(key) { 
      //     return obj[key];
      //   });
      // });
      // console.log(output)
      var newSampleObj2 = []
      // newSampleObj.forEach(x => newSampleObj2.push({"sample_values": x.sample_values}))
    
      console.log(newSampleObj.sample_values)
      // newSampleObj.forEach((x,i) => newSampleObj2.push({"sample_values": i.sample_values}))
      // newSampleObj.map((x) => newSampleObj2.push({ 1:`${x.sample_values}`}))
      delete newSampleObj.id
      // newSampleObj.forEach((x) => newSampleObj2.push({"sample_values": i.sample_values}))
      
      console.log(newSampleObj.sample_values[0])
      
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
        var dropdownSelect = selector.append('option').text(element);
        dropdownSelect.value = element;
        });

      


  
        
      });

      function optionChanged(newSample) {
        // Fetch new data each time a new sample is selected
        buildCharts(newSample);
        buildMetadata(newSample);
      }
}
  // Initialize the dashboard
  init();