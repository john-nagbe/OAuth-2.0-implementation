package com_OAuth_oauthserver;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .cors(Customizer.withDefaults()) // Link to your WebConfig CORS
        .csrf(csrf -> csrf.disable())    // Recommended for dev with Angular
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/", "/error", "/webjars/**", "/login/**").permitAll()
            .anyRequest().authenticated()
        )
        .oauth2Login(oauth2 -> oauth2
            // FORCE redirect back to Angular port 4200
            .defaultSuccessUrl("http://localhost:4200", true)
        )
        .logout(logout -> logout
            .logoutSuccessUrl("http://localhost:4200").permitAll()
        );

    return http.build();
}
}
