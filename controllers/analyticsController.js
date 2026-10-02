const Post = require('../models/postModel');

const parseDate = (value, endOfDay) => {
    if (!value) {
        return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'invalid';
    }

    if (endOfDay && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        date.setUTCHours(23, 59, 59, 999);
    }

    return date;
};

const buildMatch = (query) => {
    const match = {};

    if (query.author) {
        match.author = query.author;
    }

    if (query.category) {
        match.category = query.category.toLowerCase();
    }

    const startDate = parseDate(query.startDate, false);
    const endDate = parseDate(query.endDate, true);

    if (startDate === 'invalid' || endDate === 'invalid') {
        return { error: 'startDate and endDate must be valid dates' };
    }

    if (startDate || endDate) {
        match.date = {};

        if (startDate) {
            match.date.$gte = startDate;
        }

        if (endDate) {
            match.date.$lte = endDate;
        }
    }

    return { match };
};

const getAnalytics = async (req, res) => {
    const { match, error } = buildMatch(req.query);

    if (error) {
        return res.status(400).json({ message: error });
    }

    const pipelineStart = [{ $match: match }];

    const summaryResult = await Post.aggregate([
        ...pipelineStart,
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
                totalViews: { $sum: '$views' },
            },
        },
        {
            $project: {
                _id: 0,
                count: 1,
                totalViews: 1,
            },
        },
    ]);

    const byCategory = await Post.aggregate([
        ...pipelineStart,
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 },
                totalViews: { $sum: '$views' },
            },
        },
        {
            $project: {
                _id: 0,
                category: '$_id',
                count: 1,
                totalViews: 1,
            },
        },
        { $sort: { count: -1 } },
    ]);

    const byMonth = await Post.aggregate([
        ...pipelineStart,
        {
            $group: {
                _id: {
                    year: { $year: '$date' },
                    month: { $month: '$date' },
                },
                count: { $sum: 1 },
                totalViews: { $sum: '$views' },
            },
        },
        {
            $project: {
                _id: 0,
                year: '$_id.year',
                month: '$_id.month',
                count: 1,
                totalViews: 1,
            },
        },
        { $sort: { year: 1, month: 1 } },
    ]);

    res.status(200).json({
        filters: {
            author: req.query.author || null,
            category: req.query.category || null,
            startDate: req.query.startDate || null,
            endDate: req.query.endDate || null,
        },
        summary: summaryResult[0] || { count: 0, totalViews: 0 },
        byCategory,
        byMonth,
    });
};

module.exports = { getAnalytics };
