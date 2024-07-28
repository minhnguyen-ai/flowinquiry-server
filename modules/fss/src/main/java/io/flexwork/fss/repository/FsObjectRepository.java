package io.flexwork.fss.repository;

import io.flexwork.fss.domain.FsObject;
import java.math.BigInteger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FsObjectRepository extends JpaRepository<FsObject, BigInteger> {}
