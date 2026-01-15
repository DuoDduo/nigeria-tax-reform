// src/api/chatAPI.js
import { apiClient } from './authAPI';

/**
 * Fetch all conversations (for sidebar history)
 */
export const getConversations = async () => {
  try {
    const response = await apiClient.get('/conversations');
    return response.data;
  } catch (err) {
    console.error('Error fetching conversations:', err);
    throw err;
  }
};

/**
 * Fetch messages/details for a specific conversation
 */
export const getConversationMessages = async (conversationId) => {
  try {
    const response = await apiClient.get(`/conversations/${conversationId}`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching conversation ${conversationId}:`, err);
    throw err;
  }
};

/**
 * Send a message to an existing conversation
 * Updated to pass conversation_id to avoid 422 Unprocessable Entity errors
 */
export const sendMessage = async (messageText, conversationId) => {
  try {
    const payload = { 
      question: messageText, 
      conversation_id: conversationId 
    };
    
    // Note: Verify if your backend expects '/chat' or '/conversations/chat'
    const response = await apiClient.post('/chat', payload);
    return response.data;
  } catch (err) {
    // Extract specific validation error message from FastAPI if available
    const detail = err.response?.data?.detail;
    const errorMessage = Array.isArray(detail) ? detail[0].msg : detail;
    throw new Error(errorMessage || 'Failed to send message');
  }
};

/**
 * Create a new conversation session
 */
export const createConversation = async () => {
  try {
    const response = await apiClient.post('/conversations/new', {});
    return response.data;
  } catch (err) {
    console.error('Error creating conversation:', err);
    throw err;
  }
};

/**
 * Update the title of a conversation (e.g., after the first message)
 */
export const updateConversationTitle = async (conversationId, title) => {
  try {
    const response = await apiClient.patch(`/conversations/${conversationId}`, { title });
    return response.data;
  } catch (err) {
    console.error('Error updating title:', err);
    throw err;
  }
};

/**
 * Delete a specific conversation session
 * Renamed from clearConversation to match ChatPage.jsx imports
 */
export const deleteConversation = async (conversationId) => {
  try {
    await apiClient.delete(`/conversations/${conversationId}`);
  } catch (err) {
    console.error(`Error deleting conversation ${conversationId}:`, err);
    throw err;
  }
};

/**
 * Health check to monitor system status
 */
export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (err) {
    console.error('Error checking backend health:', err);
    throw err;
  }
};

export default {
  sendMessage,
  createConversation,
  getConversations,
  getConversationMessages,
  updateConversationTitle,
  deleteConversation,
  checkHealth,
};