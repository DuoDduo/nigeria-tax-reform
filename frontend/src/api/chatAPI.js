/**
 * API client for communicating with the backend
 */
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

/**
 * Send a chat message
 * @param {string} question - The user's question
 * @param {string} conversationId - Optional conversation ID
 * @returns {Promise} Response with answer and sources
 */
export const sendMessage = async (question, conversationId = null) => {
  try {
    const response = await apiClient.post('/chat', {
      question,
      conversation_id: conversationId,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Create a new conversation
 * @returns {Promise} New conversation ID
 */
export const createConversation = async () => {
  try {
    const response = await apiClient.post('/conversation/new');
    return response.data.conversation_id;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

/**
 * Get conversation status
 * @param {string} conversationId - Conversation ID
 * @returns {Promise} Conversation metadata
 */
export const getConversationStatus = async (conversationId) => {
  try {
    const response = await apiClient.get(`/conversation/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting conversation status:', error);
    throw error;
  }
};

/**
 * Clear conversation history
 * @param {string} conversationId - Conversation ID
 * @returns {Promise}
 */
export const clearConversation = async (conversationId) => {
  try {
    await apiClient.delete(`/conversation/${conversationId}`);
  } catch (error) {
    console.error('Error clearing conversation:', error);
    throw error;
  }
};

/**
 * Check system health
 * @returns {Promise} Health status
 */
export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

/**
 * Get system statistics
 * @returns {Promise} System stats
 */
export const getSystemStats = async () => {
  try {
    const response = await apiClient.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error getting stats:', error);
    throw error;
  }
};

export default {
  sendMessage,
  createConversation,
  getConversationStatus,
  clearConversation,
  checkHealth,
  getSystemStats,
};