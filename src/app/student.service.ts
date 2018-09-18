import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private apiurl = 'http://student-env.p5vwvdspfa.us-west-2.elasticbeanstalk.com';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getStudents():  Observable<Student[]> {
    //return this.http.get<Student[]>(this.apiurl)
    return this.http.get<Student[]>(this.apiurl+'/students')
    .pipe(
      tap(students => this.log('fetched students')),
      catchError(this.handleError('getStudents', []))
    );
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.apiurl}/students?id=${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  addStudent (student: Student): Observable<Student> {
    console.log(student);

    return this.http.post<Student>(this.apiurl+'/student/create', student, httpOptions).pipe(
      tap((student: Student) => this.log(`added student w/ id=${student.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  searchStudents(term: string): Observable<Student[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Student[]>(`${this.apiurl}/students/search?query=${term}`).pipe(
      tap(_ => this.log(`found students matching fname "${term}"`)),
      catchError(this.handleError<Student[]>('searchStudents', []))
    );
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
    this.messageService.add(`StudentService: ${message}`);
  }
}
