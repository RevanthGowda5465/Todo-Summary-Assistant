package in.ToDo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.ToDo.Entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
	List<Todo> findByUserEmail(String userEmail);
}