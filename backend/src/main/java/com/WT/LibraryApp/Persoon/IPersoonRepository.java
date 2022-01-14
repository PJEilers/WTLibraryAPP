package com.WT.LibraryApp.Persoon;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IPersoonRepository extends JpaRepository<Persoon, Integer> {
    Optional<Persoon> findByEmailAndWachtwoord(String email, String wachtwoord);
    List<Persoon> findAllByNaam(String naam);
}
