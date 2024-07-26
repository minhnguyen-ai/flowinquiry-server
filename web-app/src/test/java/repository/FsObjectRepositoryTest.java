package repository;

import io.flexwork.fss.repository.FsObjectRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class FsObjectRepositoryTest {

    private FsObjectRepository fsObjectRepository;

    @Test
    public void testQueryFolders() {}
}
