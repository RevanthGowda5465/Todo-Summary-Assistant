package in.ToDo.Controller;

import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import in.ToDo.Entity.User;
import in.ToDo.Service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
	private final UserService userService;

	@PostMapping("/register")
	public User register(@RequestBody User user) {
		return userService.registerUser(user);
	}

	@GetMapping("/by-email")
	public Optional<User> getByEmail(@RequestParam String email) {
		return userService.findByEmail(email);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User loginRequest) {
		Optional<User> userOpt = userService.findByEmail(loginRequest.getEmail());
		if (userOpt.isPresent()) {
			User user = userOpt.get();
			if (user.getPassword().equals(loginRequest.getPassword())) {
				return ResponseEntity.ok(user);
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
	}
}