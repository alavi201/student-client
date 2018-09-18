import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];
  
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }

  add(fname: string, lname: string, email: string, address: string, gpa: number): void {
    fname = fname.trim();
    lname = lname.trim();
    email = email.trim();
    address = address.trim();
    if (!fname || !lname || !email) { return; }
    console.log(fname);
    this.studentService.addStudent({ fname, lname, email, address, gpa} as Student)
      .subscribe(student => {
        this.students.push(student);
      });
  }
}
