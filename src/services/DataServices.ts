import { config } from "../config";

export async function fetchData() {
    try {
      const response = await fetch(config.API_URL);
      const data = await response.json();
      return data;
    
    } catch (error) {
      console.error(error);
    }
  }