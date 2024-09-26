package com.NewTestApi.EatFun.Repository;


import java.util.List;

import com.NewTestApi.EatFun.Entity.Recipes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RecipesRepository extends JpaRepository<Recipes, Integer> {

    List<Recipes> findByIsDelFalse();
}