const LaboratoryReport = require('../models/Labrarory_result');


const { StatusCodes } = require('http-status-codes');

// Controller function to create a new laboratory report
createLaboratoryReport = async (req, res) => {
    try {
        // Extracting data from the request
        const { patientId, medicalDatadocID } = req.params;
        const { doctorId, laboratoryTests, laboratoryFindings, comments } = req.body;

        // Creating the laboratory report object
        const labReport = {
            patientId,
            medicalDatadocID,
           
            laboratoryTests,
            laboratoryFindings,
            comments,
            createdBy: {
                id: req.user.userId,
                name: req.user.firstName,
                namelast: req.user.lastName
            }
        };

        // Creating a new instance of the LaboratoryReport model
        const newLabReport = await LaboratoryReport.create(labReport);

        // Sending the response
        res.status(StatusCodes.CREATED).json({ success: true, data: newLabReport });
    } catch (error) {
        console.error('Error creating laboratory report:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: 'Internal server error' });
    }
};

getLaboratoryReportById = async (req, res) => {
    try {
        // Extract the laboratory report ID from request parameters
        const { id } = req.params;

        // Find the laboratory report by its ID
        const labReport = await LaboratoryReport.findById(id);

        // If the laboratory report is not found, return 404
        if (!labReport) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, error: 'Laboratory report not found' });
        }

        // If the laboratory report is found, return it in the response
        res.status(StatusCodes.OK).json({ success: true, data: labReport });
    } catch (error) {
        console.error('Error getting laboratory report by ID:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: 'Internal server error' });
    }
};

updateLaboratoryReportById = async (req, res) => {
    try {
        // Extract the laboratory report ID from request parameters
        const { id } = req.params;

        // Find the laboratory report by its ID and update it with the request body
        const updatedLabReport = await LaboratoryReport.findByIdAndUpdate(id, req.body, { new: true });

        // If the laboratory report is not found, return 404
        if (!updatedLabReport) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, error: 'Laboratory report not found' });
        }

        // If the laboratory report is found and updated successfully, return it in the response
        res.status(StatusCodes.OK).json({ success: true, data: updatedLabReport });
    } catch (error) {
        console.error('Error updating laboratory report by ID:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: 'Internal server error' });
    }
};

// Controller function to delete a laboratory report by ID
deleteLaboratoryReportById = async (req, res) => {
    try {
        // Extract the laboratory report ID from request parameters
        const { id } = req.params;

        // Find the laboratory report by its ID and delete it
        const deletedLabReport = await LaboratoryReport.findByIdAndDelete(id);

        // If the laboratory report is not found, return 404
        if (!deletedLabReport) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, error: 'Laboratory report not found' });
        }

        // If the laboratory report is found and deleted successfully, return it in the response
        res.status(StatusCodes.OK).json({ success: true, data: deletedLabReport });
    } catch (error) {
        console.error('Error deleting laboratory report by ID:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: 'Internal server error' });
    }
};



module.exports = {
    createLaboratoryReport,
    getLaboratoryReportById,
    updateLaboratoryReportById,
    deleteLaboratoryReportById
    
  }