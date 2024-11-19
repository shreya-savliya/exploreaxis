import CustomRoom from "../models/customRoomModel.js";

export default async function addCustomRoom(req, res) {
  try {
    const customRoomData = req.body;
    console.log(customRoomData);
    

    // Create a new custom room document
    const customRoom = new CustomRoom({
      room_type: customRoomData.room_type,
      include_meal: customRoomData.include_meal,
      services: customRoomData.services,
      room_area: customRoomData.room_area,
      allowed_person: customRoomData.allowed_person,
      beds: customRoomData.beds,
      price: customRoomData.price,
      view: customRoomData.view,
      special_requests: customRoomData.special_requests,
    });

    // Save the custom room to the database
    const savedRoom = await customRoom.save();
    res.status(201).json({
      message: "Custom room added successfully!",
      room: savedRoom,
    });
  } catch (error) {
    // Handle validation errors or server issues
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message, details: error.errors });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};
