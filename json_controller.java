package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Files;
import java.nio.file.Paths;

public class json_controller
{
    private String jsonData() throws Exception
    {
        String path = "src/main/resources/data.json";
        
        return new String(Files.readAllBytes(Paths.get(path)));   
    }
}
