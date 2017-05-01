package oe.javaportal.nemethadrian;

import oe.javaportal.nemethadrian.model.MessageEntity;
import oe.javaportal.nemethadrian.model.PostsEntity;
import oe.javaportal.nemethadrian.service.PostService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by Adrián on 2017. 04. 30..
 */

@Path("/posts")
public class PostsController {
    private static final MessageEntity successMessage = new MessageEntity("Success");

    @Inject
    PostService postService;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public MessageEntity createPost(PostsEntity request) {
        try {
            postService.createPost(request);

            return successMessage;
        } catch (Exception e){
            return new MessageEntity(e.getMessage());
        }
    }

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<PostsEntity> getAllPosts() {
        List<PostsEntity> posts = postService.getAllPosts();

        return posts;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public PostsEntity getPostById(@QueryParam("id") int id) {
        PostsEntity post = postService.getPostById(id);

        return post;
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public MessageEntity updatePost(PostsEntity request) {
        try {
            postService.updatePost(request);

            return successMessage;
        } catch (Exception e){
            return new MessageEntity(e.getMessage());
        }
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public MessageEntity deletePost(@QueryParam("id") int id) {
        try {
            postService.deletePost(id);

            return successMessage;
        } catch (Exception e){
            return new MessageEntity(e.getLocalizedMessage());
        }
    }
}
