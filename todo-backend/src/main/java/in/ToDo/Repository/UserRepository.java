package in.ToDo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.ToDo.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);
}