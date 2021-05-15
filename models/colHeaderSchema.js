const mongoose = require('mongoose');
const schema = mongoose.Schema;

const headerSchema = new schema(
    {
        colHeader: { type: String}
    },
);

module.exports = mongoose.model('header', headerSchema);