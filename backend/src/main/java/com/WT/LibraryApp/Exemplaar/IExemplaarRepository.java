package com.WT.LibraryApp.Exemplaar;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.WT.LibraryApp.Boek.Boek;
import com.WT.LibraryApp.Exemplaar.Exemplaar.Status;
public interface IExemplaarRepository extends JpaRepository<Exemplaar, Integer> {
		List<Exemplaar> findByBoekId(int boekId);
		int countByBoek(Boek boek);
		int countByBoekAndStatus(Boek boek, Status status);
		List<Exemplaar> findByBoek(Boek boek);
		
}

