package oe.javaportal.nemethadrian.service;

import oe.javaportal.nemethadrian.model.PostsEntity;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Adrián on 2017. 04. 30..
 */

@Stateless
public class PostService {

    @PersistenceContext
    EntityManager entityManager;

    public List<PostsEntity> getAllPosts() {
        return entityManager.createNamedQuery("Posts.getAllPosts").getResultList();
    }

    public PostsEntity getPostById(int id) {
        return (PostsEntity) entityManager.createNamedQuery("Posts.getPostById")
                .setParameter("id", id)
                .getSingleResult();
    }

    public void createPost(PostsEntity post) {
        entityManager.persist(post);
    }

    public void updatePost(PostsEntity post) {
        entityManager.merge(post);
    }

    public void deletePost(int id) {
        PostsEntity post = getPostById(id);
        entityManager.remove(post);
    }
}
