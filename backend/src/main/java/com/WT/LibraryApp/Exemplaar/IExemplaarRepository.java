package com.WT.LibraryApp.Exemplaar;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IExemplaarRepository extends JpaRepository<Exemplaar, Integer> {
		List<Exemplaar> findByBoekId(int boekId);
		int countByBoekId(int boekId);
		int countByBoekIdAndReserveringIdIsNull(int boekid);
}
