package com.WT.LibraryApp.Persoon;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PersoonService implements UserDetailsService {

	@Autowired
	private IPersoonRepository repository;

//	@Autowired
//	private PasswordEncoder bcryptEncoder;
	
	private BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();

	public Persoon maakPersoonAan(Persoon persoon) {
		String wachtwoord = persoon.getWachtwoord();
		persoon.setWachtwoord(bcryptEncoder.encode(wachtwoord));

		return repository.save(persoon);
	}

	public List<Persoon> vindAllePersonen() {
		return repository.findAll();
	}

	public Optional<Persoon> vindPersoon(int id) {
		return repository.findById(id);
	}

	public int vindPersoonIdEmail(String email) {
		Optional<Persoon> persoon = repository.findByEmail(email);
		if (persoon.isPresent()) {
			return persoon.get().getId();
		} else {
			throw new UsernameNotFoundException("Persoon niet gevonden met email: " + email);
		}
	}

	public Optional<Persoon> login(LoginForm loginform) {
		return repository.findByEmailAndWachtwoord(loginform.getEmail(), loginform.getWachtwoord());
	}

	public Optional<Persoon> vindPersoonEmail(String email) {
		return repository.findByEmail(email);
	}

	// Dit maakt de koppeling tussen onze database en de jwt implementatie
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<Persoon> persoon = repository.findByEmail(email);
		List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
		
		if (persoon.isPresent()) {
			authorities.add(new SimpleGrantedAuthority(persoon.get().getRole()));
			return new org.springframework.security.core.userdetails.User(persoon.get().getEmail(),
					persoon.get().getWachtwoord(), authorities);
		} else {
			throw new UsernameNotFoundException("Persoon niet gevonden met email: " + email);
		}
	}
}
