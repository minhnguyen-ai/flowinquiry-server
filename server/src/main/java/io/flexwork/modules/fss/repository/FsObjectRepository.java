package io.flexwork.modules.fss.repository;

import io.flexwork.modules.fss.domain.FsObject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FsObjectRepository extends JpaRepository<FsObject, Long> {}
