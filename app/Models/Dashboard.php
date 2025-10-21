<?php
require_once __DIR__ . '/../config/database.php';

class Dashboard {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getStudentsPerCourse() {
        $query = "
            SELECT c.course_name AS course, COUNT(s.id) AS total_students
            FROM courses c
            LEFT JOIN students s ON s.course_id = c.id
            GROUP BY c.id
        ";
        $result = $this->conn->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getFacultyPerDepartment() {
        $query = "
            SELECT d.department_name AS department, COUNT(f.id) AS total_faculty
            FROM departments d
            LEFT JOIN faculty f ON f.department_id = d.id
            GROUP BY d.id
        ";
        $result = $this->conn->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
