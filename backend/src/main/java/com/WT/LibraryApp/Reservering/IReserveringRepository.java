package com.WT.LibraryApp.Reservering;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.WT.LibraryApp.Boek.Boek;
import com.WT.LibraryApp.Persoon.Persoon;
import com.WT.LibraryApp.Reservering.Reservering.ReserveringStatus;

public interface IReserveringRepository extends JpaRepository<Reservering, Integer>{
    Optional<Reservering> findByPersoonAndBoek(Persoon persoon, Boek boek);

	List<Reservering> findStatus(ReserveringStatus status);
}
