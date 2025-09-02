import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Story from './models/Story.js';

dotenv.config();

const seedStories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing stories
    await Story.deleteMany();
    console.log('Cleared existing stories');

    // Add sample stories
    const sampleStories = [
      {
        title: "Youth for Earth",
        quote: "This planet isn't a resource. It's a relationship.",
        content: "Our Save the Planet campaign is led by passionate young environmentalists who are planting trees, banning plastic, and demanding their corporations and governments treat climate change as the crisis it is.",
        category: "environment",
        featured: true,
        tags: ["environment", "climate", "sustainability"]
      },
      {
        title: "Mind Matters – Breaking the Mental Health Stigma",
        content: "We aim to create a culture where conversations about mental well-being are normal, open, and safe. Through school sessions, digital storytelling, and community support hubs, we're helping youth understand that it's okay to not be okay.",
        category: "mental-health",
        featured: true,
        tags: ["mental-health", "awareness", "support"]
      },
      {
        title: "Equal Rights Now – Not Later",
        content: "In every corner of the world, young people are rising to demand fairness – for women, people of color, and marginalized groups. Our Equal Rights Now campaign is about ending systemic inequality and amplifying the voices that have been silenced for too long.",
        category: "rights",
        featured: true,
        tags: ["equality", "rights", "justice"]
      }
    ];

    await Story.insertMany(sampleStories);
    console.log('Sample stories added successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding stories:', error);
    process.exit(1);
  }
};

seedStories();