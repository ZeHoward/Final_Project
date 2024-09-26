package com.NewTestApi.EatFun.Service;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String s) {
        System.out.println("Resource not Found");
    }
}