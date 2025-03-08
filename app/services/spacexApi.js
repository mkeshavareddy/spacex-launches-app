// app/services/spacexApi.js

const BASE_URL = 'https://api.spacexdata.com/v4';

export const getLaunches = async () => {
  try {
    const response = await fetch(`${BASE_URL}/launches`);
    if (!response.ok) {
      throw new Error('Failed to fetch launches');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRocketById = async (rocketId) => {
  try {
    const response = await fetch(`${BASE_URL}/rockets/${rocketId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch rocket');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Add other endpoints as needed (e.g., for individual launches if you want to fetch by ID)
