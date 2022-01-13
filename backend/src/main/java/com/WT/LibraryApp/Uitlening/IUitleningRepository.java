package com.WT.LibraryApp.Uitlening;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IUitleningRepository extends JpaRepository<Uitlening, Integer>{
	Optional<Uitlening> findByExemplaarId(int exemplaarId);
}
