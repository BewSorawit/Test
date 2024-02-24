package com.example.probone.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.probone.model.Users;

@RestController
@RequestMapping("/users")
public class UserAPIService {
    private static List<Users> users = new ArrayList<>();

    static {
        Users u1 = new Users(0, "Brown", "Brown_Ch@gmail.com", "Brown123");
        users.add(u1);
    }

    @GetMapping("/all")
    public List<Users> getAllUsers() {
        return users;
    }

    @GetMapping("/getById/{id}")
    public Users getUsersById(@PathVariable int id) {
        return findUsersById(id);
    }

    @PostMapping("/create")
    public String creatUsers(@RequestBody Users user) {
        users.add(user);
        return "User Created Successfully";
    }

    @PutMapping("/edit/{id}")
    public String editUsers(@PathVariable int id, @RequestBody Users user) {
        Users exitUser = findUsersById(id);
        if (exitUser != null) {
            exitUser.setName(user.getName());
            exitUser.setPassword(user.getPassword());
            exitUser.setEmail(user.getEmail());
            return "User Edited Successfully";
        }
        return "User not found";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUserById(@PathVariable int id) {
        Users i = findUsersById(id);

        if (i != null) {
            users.remove(i);
            return "User Deleted Successfully";
        } else {
            return "User not found";
        }
    }

    private Users findUsersById(int id) {
        for (Users i : users) {
            if (i.getId() == id) {
                return i;
            }
        }
        return null;
    }
}
