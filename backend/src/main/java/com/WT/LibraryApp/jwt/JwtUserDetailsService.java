//package com.WT.LibraryApp.jwt;
//
//import java.util.ArrayList;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.WT.LibraryApp.Persoon.Persoon;
//import com.WT.LibraryApp.Persoon.PersoonService;
//
//@Service
//public class JwtUserDetailsService implements UserDetailsService {
//	
//	@Autowired
//	private PersoonService persoonService;
//	
//	@Override
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		Optional<Persoon> persoon = persoonService.vindPersoonEmail(email);
//		if (persoon.isPresent()) {
//			return new org.springframework.security.core.userdetails.User(persoon.get().getEmail(), persoon.get().getWachtwoord(),
//					new ArrayList<>());
//		} else {
//			throw new UsernameNotFoundException("User not found with email: " + email);
//		}
//	}
//	
//	
//}
