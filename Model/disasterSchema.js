const{Schema,model} = require("mongoose");

const disasterSchema = new Schema({
  'Year': Number,
  'Count_Of_Disasters': Number,
  'Affected':Number,
  'image':String
}, { collection: 'Disaster' });

const Disaster = model('Disaster', disasterSchema);

module.exports = Disaster;