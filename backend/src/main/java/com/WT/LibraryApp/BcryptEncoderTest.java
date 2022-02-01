package com.WT.LibraryApp;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// Gebruik dit om snel een wachtwoord te genereren voor in de database.
public class BcryptEncoderTest {

	public static void main(String[] args) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String encodedString = encoder.encode("password");
		System.out.println(encodedString);
		//password:
		//$2a$10$OwBwyhaQDZxm0ThSCkce9OhGp5EPboVZ7cO.4j0oRjpynNLLV.mjS

	}

}
