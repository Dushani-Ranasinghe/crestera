//Imports
const Folder = require('../models/Folder');//Folder Model
const ResponseService = require('../utils/ResponseService'); // Response service

// Create New Folder
exports.createNew = (req, res) => {
    let newfolder = new Folder(req.body);
    newfolder.save((err) => {
        ResponseService.generalResponse(err, res, 'new folder created successfully');
    });
};

// Get All Folders
exports.getAll = (async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const _count = await Folder.countDocuments();
    const totalPages = Math.ceil(_count / limit);

    Folder.find((err, doc) => {
        const newPayload = {
            docs: doc,
            totalPages: totalPages,
            totalpost: _count
        }
        ResponseService.generalPayloadResponse(err, newPayload, res);
    }).sort({ addedOn: -1 })
        .skip(page * limit).limit(limit);
});

// Update a Folder
exports.updateById = (req, res) => {
    Folder.findByIdAndUpdate(
        req.params.id,
        {
           $set:req.body
        }, (err, doc) => {
            ResponseService.generalPayloadResponse(err, doc, res, 'folder updated successfully');
        });
};

// Delete a Folder
exports.deleteById = (req, res, next) => {
    Folder.findByIdAndRemove(
        req.params.id,
        {
           $set:req.body
        }, (err, doc) => {
            ResponseService.generalPayloadResponse(err, doc, res, 'folder deleted successfully');
        });
};