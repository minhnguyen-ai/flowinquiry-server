package io.flexwork.modules.crm.web.rest;

import io.flexwork.modules.crm.domain.Meeting;
import io.flexwork.modules.crm.repository.MeetingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crm/meetings")
public class MeetingController {

    private MeetingRepository meetingRepository;

    public MeetingController(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    @GetMapping
    public Page<Meeting> getAllMeetings(Pageable pageable) {
        return meetingRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable Long id) {
        return meetingRepository
                .findById(id)
                .map(meeting -> ResponseEntity.ok().body(meeting))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Meeting createMeeting(@RequestBody Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meeting> updateMeeting(
            @PathVariable Long id, @RequestBody Meeting meeting) {
        if (!meetingRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        meeting.setId(id);
        return ResponseEntity.ok(meetingRepository.save(meeting));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable Long id) {
        if (!meetingRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        meetingRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
