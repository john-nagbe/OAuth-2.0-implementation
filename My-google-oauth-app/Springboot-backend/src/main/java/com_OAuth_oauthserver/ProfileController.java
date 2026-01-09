package com_OAuth_oauthserver;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {

    @GetMapping("/api/profile")
public Map<String, Object> profile(@AuthenticationPrincipal OidcUser oidcUser) {
    if (oidcUser == null) {
        return Map.of("error", "Not authenticated");
    }
    return oidcUser.getClaims();
  }
}

