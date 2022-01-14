package com.WT.LibraryApp.Reservering;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IReserveringRepository extends JpaRepository<Reservering, Integer>{
    Optional<Reservering> findByPersoonIdAndBoekId(int persoonId, int BoekId);
}
