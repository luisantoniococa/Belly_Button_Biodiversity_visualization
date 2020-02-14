// It adds an extra layer of dificulty to the previous project
function buildGauge(sample) {
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
      var foundSample = values[place].wfreq;
      console.log(`the found sample ${foundSample}`);

      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: foundSample,
          title: { text: "Speed" },
          type: "indicator",
          mode: "gauge+number+delta",
          delta: { reference: foundSample },
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 1], color:'rgb(124,252,0)' },
              { range: [1,2], color: "rgb(124,210,0)" },
              { range: [2,3], color: "rgb(124,170,0)" },
              { range: [3,4], color: "rgb(124,140,0)" },
              { range: [4,5], color: "rgb(124,100,0)" },
              { range: [5,6], color: "rgb(124,60,0)" },
              { range: [6,7], color: "rgb(124,20,0)" },
              { range: [7,8], color: "rgb(124,0,20)" },
              { range: [8,9], color: "rgb(124,0,60)" }
            ],
            threshold: {
              line: { color: "red", width: 5 },
              thickness: 0.75,
              value: foundSample
            }
          }
        }
      ];
      
      var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);



    });

};