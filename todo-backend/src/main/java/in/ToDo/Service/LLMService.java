package in.ToDo.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
@Service
public class LLMService {

	@Value("${openai.api.key}")
	private String apiKey;

	public String generateSummary(List<String> todos) {
		String prompt = "Summarize these tasks:\n" + String.join("\n", todos);
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.setBearerAuth(apiKey);
		headers.setContentType(MediaType.APPLICATION_JSON);

		Map<String, Object> request = Map.of(
				"model", "gpt-3.5-turbo",
				"messages", List.of(Map.of("role", "user", "content", prompt))
				);

		HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
		ResponseEntity<Map> response = restTemplate.postForEntity("https://api.openai.com/v1/chat/completions", entity, Map.class);

		List<Map> choices = (List<Map>) response.getBody().get("choices");
		Map message = (Map) choices.get(0).get("message");
		return message.get("content").toString();
	}
}
