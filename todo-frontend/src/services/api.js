const fetchTodos = async (userEmail) => {
  const response = await fetch(`http://localhost:8080/api/todos?userEmail=${encodeURIComponent(userEmail)}`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  const todos = await response.json();
  return todos;
};