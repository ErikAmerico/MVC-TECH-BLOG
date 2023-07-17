const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog, {
    foreignKey: 'writer_id',
});

Blog.belongsTo(User, {
    foreignKey: 'writer_id',
});

module.exports = { User, Blog };