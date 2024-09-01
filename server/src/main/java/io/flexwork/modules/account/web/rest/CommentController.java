package io.flexwork.modules.account.web.rest;

import io.flexwork.modules.account.domain.Comment;
import io.flexwork.modules.account.repository.CommentRepository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crm/comments")
public class CommentController {

    private CommentRepository commentRepository;

    public CommentController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public Page<Comment> getAllComments(Pageable pageable) {
        return commentRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        return commentRepository
                .findById(id)
                .map(comment -> ResponseEntity.ok().body(comment))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-entity")
    public List<Comment> getCommentsByEntity(
            @RequestParam Comment.EntityType entityType, @RequestParam Long entityId) {
        return commentRepository.findByEntityTypeAndEntityId(entityType, entityId);
    }

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentRepository.save(comment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(
            @PathVariable Long id, @RequestBody Comment comment) {
        if (!commentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        comment.setId(id);
        return ResponseEntity.ok(commentRepository.save(comment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        if (!commentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        commentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
