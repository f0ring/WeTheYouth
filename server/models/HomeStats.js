import mongoose from 'mongoose';

const homeStatsSchema = new mongoose.Schema({
  volunteers: { 
    type: Number, 
    required: true, 
    default: 500,
    min: 0
  },
  cities: { 
    type: Number, 
    required: true, 
    default: 7,
    min: 0
  },
  actions: { 
    type: Number, 
    required: true, 
    default: 3000,
    min: 0
  },
  impactStories: {
    type: Number,
    default: 150
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
});

// Ensure only one stats document exists
homeStatsSchema.statics.getCurrentStats = async function() {
  let stats = await this.findOne();
  if (!stats) {
    stats = new this();
    await stats.save();
  }
  return stats;
};

export default mongoose.model('HomeStats', homeStatsSchema);