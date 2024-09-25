//package tw.luna.FinalTest.controller;
//
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import tw.luna.FinalTest.model.User;
//import tw.luna.FinalTest.service.UserService;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//    @GetMapping
//    public List<User> getAllUsers() {
//        return userService.getAllUsers();
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<User> getUserById(@PathVariable Long id) {
//        Optional<User> user = userService.getUserById(id);
//        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    public User createUser(@RequestBody User user) {
//        return userService.createUser(user);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
//        Optional<User> existingUser = userService.getUserById(id);
//        if (existingUser.isPresent()) {
//            user.setUserId(id);
//            User updatedUser = userService.updateUser(user);
//            return ResponseEntity.ok(updatedUser);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
//        userService.deleteUser(id);
//        return ResponseEntity.noContent().build();
//    }
//}
//
