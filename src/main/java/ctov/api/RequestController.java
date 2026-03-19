package ctov.api;

import ctov.api.dto.CollapseDto;
import ctov.api.dto.RequestDto;
import ctov.data.Collapse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/collapse")
public class RequestController {

    private final Collapse collapse = new Collapse();

    @PostMapping
    public ResponseEntity<CollapseDto> post(@RequestBody RequestDto request) {
        if (request.coreSolarMass > 0.0) {
            CollapseDto response = collapse.collapse(request.coreSolarMass);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
