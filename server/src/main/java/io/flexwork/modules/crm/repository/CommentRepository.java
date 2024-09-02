package io.flexwork.modules.crm.repository;

import io.flexwork.modules.crm.domain.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByEntityTypeAndEntityId(Comment.EntityType entityType, Long entityId);
}
