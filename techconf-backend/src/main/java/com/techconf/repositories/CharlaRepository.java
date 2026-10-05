package com.techconf.repositories;

import com.techconf.models.Charla;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharlaRepository extends JpaRepository<Charla, Long> {
}
