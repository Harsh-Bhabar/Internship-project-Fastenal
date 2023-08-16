package com.ecom.cartorderswishlist.dto;

import com.mongodb.lang.NonNull;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public class Newsletter {
    @Id
    private String id;
    @NonNull
    private String emailId;
    private LocalDateTime subscribedTimeStamp;

    public Newsletter(@NonNull String emailId, LocalDateTime subscribedTimeStamp) {
        this.emailId = emailId;
        this.subscribedTimeStamp = subscribedTimeStamp;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @NonNull
    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(@NonNull String emailId) {
        this.emailId = emailId;
    }

    public LocalDateTime getSubscribedTimeStamp() {
        return subscribedTimeStamp;
    }

    public void setSubscribedTimeStamp(LocalDateTime subscribedTimeStamp) {
        this.subscribedTimeStamp = subscribedTimeStamp;
    }
}
