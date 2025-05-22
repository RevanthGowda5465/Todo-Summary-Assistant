package in.ToDo.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class SlackService {

	@Value("${slack.webhook.url}")
	private String slackWebhookUrl;

	public void sendMessageToSlack(String message) {
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		Map<String, String> payload = Map.of("text", message);
		HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

		restTemplate.postForEntity(slackWebhookUrl, request, String.class);
	}
}
