import { Injectable } from '@angular/core';
import { Student } from './student';
import { STUDENTS } from './mock-students';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiurl = 'http://student-env.p5vwvdspfa.us-west-2.elasticbeanstalk.com/students';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getStudents():  Observable<Student[]> {
    //return this.http.get<Student[]>(this.apiurl)
    return this.http.get<Student[]>(this.apiurl)
    .pipe(
      tap(students => this.log('fetched students')),
      catchError(this.handleError('getStudents', []))
    );
  }

  getStudent(id: number): Observable<Student> {
    // TODO: send the message _after_ fetching the student
    this.messageService.add(`StudentService: fetched student id=${id}`);
    return of(STUDENTS.find(student => student.id === id));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
