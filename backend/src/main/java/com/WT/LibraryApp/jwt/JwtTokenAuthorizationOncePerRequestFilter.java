package com.WT.LibraryApp.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.WT.LibraryApp.Persoon.PersoonService;

import io.jsonwebtoken.ExpiredJwtException;

// Dit filter is aangeroepen bij elk request naar de backend.
@Component
public class JwtTokenAuthorizationOncePerRequestFilter extends OncePerRequestFilter {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private PersoonService persoonService;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        logger.debug("Authentication Request For '{}'", request.getRequestURL());

        // Hij pakt de Token uit de header. 
        // Dit doet hij alleen als:
        // De header ('Authorization': 'Bearer ' + token) bevat.
        // Niet expired is.
        // En er een valid username in zit.
        final String requestTokenHeader = request.getHeader(this.tokenHeader);

        String username = null;
        String jwtToken = null;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                logger.error("JWT_TOKEN_UNABLE_TO_GET_USERNAME", e);
            } catch (ExpiredJwtException e) {
                logger.warn("JWT_TOKEN_EXPIRED", e);
            }
        } else {
            logger.warn("JWT_TOKEN_DOES_NOT_START_WITH_BEARER_STRING");
        }

        logger.debug("JWT_TOKEN_USERNAME_VALUE '{}'", username);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

        // Hier checkt hij of de user bestaat. Pas dit aan naar wat wij willen.
        /*TODO*/
        	// Haalt de user op username. (Zou in database kunnen?) /*TODO*/
            UserDetails userDetails = this.persoonService.loadUserByUsername(username);
            
            // Checkt of de token inderdaad de username bevat.
            // Vervolgens haalt hij alle authorities op die gebruikt worden in de SecurityContextHolder
            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // Wanneer een user is authenticated wordt hij in de SecurityContextHolder geplaatst.
                // DIt zorgt ervoor dat de user gebruik kan maken van dingen.
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        chain.doFilter(request, response);
    }
}


