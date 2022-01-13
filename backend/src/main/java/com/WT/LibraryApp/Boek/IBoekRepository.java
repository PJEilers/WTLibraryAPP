package com.WT.LibraryApp.Boek;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IBoekRepository extends JpaRepository<Boek, Integer>{
	Optional<Boek> findByIsbn(String isbn);
	/*Optional<Boek> findByTitelLike(String titel);*/
	List<Boek> findByTitelLike(String titel);
}
