package com.WT.LibraryApp.Boek;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IBoekRepository extends JpaRepository<Boek, Integer>{
	Optional<Boek> findByIsbn(String isbn);
	Boek findByTitel(String titel);
}
