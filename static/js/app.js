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
    
      // console.log(newSampleObj.sample_values)
      // newSampleObj.forEach((x,i) => newSampleObj2.push({"sample_values": i.sample_values}))
      // newSampleObj.map((x) => newSampleObj2.push({ 1:`${x.sample_values}`}))
      delete newSampleObj.id
      // newSampleObj.forEach((x) => newSampleObj2.push({"sample_values": i.sample_values}))


      // we created an array of objects with the individual data since it will be easier to organize and aggregate the data.
      for(var i = 0; i<newSampleObj.sample_values.length;i++){
        newSampleObj2.push({"sample_values": newSampleObj.sample_values[i],"otu_ids": newSampleObj.otu_ids[i], 'otu_labels': newSampleObj.otu_labels[i] })
      };
      // console.log(newSampleObj2);
      var top10founded = newSampleObj2.sort((a,b)=> b.sample_values - a.sample_values);
      // console.log(top10founded);
      top10founded = top10founded.slice(0,10);
      // console.log(top10founded);
      top10founded = top10founded.reverse();
      // console.log(top10founded);

      var trace1 = {
        x: top10founded.map(object => object.sample_values),
        y: top10founded.map(object => `OTU ${object.otu_ids}`),
        text: top10founded.map(object => object.otu_labels),
        // name: "",
        type: "bar",
        orientation: "h"
      };
      var trace2 = {
        x: newSampleObj2.map(object => object.otu_ids),
        y: newSampleObj2.map(object => object.sample_values),
        text: newSampleObj2.map(object => object.otu_labels),
        // name: "",
        mode: "markers",
        marker: {
          color: newSampleObj2.map(object => object.otu_ids * 30),
          size: newSampleObj2.map(object => object.sample_values)
        }
      };

      // data
      var data = [trace1];
      var data2 = [trace2];
      
      // Apply the group bar mode to the layout
      var layout = {
        title: "Top 10 OTUs Found in Individual",
      };
      
      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("bar", data, layout);
      Plotly.newPlot("bubble", data2);

    })

};

function buildMetadata(sample) {
    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO: 
    
    d3.json('samples.json').then((data)=> {

      var values = data.metadata
      var place;
      for (var i = 0;i<values.length;i++){
        if (values[i].id === +sample){
          place = i;
          break;
        }
      }
      var foundSample = values[place];
      var panelContent = d3.select('#sample-metadata');
      panelContent.html("");
      for(var i in foundSample){
        panelContent.append('p').text(`${i}:${foundSample[i]}`)

      }
      // var row = panelContent.append('p').text(`${foundSample[0]}:${foundSample.id}`)
      // console.log(place)
      // console.log(+sample)

//       "id": 940,
// "ethnicity": "Caucasian",
// "gender": "F",
// "age": 24,
// "location": "Beaufort/NC",
// "bbtype": "I",
// "wfreq": 2

      // console.log(values)



    });

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
      buildGauge(firstSample);
      // Loop through sampleNames to add "option" elements to the selector
      //TODO: 



      sampleNames.forEach(element => {
        var dropdownSelect = selector.append('option').text(element);
        dropdownSelect.value = element;
        });

      


  
        
      });

      // function thi(newSample) {
      //   // Fetch new data each time a new sample is selected
      //   buildCharts(newSample);
      //   buildMetadata(newSample);
      // }
}
  // Initialize the dashboard
  init();