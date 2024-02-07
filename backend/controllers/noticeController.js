const {Notice} = require('../models');

async function createNotice(req, res) {
    try {
        const { title, content, departmentid } = req.body;
        const notice = await Notice.create({ title, content, departmentid });
        res.status(201).json(notice);
    } catch (error) {
        console.error('Error creating notice:', error);
        res.status(500).json({ message: 'Error creating notice' });
    }
}

async function getAllNotices(req, res) {
    try {
        const notices = await Notice.findAll();
        res.json(notices);
    } catch (error) {
        console.error('Error fetching notices:', error);
        res.status(500).json({ message: 'Error fetching notices' });
    }
}
async function getNoticeById(req, res) {
    try {
        const noticeid = req.params.noticeid;
        const notice = await Notice.findByPk(noticeid);
        if (notice) {
            res.json(notice);
        } else {
            res.status(404).json({ message: 'Notice not found' });
        }
    } catch (error) {
        console.error('Error fetching notice by ID:', error);
        res.status(500).json({ message: 'Error fetching notice by ID' });
    }
}
async function updateNotice(req, res) {
    try {
        const noticeid = req.params.noticeid;
        const { title, content } = req.body;
        const [updated] = await Notice.update({ title, content }, { where: { noticeid } });
        if (updated) {
            res.json({ message: 'Notice updated successfully' });
        } else {
            res.status(404).json({ message: 'Notice not found' });
        }
    } catch (error) {
        console.error('Error updating notice:', error);
        res.status(500).json({ message: 'Error updating notice' });
    }
}

async function deleteNotice(req, res) {
    try {
        const noticeid = req.params.noticeid;
        const deleted = await Notice.destroy({ where: { noticeid} });
        if (deleted) {
            res.json({ message: 'Notice deleted successfully' });
        } else {
            res.status(404).json({ message: 'Notice not found' });
        }
    } catch (error) {
        console.error('Error deleting notice:', error);
        res.status(500).json({ message: 'Error deleting notice' });
    }
}

module.exports = {createNotice,getAllNotices,getNoticeById,updateNotice,deleteNotice};