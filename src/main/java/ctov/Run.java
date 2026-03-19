package ctov;

import ctov.data.Collapse;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Run {
    public static void main(String[] args) {
        SpringApplication.run(Run.class, args);

        Collapse collapse  = new Collapse();
        System.out.println(collapse.collapse(50.0));
    }
}