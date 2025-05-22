package in.ToDo.Controller;

import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import in.ToDo.Entity.Todo;
import in.ToDo.Service.TodoService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TodoController {

	private final TodoService todoService;

	@GetMapping
	public List<Todo> getAllByUserEmail(@RequestParam String userEmail) {
		return todoService.getTodosByUserEmail(userEmail);
	}

	@GetMapping("/{id}")
	public Optional<Todo> getById(@PathVariable Long id) {
		return todoService.getTodoById(id);
	}

	@PostMapping
	public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
		System.out.println("Received Due Date: " + todo.getDueDateTime());
		Todo savedTodo = todoService.createTodo(todo);
		return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
		Optional<Todo> existingTodoOptional = todoService.getTodoById(id);

		if (existingTodoOptional.isPresent()) {
			Todo existingTodo = existingTodoOptional.get();
			existingTodo.setTitle(updatedTodo.getTitle());
			existingTodo.setDescription(updatedTodo.getDescription());
			existingTodo.setPriority(updatedTodo.getPriority());
			existingTodo.setStatus(updatedTodo.getStatus());
			existingTodo.setDueDateTime(updatedTodo.getDueDateTime()); 
			existingTodo.setUserEmail(updatedTodo.getUserEmail());

			Todo savedTodo = todoService.updateTodo(existingTodo);
			return new ResponseEntity<>(savedTodo, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public void deleteTodo(@PathVariable Long id) {
		todoService.deleteTodo(id);
	}
}
