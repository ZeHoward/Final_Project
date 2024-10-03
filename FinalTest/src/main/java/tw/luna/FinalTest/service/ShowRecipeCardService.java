package tw.luna.FinalTest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.luna.FinalTest.dto.ShowRecipeCardDTO;
import tw.luna.FinalTest.model.Recipes;
import tw.luna.FinalTest.repository.RecipesRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShowRecipeCardService {

    @Autowired
    private RecipesRepository recipesRepository;


    public List<ShowRecipeCardDTO> getAllRecipes() {
        return recipesRepository.getAllRecipes();
    }
}
