export const getStaticSkills = async (searchQuery: string = "") => {
    try {
   
        
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/static/skills?searchQuery=${searchQuery}`, {
        method: 'GET',
      });

      console.log("Static skills response:", response);
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to get static skills`);
      }
  
      const data = await response.json();
      console.log("Static skills response:", data);
      return data;
  
    } catch (error: any) {
      console.error("Failed to get static skills:", error.message);
      throw error;
    }
  };


  export const getStaticRoles = async (searchQuery: string = "") => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/static/roles?searchQuery=${searchQuery}`, {
        method: 'GET',
      });

      console.log("Static roles response:", response);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to get static roles`);
      }
      const data = await response.json();
      console.log("Static roles response:", data);
      return data;
    } catch (error: any) {
      console.error("Failed to get static roles:", error.message);
      throw error;
    }
  };