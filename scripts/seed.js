require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/postModel');

const posts = [
    { title: 'Getting started with Express', category: 'tech', author: 'Fazil', views: 120, date: new Date('2026-01-12') },
    { title: 'MongoDB aggregation basics', category: 'tech', author: 'Fazil', views: 240, date: new Date('2026-02-03') },
    { title: 'How indexes work', category: 'tech', author: 'Amina', views: 90, date: new Date('2026-02-18') },
    { title: 'Color and spacing', category: 'design', author: 'Amina', views: 60, date: new Date('2026-03-09') },
    { title: 'Landing page layout', category: 'design', author: 'Fazil', views: 150, date: new Date('2026-03-21') },
    { title: 'Pricing a side project', category: 'business', author: 'Omar', views: 80, date: new Date('2026-04-02') },
    { title: 'Finding first users', category: 'business', author: 'Omar', views: 200, date: new Date('2026-04-19') },
    { title: 'REST status codes', category: 'tech', author: 'Omar', views: 175, date: new Date('2026-07-11') },
    { title: 'Writing a clear README', category: 'tech', author: 'Fazil', views: 95, date: new Date('2026-09-05') },
];

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await Post.deleteMany({});
    await Post.insertMany(posts);
    console.log(`Seeded ${posts.length} posts`);
    await mongoose.disconnect();
};

seed().catch((error) => {
    console.log(error);
    process.exit(1);
});
