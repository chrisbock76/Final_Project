

d3.csv("panel_uniprot.csv").then((data) => {

    var panelData = data
    //console.log(panelData[0].Panel)
    var panels = panelData.map(panel => panel.Panel)

    function findPanels(value, index, self) {
        return self.indexOf(value) === index;
    }


    var panelNames = panels.filter(findPanels);

    //console.log(panelNames)
    var dropdown = d3.select("#dropdownMenu_pathway")

    panelNames.forEach((panel) => {
        dropdown.append("option")
            .text(panel)
            .property("value", panel);
    });
})


function selectPathway(pathway) {
    d3.csv("panel_uniprot.csv").then((data) => {
        var proteinDiv = d3.select("#protein-div")
        proteinDiv.style('display', 'block')
        var dropdown = d3.select("#dropdownMenu_protein")
        var panelData = data
        var panelProteins = panelData.filter(panelData => panelData.Panel == pathway);
        var uniprotID = panelProteins.map(panelProteins => panelProteins.UniprotID)

        //console.log(pathway)
        //console.log(uniprotID)
        var dropdown = d3.select("#dropdownMenu_protein")

        dropdown.html("<option selected disabled>Choose here</option>")

        uniprotID.forEach((protein) => {
            dropdown.append("option")
                .text(protein)
                .property("value", protein);
        });

    })
}

function proteinDropdown() {

}

function showProteinData(protein) {
    d3.csv("protein_scraped_data.csv").then((data) => {
        var proteinInfo = data.filter(data => data["Uniprot ID"] == protein);
        //console.log(protein)
        //console.log(proteinInfo)
        //console.log(proteinInfo[0]["Protein Name"])
        var infoDiv = d3.select("#info-div")
        infoDiv.style('display', 'block')
        var name = d3.select("#protein-name")
        var gene = d3.select("#protein-gene")
        var func = d3.select("#protein-function")
        name.text(proteinInfo[0]["Protein Name"])
        gene.text(proteinInfo[0]["Gene Name"])
        func.text(proteinInfo[0]["Function"])
    })
    buildBoxPlotTime(protein)
    Sitebp(protein)
}

function buildBoxPlotTime(uniprot) {
    Promise.all([
        d3.csv("responser.csv"),
        d3.csv("nonresponser.csv"),
    ]).then(function (files) {
        var responser = files[0]
        var nonresponser = files[1]
        var responser_values = []
        var nonresponser_values = []
        //console.log(responser[0])
        //console.log(responser[0][uniprot])
        //console.log(nonresponser.length)
        findUniprotValues(uniprot, responser, responser_values)
        findUniprotValues(uniprot, nonresponser, nonresponser_values)
        //console.log(responser_values)
        //console.log(nonresponser_values)

        var baseline_R = []
        var six_R = []
        var twelve_R = []
        var baseline_N = []
        var six_N = []
        var twelve_N = []

        for (var j = 0; j < responser.length; j = j + 3) {
            baseline_R.push(responser_values[j])
            six_R.push(responser_values[j + 1])
            twelve_R.push(responser_values[j + 2])
        }
        for (var k = 0; k < nonresponser.length; k = k + 3) {
            baseline_N.push(nonresponser_values[k])
            six_N.push(nonresponser_values[k + 1])
            twelve_N.push(nonresponser_values[k + 2])
        }


        //console.log(baseline_R)
        //console.log(six_R)
        //console.log(twelve_R)
        //console.log(baseline_N.length)
        //console.log(six_N.length)
        //console.log(twelve_N.length)


        //responsertotal.push(baseline_R)
        //responsertotal.push(six_R)
        //responsertotal.push(twelve_R)

        //console.log(responsertotal)
        var trace1 = {
            y: baseline_R,
            name: 'BaseLine',
            marker: { color: '#3D9970' },
            legendgroup:'Responder',
            showlegend: false,
            type: 'box'
        };
        var trace2 = {
            y: six_R,
            name: 'Six Weeks',
            marker: { color: '#3D9970' },
            legendgroup: 'Responder',
            showlegend: false,
            type: 'box'
        };
        var trace3 = {
            y: twelve_R,
            name: 'Twelve Weeks',
            marker: { color: '#3D9970' },
            legendgroup: 'Responder',
            showlegend: false,
            type: 'box'
        };

        var trace4 = {
            y: baseline_N,
            name: 'BaseLine',
            marker: { color: '##FF4136' },
            legendgroup: 'Nonresponder',
            showlegend: false,
            type: 'box'
        };
        var trace5 = {
            y: six_N,
            name: 'Six Weeks',
            marker: { color: '##FF4136' },
            legendgroup: 'Nonresponder',
            showlegend: false,
            type: 'box'
        };
        var trace6 = {
            y: twelve_N,
            name: 'Twelve Weeks',
            marker: { color: '##FF4136' },
            legendgroup: 'Nonresponder',
            showlegend: false,
            type: 'box'
        };


        var boxData = [trace1, trace2, trace3, trace4, trace5, trace6];

        var layout = {
            yaxis: {
                zeroline: false
            },
            boxmode: 'group'
        };

        Plotly.newPlot('boxplot-R', boxData, layout);


    }).catch(function (err) {
        throw err
    })
}


function findUniprotValues(uniprotID, array, valuearray) {

    for (var i = 0; i < array.length; i++) {
        valuearray.push(array[i][uniprotID])
    }
}

function Sitebp(uniprot){
    d3.csv("../../Resources/data1+info.csv").then(function (data) {
        var baseline_array = {
            values: [],
            site: []
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i]["Time"] === "Baseline") {
            baseline_array.values.push(data[i][uniprot])
            baseline_array.site.push(data[i]["Site"])
            }
        }
    //console.log(baseline_array["site"][0])
    siteA = []
    siteB = []
    siteC = []
    siteD = []
    siteE = []

    for (var j = 0; j < baseline_array["site"].length; j++) {
        if (baseline_array["site"][j] === "Site_A") {
            siteA.push(baseline_array["values"][j])
        }
        else if (baseline_array["site"][j] === "Site_B") {
            siteB.push(baseline_array["values"][j])
        }
        else if (baseline_array["site"][j] === "Site_C") {
            siteC.push(baseline_array["values"][j])
        }
        else if (baseline_array["site"][j] === "Site_D") {
            siteD.push(baseline_array["values"][j])
        }
        else if (baseline_array["site"][j] === "Site_E") {
            siteE.push(baseline_array["values"][j])
        }
    }

    var trace1 = {
        y: siteA,
        name: 'Site_A',
        marker: { color: 'red' },
        type: 'box'
    };
    var trace2 = {
        y: siteB,
        name: 'Site_B',
        marker: { color: 'blue' },
        type: 'box'
    };
    var trace3 = {
        y: siteC,
        name: 'Site_C',
        marker: { color: 'yellow' },
        type: 'box'
    };

    var trace4 = {
        y: siteD,
        name: 'Site_D',
        marker: { color: 'green' },

        type: 'box'
    };
    var trace5 = {
        y: siteE,
        name: 'Site_E',
        marker: { color: 'purple' },
        type: 'box'
    };
    var boxData = [trace1, trace2, trace3, trace4, trace5];

    var layout = {
        yaxis: {
            zeroline: false
        },
        boxmode: 'group'
    };

    Plotly.newPlot('boxplot-S', boxData, layout);


    })

}

