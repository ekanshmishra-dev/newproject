import Room from '../models/Room.model.js';
import { ApiError } from '@service-hub/common';

export const createRoom = async (name, type, createdBy, participants = []) => {
  const roomParticipants = [...new Set([...participants, createdBy])];
  return Room.create({ name, type, createdBy, participants: roomParticipants });
};

export const getRoomsByUser = async (userId) => {
  return Room.find({ participants: userId })
    .sort({ 'lastMessage.timestamp': -1 })
    .lean();
};

export const validateParticipant = async (roomId, userId) => {
  const room = await Room.findById(roomId);
  if (!room) throw new ApiError(404, 'Room not found');
  if (!room.isParticipant(userId)) throw new ApiError(403, 'User not in room');
  return room;
};
