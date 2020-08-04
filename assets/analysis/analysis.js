
var proteinDiv = d3.select("#protein-div")
var infoDiv = d3.select("#info-div")
var time_div = d3.select("#timepoint-analysis")
var site_div = d3.select("#site-analysis")
var select_buttons = d3.select("#select_var")
var resB = d3.select("#blueR")
var nrR = d3.select("#redNR")

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
        proteinDiv.style('display', 'block')
        infoDiv.style('display', 'none')
        select_buttons.style('display', 'none')
        resB.style('display', 'none')
        nrR.style('display', 'none')
        time_div.style('display', 'none')
        site_div.style('display', 'none')
        
        
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

//function proteinDropdown() {
//}

function showProteinData(protein) {
    resB.style('display', 'none')
    nrR.style('display', 'none')
    time_div.style('display', 'none')
    site_div.style('display', 'none')
    
    d3.csv("protein_scraped_data.csv").then((data) => {
        var proteinInfo = data.filter(data => data["Uniprot ID"] == protein);
        //console.log(protein)
        //console.log(proteinInfo)
        //console.log(proteinInfo[0]["Protein Name"])
        
        var analysisDiv = d3.select("#protein-analysis")
        infoDiv.style('display', 'block')
        var name = d3.select("#protein-name")
        var gene = d3.select("#protein-gene")
        var func = d3.select("#protein-function")
        name.text(proteinInfo[0]["Protein Name"])
        gene.text(proteinInfo[0]["Gene Name"])
        func.text(proteinInfo[0]["Function"])
        var gene_name = proteinInfo[0]["Gene Name"]
        
        select_buttons.style('display', 'block')
        var time_button = d3.select("#timepoint")
        var site_button = d3.select("#site")
        


        //buildBoxPlotTime(protein, gene_name)
        //Sitebp(protein, gene_name)
        time_button.on('click', function(){
            buildBoxPlotTime(protein, gene_name)
            //Sitebp(protein, gene_name)
            resB.style('display', 'block')
            nrR.style('display', 'block')
            time_div.style('display', 'block')
            site_div.style('display', 'none')

        })

        site_button.on('click', function(){
            //buildBoxPlotTime(protein, gene_name)
            Sitebp(protein, gene_name)
            resB.style('display', 'none')
            nrR.style('display', 'none')
            time_div.style('display', 'none')
            site_div.style('display', 'block')

        })


    })
}


function buildBoxPlotTime(uniprot, gene) {
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
            marker: { color: 'blue' },
            legendgroup:'Responder',
            showlegend: false,
            type: 'box'
        };
        var trace2 = {
            y: six_R,
            name: 'Six Weeks',
            marker: { color: 'blue' },
            legendgroup: 'Responder',
            showlegend: false,
            type: 'box'
        };
        var trace3 = {
            y: twelve_R,
            name: 'Twelve Weeks',
            marker: { color: 'blue' },
            legendgroup: 'Responder',
            showlegend: false,
            type: 'box'
        };

        var trace4 = {
            y: baseline_N,
            name: 'BaseLine',
            marker: { color: 'red' },
            legendgroup: 'Nonresponder',
            showlegend: false,
            type: 'box'
        };
        var trace5 = {
            y: six_N,
            name: 'Six Weeks',
            marker: { color: 'red' },
            legendgroup: 'Nonresponder',
            showlegend: false,
            type: 'box'
        };
        var trace6 = {
            y: twelve_N,
            name: 'Twelve Weeks',
            marker: { color: 'red' },
            legendgroup: 'Nonresponder',
            showlegend: false,
            type: 'box'
        };


        var boxData = [trace1, trace2, trace3, trace4, trace5, trace6];

        var layout = {
            title: 'Protein Levels at Timepoints',
            yaxis: {
                title: "NPX",
                zeroline: false
            },
            boxmode: 'group'
        };

        Plotly.newPlot('boxplot-R', boxData, layout);


    }).catch(function (err) {
        throw err
    })

    findAnovaR(gene)
    findAnovaNR(gene)
}

