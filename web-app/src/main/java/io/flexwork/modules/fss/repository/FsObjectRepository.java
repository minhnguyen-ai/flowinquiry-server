package io.flexwork.modules.fss.repository;

import io.flexwork.modules.fss.domain.FsObject;
import java.math.BigInteger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FsObjectRepository extends JpaRepository<FsObject, BigInteger> {}
