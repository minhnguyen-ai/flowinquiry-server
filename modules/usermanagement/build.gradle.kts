plugins {
    id("java-library")
    id("org.jetbrains.kotlin.jvm")
}

version = "0.0.1-SNAPSHOT"


dependencies {
    api(project(":libs:security"))
    implementation(platform("org.springframework.boot:spring-boot-dependencies:3.3.1"))
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")

    implementation("org.springframework.statemachine:spring-statemachine-starter:4.0.0")
    implementation("org.springframework.statemachine:spring-statemachine-data-jpa:4.0.0")
    testImplementation("org.springframework.statemachine:spring-statemachine-test:4.0.0")

    compileOnly("org.projectlombok:lombok:1.18.34")
    annotationProcessor("org.projectlombok:lombok:1.18.34")

    testCompileOnly("org.projectlombok:lombok:1.18.34")
    testAnnotationProcessor("org.projectlombok:lombok:1.18.34")

    api("org.springframework.boot:spring-boot-starter-mail")
    implementation("org.springframework.boot:spring-boot-starter-web")

    testImplementation("org.jetbrains.kotlin:kotlin-test")

    implementation("gg.jte:jte-spring-boot-starter-3:3.1.12")
    implementation("gg.jte:jte:3.1.12")
}

tasks.test {
    useJUnitPlatform()
}