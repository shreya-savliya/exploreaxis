import mongoose from "mongoose";

// Custom Room Schema
const CustomRoomSchema = new mongoose.Schema({
  room_type: {
    type: String,
    required: [true, 'Room type is required.'],
    enum: ['Deluxe', 'Suite', 'Standard', 'Custom'], // Customize as needed
  },
  include_meal: {
    type: [String],
    validate: {
      validator: function (meals) {
        const validMeals = ['Breakfast', 'Lunch', 'Dinner', 'None'];
        return meals.every((meal) => validMeals.includes(meal));
      },
      message: 'Invalid meal option.',
    },
    required: [true, 'At least one meal option is required.'],
  },
  services: {
    type: [String],
    required: [true, 'At least one service is required.'],
  },
  room_area: {
    type: Number,
    required: [true, 'Room area is required.'],
    min: [10, 'Room area must be at least 10 square meters.'],
  },
  allowed_person: {
    type: Number,
    required: [true, 'Number of allowed persons is required.'],
    min: [1, 'At least one person must be allowed in the room.'],
  },
  beds: {
    quantity: {
      type: Number,
      required: [true, 'Number of beds is required.'],
      min: [1, 'There must be at least one bed.'],
    },
    type: {
      type: String,
      required: [true, 'Bed type is required.'],
      enum: ['King', 'Queen', 'Twin', 'Single'], // Customize as needed
    },
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
    min: [0, 'Price cannot be negative.'],
  },
  view: {
    type: String,
    required: [true, 'View preference is required.'],
    match: [/^[a-zA-Z\s]+$/, 'View preference must contain only letters.'],
  },
  availability: {
    type: Boolean,
    default: false, // Custom rooms are not available by default
  },
  special_requests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters.'],
  },
});

// Custom Room Model
const CustomRoom = mongoose.model('CustomRoom', CustomRoomSchema);

export default CustomRoom

