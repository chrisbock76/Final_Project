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
        var panelData = data
        var panelProteins = panelData.filter(panelData => panelData.Panel == pathway);
        var uniprotID = panelProteins.map(panelProteins => panelProteins.UniprotID)

        //console.log(pathway)
        //console.log(uniprotID)
        var dropdown = d3.select("#dropdownMenu_protein")

        uniprotID.forEach((protein) => {
            dropdown.append("option")
                .text(protein)
                .property("value", protein);
        });

    })
}

function showProteinData(protein){
    d3.csv("protein_scraped_data.csv").then((data) => {
        var proteinInfo = data.filter(data => data["Uniprot ID"] == protein);
        console.log(proteinInfo)
        console.log(proteinInfo[0]["Protein Name"])
        var infoDiv = d3.select("#info-div")
        infoDiv.style('display', 'block')
        var name = d3.select("#protein-name")
        var gene = d3.select("#protein-gene")
        var func = d3.select("#protein-function")
        name.text(proteinInfo[0]["Protein Name"])
        gene.text(proteinInfo[0]["Gene Name"])
        func.text(proteinInfo[0]["Function"])
    })
}