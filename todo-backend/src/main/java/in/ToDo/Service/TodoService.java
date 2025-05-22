package in.ToDo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import in.ToDo.Entity.Todo;
import in.ToDo.Repository.TodoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {
	private final TodoRepository todoRepository;

	public List<Todo> getTodosByUserEmail(String email) {
		return todoRepository.findByUserEmail(email);
	}

	public Todo createTodo(Todo todo) {
		return todoRepository.save(todo);
	}

	public Optional<Todo> getTodoById(Long id) {
		return todoRepository.findById(id);
	}

	public Todo updateTodo(Todo todo) {
		return todoRepository.save(todo);
	}

	public void deleteTodo(Long id) {
		todoRepository.deleteById(id);
	}
}