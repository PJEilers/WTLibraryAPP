package com.WT.LibraryApp.Exemplaar;

import java.util.List;

import com.WT.LibraryApp.Boek.Boek;
import com.WT.LibraryApp.Exemplaar.Exemplaar.Status;

import org.springframework.data.jpa.repository.JpaRepository;
public interface IExemplaarRepository extends JpaRepository<Exemplaar, Integer> {
		List<Exemplaar> findByBoekId(int boekId);
		int countByBoek(Boek boek);
		int countByBoekAndStatus(Boek boek, Status status);
		
}

