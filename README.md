# Final_Project
# Protein Signature and Classifier Discovery: The Forest Through the Trees
Identifying a classifier and proteins that significantly change in a simulated Olink dataset using random forest machine learning and ANOVA statistically testing.  The simulated study includes three clinical variables: response status, timepoint, and sample collection site.

CWRU Final Project (Group 2)
Chris Bock, Debra Fenty, Ben Snyder, Frankie Wong

Site: https://chrisbock76.github.io/Final_Project/<br>
Presentation: https://docs.google.com/presentation/d/1oF25TyMGBnpUAAlSOjVGa522W7w3KbH9M3rzxzRgc7Q/edit?usp=sharing<br>
Trello board (WIP): https://trello.com/b/xhnChis2/cwrufinalprojectgroup2

## Background

“Olink Proteomics is a Swedish company (with a US-based laboratory located in Watertown, MA) dedicated to innovation, quality, rigor and transparency, providing outstanding products and services for human protein biomarker discovery. Our groundbreaking Olink panels for precision proteomics help scientists make research decisions more quickly and confidently through robust, multiplex biomarker analysis. Our high quality multiplex immunoassay panels help bring new insights into disease processes, improve disease detection, and contribute to a better understanding of biology.”  (source: http://www.olink.com/)

Olink uses their proprietary Proximity Extension Assay (PEA) to detect over 1,100 unique proteins in human biological fluids, typically plasma or serum, where the output of the assay is reported in a relative protein concentration unit called NPX.  NPX is a log2 transformation of DNA copy number generated from a quantitative polymerase chain reaction (qPCR) measurement.  The NPX value is a direct translation of DNA copy number to amount in the biological sample.  We will use a simulated dataset that was created by Olink to train other, experienced Data Scientists on how to analyze PEA generated data.    

## Proposed Project
The simulated study that we have received contains two individual datasets -- that can be analyzed separately or together via a set of ‘bridge’ samples -- and an annotation file for each respective dataset.  Each dataset has the same number of unique subjects, but the second dataset contains the ‘bridge’ samples that were analyzed in the first dataset.  Each annotation file contains the following data: SampleID, Subject, Treatment, Site, Time, Project (indicating the respective dataset).
	Dataset Details:
*	Clinical variables
    *	Three timepoints (Baseline; Week 6; Week 12)
    *	Site information (from sites A-E)
    *	Response status (Responder or Non-responder)
*	The first dataset has 52 subjects, and 156 overall samples
*	The second dataset has another 52 subjects, but also has 16 ‘bridge’ samples from the first run (and thus has 172 samples)

We have been tasked to identify some or all of the following via analysis of the data:
*	Identify what factors or groupings have significant effects on protein expression
    * Site-to-site variations
    * Time points
    * Batch-to-batch variations
*	Use Random Forest to find a classifier for response
    ○	Test and train on one dataset
    ○	Does the model give favorable results using the second dataset?
*	Determine whether the two datasets can be compared together
*	(Maybe) Do the two datasets agree with one another in their results.
*	(If possible, can you combine the two datasets and look at the analysis again)

## Machine Learning Model
We used a Random Forest Classifier model to take the provided NPX values, timeframe of treatment, and sites and predict whether or not a given sample is a Responder or Non-responder.

## Technique
* Data Cleanup of provided sample data to get rid of unnecessary lines/data
* Create machine learning model using cleaned data
* Run statistical tests (ANOVA) to look for statistical significance for certain proteins based on model results
* Test second dataset using the model for accuracy

## Resources
### Jupyter Notebooks
* <b>Anova_by_proteins.ipynb</b> - Data cleanup notebook
* <b>BS_ML_test.ipynb</b> - Machine learning testing notebook. Contains KMeans and Random Forest models
* <b>NewANOVAxProtein.ipynb</b> - ANOVA Test Notebook. 
* <b>data_merge.ipynb/data2_merge.ipynb</b> - Data cleanup notebook<br>
### Files
* <b>RandomForest_Model</b> - binary file of random forest algorithm (Saved via Pickle)