function findAnovaR(name) {
    d3.csv("../../anova_data/anova_R.csv").then((data) => {
        console.log(name)
        var tableDiv = d3.select("#anova_R")
        var tableTitle = d3.select("#table_title_R")
        tableDiv.style('display', 'block')
        tableTitle.text(`ANOVA Statistics for ${name}: Responder`)
        var table = tableDiv.select("table")
        var tbody = table.select("tbody")
        tbody.html("")
        var anovaInfo = data.filter(data => data["Protein"].split("_")[0] == name);
        //console.log(anovaInfo)
        var c_f = anovaInfo[0]["C(Time): F"]
        var c_PR = anovaInfo[0]["C(Time): PR(>F)"]
        var c_df = anovaInfo[0]["C(Time): df"]
        var c_sum_sq = anovaInfo[0]["C(Time): sum_sq"]
        var r_df = anovaInfo[0]["Residual: df"]
        var r_sum_sq = anovaInfo[0]["Residual: sum_sq"]
        var table_data_ob = [{
            aa: "C(Time)",
            bb: c_sum_sq,
            cc: c_df,
            dd: c_f,
            ee: c_PR
        },
        {
            aa: "Residual",
            bb: r_sum_sq,
            cc: r_df,
            dd: ' ',
            ee: ' '
        }
        ]
        var table_data = ["C(Site)", c_f, c_PR, c_df, c_sum_sq, "Residual", r_df, r_sum_sq, ' ', ' ']
        var table_data_1 = ["C(Site)", c_f, c_PR, c_df, c_sum_sq]
        var table_data_2 = ["Residual", r_df, r_sum_sq, ' ', ' ']
        //console.log(`c_f: ${c_f}`)
        //console.log(`c_PR: ${c_PR}`)
        //console.log(`c_df: ${c_df}`)
        //console.log(`c_sum_sq: ${c_sum_sq}`)
        //console.log(`r_df: ${r_df}`)
        //console.log(`r_sum_sq: ${r_sum_sq}`)
        var tbody = tbody
        .selectAll("tr")
        .data(table_data_ob)
        .enter()
        .append("tr")
        .html(function(d) {
            return `<td>${d.aa}</td><td>${d.bb}</td><td>${d.cc}</td><td>${d.dd}</td><td>${d.ee}</td>`;
          });

})
}

function findAnovaNR(name) {
    d3.csv("../../anova_data/anova_NR.csv").then((data) => {
        var tableDiv = d3.select("#anova_NR")
        var tableTitle = d3.select("#table_title_NR")
        tableDiv.style('display', 'block')
        tableTitle.text(`ANOVA Statistics for ${name}: Non-Responder`)
        var table = tableDiv.select("table")
        var tbody = table.select("tbody")
        tbody.html("")
        var anovaInfo = data.filter(data => data["Protein"].split("_")[0] == name);
        var c_f = anovaInfo[0]["C(Time): F"]
        var c_PR = anovaInfo[0]["C(Time): PR(>F)"]
        var c_df = anovaInfo[0]["C(Time): df"]
        var c_sum_sq = anovaInfo[0]["C(Time): sum_sq"]
        var r_df = anovaInfo[0]["Residual: df"]
        var r_sum_sq = anovaInfo[0]["Residual: sum_sq"]
        var table_data_ob = [{
            aa: "C(Time)",
            bb: c_sum_sq,
            cc: c_df,
            dd: c_f,
            ee: c_PR
        },
        {
            aa: "Residual",
            bb: r_sum_sq,
            cc: r_df,
            dd: ' ',
            ee: ' '
        }
        ];

        var tbody = tbody
        .selectAll("tr")
        .data(table_data_ob)
        .enter()
        .append("tr")
        .html(function(d) {
            return `<td>${d.aa}</td><td>${d.bb}</td><td>${d.cc}</td><td>${d.dd}</td><td>${d.ee}</td>`;
          });

})
}


function findUniprotValues(uniprotID, array, valuearray) {

    for (var i = 0; i < array.length; i++) {
        valuearray.push(array[i][uniprotID])
    }
}

function Sitebp(uniprot, gene){
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
        marker: { color: 'orange' },
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
        title: 'Protein Levels by Sites at Baseline',
        yaxis: {
            title: "NPX",
            zeroline: false
        },
        boxmode: 'group'
    };

    Plotly.newPlot('boxplot-S', boxData, layout);


    })

    findAnovaS(gene)
}

function findAnovaS(name) {
    d3.csv("../../anova_data/anova_site.csv").then((data) => {
        var tableDiv = d3.select("#anova_S")
        var tableTitle = d3.select("#table_title_S")
        tableDiv.style('display', 'block')
        tableTitle.text(`ANOVA Statistics for ${name}: Site Difference`)
        var table = tableDiv.select("table")
        var tbody = table.select("tbody")
        tbody.html("")
        var anovaInfo = data.filter(data => data["Protein"].split("_")[0] == name);
        var c_f = anovaInfo[0]["C(Site): F"]
        var c_PR = anovaInfo[0]["C(Site): PR(>F)"]
        var c_df = anovaInfo[0]["C(Site): df"]
        var c_sum_sq = anovaInfo[0]["C(Site): sum_sq"]
        var r_df = anovaInfo[0]["Residual: df"]
        var r_sum_sq = anovaInfo[0]["Residual: sum_sq"]
        var table_data_ob = [{
            aa: "C(Site)",
            bb: c_sum_sq,
            cc: c_df,
            dd: c_f,
            ee: c_PR
        },
        {
            aa: "Residual",
            bb: r_sum_sq,
            cc: r_df,
            dd: ' ',
            ee: ' '
        }
        ];

        var tbody = tbody
        .selectAll("tr")
        .data(table_data_ob)
        .enter()
        .append("tr")
        .html(function(d) {
            return `<td>${d.aa}</td><td>${d.bb}</td><td>${d.cc}</td><td>${d.dd}</td><td>${d.ee}</td>`;
          });

})
}
