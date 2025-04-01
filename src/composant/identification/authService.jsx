export const login = async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include'
    });
  
    if (!response.ok) throw new Error('Échec de la connexion');
    
    const data = await response.json();
    return data; // Contient user, token et redirectTo
  };
  
  export const checkSession = async () => {
    const response = await fetch('/api/auth/check-session', {
      credentials: 'include'
    });
  
    if (!response.ok) throw new Error('Session invalide');
    
    return await response.json();
  };