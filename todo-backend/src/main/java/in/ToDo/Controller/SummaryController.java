package in.ToDo.Controller;

import in.ToDo.Service.LLMService;
import in.ToDo.Service.SlackService;
import in.ToDo.Service.TodoService;
import in.ToDo.Entity.Todo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SummaryController {

	private final TodoService todoService;
	private final LLMService llmService;
	private final SlackService slackService;

	@PostMapping("/summarize")
	public ResponseEntity<String> summarizeTodosAndSendToSlack(@RequestParam String userEmail) {
		try {
			List<Todo> todos = todoService.getTodosByUserEmail(userEmail);
			List<String> pendingTitles = todos.stream()
					.filter(todo -> !"Completed".equalsIgnoreCase(todo.getStatus()))
					.map(todo -> "- " + todo.getTitle() + ": " + todo.getDescription())
					.toList();

			if (pendingTitles.isEmpty()) {
				return ResponseEntity.ok("No pending todos to summarize.");
			}

			String summary = llmService.generateSummary(pendingTitles);
			slackService.sendMessageToSlack(summary);

			return ResponseEntity.ok("Summary sent to Slack successfully!");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Failed to summarize: " + e.getMessage());
		}
	}

}
