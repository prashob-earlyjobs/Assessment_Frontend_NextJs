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

  export const getAIBuddyInterviews = async (
    subCategory: string,
    page?: number,
    limit?: number
  ) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_AI_API_URL;
      if (!backendUrl) {
        throw new Error("Missing NEXT_PUBLIC_AI_API_URL");
      }
      const params = new URLSearchParams({ subCategory });
      if (page != null) params.set("page", String(page));
      if (limit != null) params.set("limit", String(limit));
      const response = await fetch(
        `${backendUrl}api/public/interviewsForAIBuddy?${params.toString()}`,
        {
          method: "GET",
        }
      );

      console.log("AIBuddy interviews response:", response);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `HTTP ${response.status}: Failed to get AI buddy interviews`
        );
      }
      const data = await response.json();
      console.log("AIBuddy interviews data:", data);
      return data;
    } catch (error: any) {
      console.error("Failed to get AI buddy interviews:", error.message);
      throw error;
    }
  };

  export const createAIBuddySession = async (payload: {
    role: string;
    subCategory?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
  }) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_AI_API_URL;
      if (!backendUrl) {
        throw new Error("Missing NEXT_PUBLIC_AI_API_URL");
      }
      const response = await fetch(
        `${backendUrl}api/public/createSessionForAIBuddy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("AIBuddy create session response:", response);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `HTTP ${response.status}: Failed to create AI buddy session`
        );
      }
      const data = await response.json();
      console.log("AIBuddy create session data:", data);
      return data;
    } catch (error: any) {
      console.error("Failed to create AI buddy session:", error.message);
      throw error;
    }
  };